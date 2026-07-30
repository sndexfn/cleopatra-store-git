"use client";
import { useState } from 'react';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Format phone: add country code if not present
    const formattedPhone = phone.startsWith('+') ? phone : `+964${phone.replace(/^0/, '')}`;

    if (!supabase) {
      setError('خدمة تسجيل الدخول غير متاحة حالياً');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
    if (error) {
      setError('حدث خطأ أثناء إرسال الرمز. تأكد من رقم الهاتف.');
    } else {
      setStep('otp');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedPhone = phone.startsWith('+') ? phone : `+964${phone.replace(/^0/, '')}`;

    if (!supabase) {
      setError('خدمة تسجيل الدخول غير متاحة حالياً');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms'
    });

    if (error) {
      setError('الرمز غير صحيح. حاول مجدداً.');
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Image src="/logo.png" alt="كليوباترا" width={120} height={120} style={{objectFit:'contain'}} />
        </div>
        <h1 className={styles.title}>تسجيل الدخول</h1>
        <p className={styles.subtitle}>أدخل رقم هاتفك لتسجيل الدخول أو إنشاء حساب جديد</p>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className={styles.form}>
            <label className={styles.label}>رقم الهاتف</label>
            <input
              className={styles.input}
              type="tel"
              placeholder="07XXXXXXXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              dir="ltr"
            />
            <p className={styles.hint}>سيتم إرسال رمز تحقق (OTP) إلى هاتفك عبر SMS</p>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <label className={styles.label}>رمز التحقق (OTP)</label>
            <input
              className={styles.input}
              type="text"
              placeholder="123456"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              maxLength={6}
              required
              dir="ltr"
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'جاري التحقق...' : 'تأكيد الدخول'}
            </button>
            <button type="button" className={styles.backBtn} onClick={() => setStep('phone')}>
              ← تغيير رقم الهاتف
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
