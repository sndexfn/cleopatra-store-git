"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/lib/store";
import styles from "./page.module.css";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (items.length === 0 && !success) {
    if (typeof window !== "undefined") {
      router.push("/cart");
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items
        })
      });

      if (response.ok) {
        setSuccess(true);
        clearCart();
      } else {
        alert("حدث خطأ أثناء معالجة الطلب، يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error(error);
      alert("تعذر الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {success ? (
          <div className={styles.successMessage}>
            <CheckCircle size={80} className={styles.successIcon} />
            <h1 className={styles.successTitle}>تم استلام طلبك بنجاح!</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              سيقوم أحد ممثلي المبيعات بالتواصل معك قريباً لتأكيد تفاصيل التوصيل.
            </p>
            <Link href="/shop" style={{ color: "var(--gold-primary)", textDecoration: "underline" }}>
              العودة للمتجر
            </Link>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>إتمام الطلب</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>الاسم الكامل</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>رقم الهاتف (مثال: 07700000000)</label>
                <input 
                  type="tel" 
                  className={styles.input} 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>عنوان التوصيل بالتفصيل</label>
                <textarea 
                  className={styles.input} 
                  rows={4} 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
              </button>
            </form>
          </>
        )}
      </main>
    </>
  );
}
