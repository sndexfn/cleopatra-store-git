"use client";

import Link from "next/link";
import styles from "./layout.module.css";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
          
          <Link href="/" className={styles.navItem} style={{ marginTop: 'auto', color: 'var(--error)' }}>
            <LogOut size={20} />
            <span>الخروج</span>
          </Link>
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
