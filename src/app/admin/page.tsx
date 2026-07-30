export default function AdminPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', color: 'var(--gold-pale)', marginBottom: '2rem' }}>لوحة التحكم</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>إجمالي المبيعات</h3>
          <p style={{ fontSize: '2rem', color: 'var(--gold-primary)', fontWeight: 700 }}>$14,500</p>
        </div>
        
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>الطلبات الجديدة</h3>
          <p style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 700 }}>5</p>
        </div>
        
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>المنتجات المعروضة</h3>
          <p style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 700 }}>12</p>
        </div>
      </div>
      
      <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>هذه واجهة تجريبية (Mock) بانتظار إعداد قاعدة بيانات Supabase لتفعيل الإدارة الكاملة للمنتجات والطلبات.</p>
      </div>
    </div>
  );
}
