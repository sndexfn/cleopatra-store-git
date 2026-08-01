"use client";
import { useState } from 'react';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabase) {
      setError('خدمة تسجيل الدخول غير متاحة حالياً');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({ email: email });
    if (error) {
      setError('حدث خطأ أثناء إرسال الرمز. تأكد من البريد الإلكتروني.');
    } else {
      setStep('otp');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabase) {
      setError('خدمة تسجيل الدخول غير متاحة حالياً');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'email'
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
        <p className={styles.subtitle}>أدخل بريدك الإلكتروني لتسجيل الدخول أو إنشاء حساب جديد</p>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className={styles.form}>
            <label className={styles.label}>البريد الإلكتروني</label>
            <input
              className={styles.input}
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              dir="ltr"
            />
            <p className={styles.hint}>سيتم إرسال رمز تحقق (OTP) إلى بريدك الإلكتروني</p>
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
            <button type="button" className={styles.backBtn} onClick={() => setStep('email')}>
              ← تغيير البريد الإلكتروني
            </button>
          </form>
        )}

      </div>
    </main>
  );
}
