"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          CLEOPATRA
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>الرئيسية</Link>
          <Link href="/shop" className={styles.link}>المتجر</Link>
          <Link href="/about" className={styles.link}>من نحن</Link>
        </div>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartButton} aria-label="السلة">
            <ShoppingBag size={22} />
            <span>{mounted ? totalItems : 0}</span>
          </Link>
          
          <Link href="/login" className={styles.loginBtn}>
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </nav>
  );
}
