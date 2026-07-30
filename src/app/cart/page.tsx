"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/lib/store";
import { getLiveGoldPrices, calculateFinalPrice, formatCurrency, GoldPrices } from "@/lib/goldPrice";
import styles from "./page.module.css";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [prices, setPrices] = useState<GoldPrices | null>(null);
  
  // To fix hydration error with Zustand persist
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getLiveGoldPrices().then(setPrices);
  }, []);

  if (!isClient) return null;

  let grandTotalUSD = 0;
  let grandTotalIQD = 0;

  if (prices) {
    items.forEach(item => {
      const itemPrice = calculateFinalPrice(item.product.weightGrams, item.product.karat, item.product.makingChargeUSD, prices);
      grandTotalUSD += itemPrice.totalUSD * item.quantity;
      grandTotalIQD += itemPrice.totalIQD * item.quantity;
    });
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>سلة المشتريات</h1>
        
        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <p>السلة فارغة حالياً.</p>
            <Link href="/shop" style={{ color: "var(--gold-primary)", marginTop: "1rem", display: "inline-block" }}>
              تصفح المتجر
            </Link>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <div className={styles.itemsList}>
              {items.map(item => {
                let itemTotalUSD = 0;
                let itemTotalIQD = 0;
                if (prices) {
                  const p = calculateFinalPrice(item.product.weightGrams, item.product.karat, item.product.makingChargeUSD, prices);
                  itemTotalUSD = p.totalUSD * item.quantity;
                  itemTotalIQD = p.totalIQD * item.quantity;
                }

                return (
                  <div key={item.product.id} className={styles.cartItem}>
                    <img src={item.product.imageUrl} alt={item.product.name} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <div>
                        <h3 className={styles.itemName}>{item.product.name}</h3>
                        <p className={styles.itemSpecs}>عيار {item.product.karat} | الوزن: {item.product.weightGrams} غرام</p>
                        <p style={{ color: 'var(--gold-primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                          {prices ? formatCurrency(itemTotalUSD, 'USD') : 'جاري الحساب...'}
                        </p>
                      </div>
                      
                      <div className={styles.itemActions}>
                        <div className={styles.quantityControl}>
                          <button 
                            className={styles.qtyBtn} 
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          >-</button>
                          <span>{item.quantity}</span>
                          <button 
                            className={styles.qtyBtn} 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >+</button>
                        </div>
                        
                        <button 
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 size={18} /> إزالة
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>ملخص الطلب</h2>
              <div className={styles.summaryRow}>
                <span>عدد العناصر:</span>
                <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>أجور التوصيل:</span>
                <span>مجاناً</span>
              </div>
              
              <div className={styles.summaryTotal}>
                <span>المجموع الكلي:</span>
                <div style={{ textAlign: 'left' }}>
                  <div>{prices ? formatCurrency(grandTotalUSD, 'USD') : '...'}</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {prices ? formatCurrency(grandTotalIQD, 'IQD') : '...'}
                  </div>
                </div>
              </div>

              <Link href="/checkout" style={{ display: 'block' }}>
                <button className={styles.checkoutBtn}>إتمام الشراء</button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
