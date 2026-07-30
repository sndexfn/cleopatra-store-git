import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import { Gem, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>كليوباترا</h1>
            <div className={styles.decorativeLine}></div>
            <p className={styles.subtitle}>
              اكتشف الفخامة والأناقة الحقيقية. نقدم لك أرقى التصاميم وأصفى عيارات الذهب، لتبقى ذكرياتك لامعة مدى الحياة. متجر كليوباترا، حيث يلتقي التراث بالإبداع.
            </p>
            <button className={styles.ctaButton}>تسوق الآن</button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <TrendingUp size={40} />
              </div>
              <h3 className={styles.featureTitle}>تسعير لحظي عالمي</h3>
              <p className={styles.featureDesc}>
                أسعارنا مرتبطة مباشرة بالسوق العالمي للذهب، لضمان أعلى درجات الشفافية والموثوقية في كل عملية شراء تقوم بها.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Gem size={40} />
              </div>
              <h3 className={styles.featureTitle}>تصاميم حصرية</h3>
              <p className={styles.featureDesc}>
                تشكيلة واسعة من القطع الذهبية المصاغة بعناية فائقة لتناسب أصحاب الذوق الرفيع والمناسبات الاستثنائية.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <ShieldCheck size={40} />
              </div>
              <h3 className={styles.featureTitle}>أمان وموثوقية</h3>
              <p className={styles.featureDesc}>
                نضمن لك نقاوة الذهب وأوزانه بدقة متناهية، مع توفير تجربة تسوق إلكترونية آمنة وسلسة.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
