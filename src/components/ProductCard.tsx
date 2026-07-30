"use client";

import { Product } from "@/lib/supabase";
import { GoldPrices, calculateFinalPrice, formatCurrency } from "@/lib/goldPrice";
import { useCartStore } from "@/lib/store";
import styles from "./ProductCard.module.css";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  goldPrices: GoldPrices | null;
}

export default function ProductCard({ product, goldPrices }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  let prices = { totalUSD: 0, totalIQD: 0 };
  if (goldPrices) {
    prices = calculateFinalPrice(product.weightGrams, product.karat, product.makingChargeUSD, goldPrices);
  }

  const handleAddToCart = () => {
    addItem(product);
    // In a real app we'd show a toast notification here
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Using standard img tag for simplicity, next/image can be configured later for external domains */}
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <span className={styles.karatBadge}>عيار {product.karat}</span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.details}>
          <span>الوزن: {product.weightGrams} غرام</span>
          <span>صياغة: {formatCurrency(product.makingChargeUSD, 'USD')}</span>
        </div>

        <div className={styles.priceContainer}>
          {goldPrices ? (
            <>
              <span className={styles.usdPrice}>{formatCurrency(prices.totalUSD, 'USD')}</span>
              <span className={styles.iqdPrice}>{formatCurrency(prices.totalIQD, 'IQD')}</span>
            </>
          ) : (
            <span className={styles.usdPrice}>جاري حساب السعر...</span>
          )}
        </div>

        <button onClick={handleAddToCart} className={styles.addToCart}>
          <ShoppingCart size={18} />
          إضافة للسلة
        </button>
      </div>
    </div>
  );
}
