import { useState, useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  { id:1, quote: '"Angel PET rebuilt our entire packaging line. Consistent quality, on-time delivery and a design team that actually gets shelf presence."', author: 'Priya Menon', role: 'Head of Packaging, Solace Nutraceuticals', industry: 'PHARMA' },
  { id:2, quote: '"From first sample to 50,000 units in under 30 days. Angel PET\'s speed and quality have been a game-changer for our brand."', author: 'Rahul Sharma', role: 'Founder, NatureBev Drinks', industry: 'BEVERAGES' },
  { id:3, quote: '"The custom mould development process was seamless. Our cosmetic line now stands out on every shelf it touches."', author: 'Ananya Gupta', role: 'Brand Director, GlowLab Cosmetics', industry: 'COSMETICS' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const go = (index) => {
    setCurrent(((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const resetInterval = (index) => {
    clearInterval(intervalRef.current);
    go(index);
  };

  const t = TESTIMONIALS[current];

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.inner}>
        <div className={styles.quoteIcon}>"</div>
        <div key={current} className={styles.content}>
          <blockquote className={styles.quote}>{t.quote}</blockquote>
          <div className={styles.author}>
            <strong>{t.author}</strong> — {t.role} · <span className={styles.tag}>{t.industry}</span>
          </div>
        </div>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={() => resetInterval(current - 1)} aria-label="Previous">‹</button>
          <div className={styles.dots}>
            {TESTIMONIALS.map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => resetInterval(i)} />
            ))}
          </div>
          <button className={styles.btn} onClick={() => resetInterval(current + 1)} aria-label="Next">›</button>
        </div>
      </div>
    </section>
  );
}
