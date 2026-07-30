"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { getProducts, Product } from "@/lib/supabase";
import { getLiveGoldPrices, GoldPrices } from "@/lib/goldPrice";
import styles from "./page.module.css";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<GoldPrices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [fetchedProducts, fetchedPrices] = await Promise.all([
        getProducts(),
        getLiveGoldPrices()
      ]);
      setProducts(fetchedProducts);
      setPrices(fetchedPrices);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>مجوهراتنا الحصرية</h1>
          <p className={styles.subtitle}>تصفح مجموعتنا الفاخرة واشترِ بثقة بأسعار السوق العالمية اللحظية.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "var(--gold-primary)", padding: "4rem" }}>
            جاري تحميل المنتجات والأسعار...
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} goldPrices={prices} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
