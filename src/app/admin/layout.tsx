"use client";

import Link from "next/link";
import styles from "./layout.module.css";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isAdmin } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !isAdmin(session.user.email)) {
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
      setLoading(false);
    }
    
    checkAdmin();
  }, [router]);

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--gold-primary)' }}>جاري التحقق من الصلاحيات...</div>;
  }

  if (!isAuthorized) {
    return null; // Will redirect
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (supabase) await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>إدارة كليوباترا</div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navItem}>
            <LayoutDashboard size={20} />
            <span>لوحة التحكم</span>
          </Link>
          <Link href="/admin/products" className={styles.navItem}>
            <Package size={20} />
            <span>المنتجات</span>
          </Link>
          <Link href="/admin/orders" className={styles.navItem}>
            <ShoppingCart size={20} />
            <span>الطلبات</span>
          </Link>
          
          <button onClick={handleLogout} className={styles.navItem} style={{ marginTop: 'auto', color: 'var(--error)', background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
            <LogOut size={20} />
            <span>الخروج</span>
          </button>
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
