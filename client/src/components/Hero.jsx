import styles from './Hero.module.css';

const handleScroll = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          India's Premium PET Packaging Studio
        </div>
        <h1 className={styles.title}>
          Packaging that<br />
          <em>builds brands.</em>
        </h1>
        <p className={styles.desc}>
          Custom PET bottles, HDPE bottles, caps and packaging solutions —<br />
          engineered for food, pharma, cosmetics, chemicals and beverages.<br />
          Design it. Preview it. Ship it.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => handleScroll('products')}>
            Explore Products <span className={styles.arrow}>→</span>
          </button>
          <button className={styles.btnSecondary} onClick={() => handleScroll('quote')}>
            <span className={styles.playIcon}>▶</span> Request a quote
          </button>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>22+</span>
            <span className={styles.statLabel}>Years crafting</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>500M+</span>
            <span className={styles.statLabel}>Bottles / year</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>ISO</span>
            <span className={styles.statLabel}>9001 : 2015</span>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.bottleWrap}>
          <img src="/images/hero-bottle.jpg" alt="Premium PET Bottle" className={styles.bottle} />
          <div className={`${styles.tag} ${styles.tagFood}`}><span className={styles.dot} /> Food-grade PET</div>
          <div className={`${styles.tag} ${styles.tagCap}`}><span className={styles.dot} /> Custom cap</div>
          <div className={`${styles.tag} ${styles.tagLeak}`}><span className={`${styles.dot} ${styles.dotOrange}`} /> Leak-proof</div>
        </div>
        <div className={styles.bgBottles}>
          <div className={`${styles.bgBottle} ${styles.b1}`} />
          <div className={`${styles.bgBottle} ${styles.b2}`} />
          <div className={`${styles.bgBottle} ${styles.b3}`} />
        </div>
      </div>
    </section>
  );
}
