import styles from './page.module.css';
import Image from 'next/image';

export const metadata = {
  title: 'من نحن | متجر كليوباترا للذهب',
  description: 'تعرف على قصة متجر كليوباترا للذهب، رحلة من الإبداع والتميز منذ 1975',
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.tag}>منذ عام 1975</p>
          <h1 className={styles.title}>من نحن</h1>
          <p className={styles.subtitle}>
            نحن متجر كليوباترا للمجوهرات، وجهتك الأولى للذهب الأصيل والمجوهرات الفاخرة
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>قصتنا</h2>
          <p>
            تأسس متجر كليوباترا للمجوهرات عام 1975 على يد صاحبه الذي حمل معه حلماً بتقديم أفخر أنواع الذهب والمجوهرات لأبناء العراق. 
            على مدار خمسة عقود، أصبحنا الوجهة الأولى للعائلات والأفراد الباحثين عن الجودة والأصالة.
          </p>
          <p>
            نلتزم بتقديم ذهب حقيقي بأعيار موثوقة (18، 21، 24) مع شهادات ضمان لكل قطعة، وأسعار شفافة محسوبة وفق سعر الذهب العالمي اللحظي.
          </p>
        </section>

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>+50</span>
            <span className={styles.statLabel}>عاماً من الخبرة</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>+10K</span>
            <span className={styles.statLabel}>زبون سعيد</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>ذهب حقيقي مضمون</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>أعيار متوفرة</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2>لماذا كليوباترا؟</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>👑</span>
              <h3>جودة ملكية</h3>
              <p>كل قطعة تمر بفحص دقيق قبل عرضها لضمان أعلى معايير الجودة</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💰</span>
              <h3>أسعار شفافة</h3>
              <p>أسعارنا محسوبة مباشرةً وفق سعر الذهب العالمي اللحظي بدون تلاعب</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🛡️</span>
              <h3>ضمان كامل</h3>
              <p>نضمن أصالة كل قطعة ونقدم شهادة عيار موثوقة</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
