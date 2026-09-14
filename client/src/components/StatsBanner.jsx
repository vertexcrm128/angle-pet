import { useEffect, useRef, useState } from 'react';
import styles from './StatsBanner.module.css';

const STATS = [
  { num: 22, suffix: '+', label: 'YEARS EXPERIENCE' },
  { num: 850, suffix: '+', label: 'HAPPY CLIENTS' },
  { num: 500, suffix: 'M+', label: 'BOTTLES MANUFACTURED' },
  { num: 60, suffix: '+', label: 'CITIES SERVED' },
  { num: 1.5, suffix: 'M', label: 'DAILY PRODUCTION' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          setCount(current);
        }, step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target >= 1 && !Number.isInteger(target)
    ? count.toFixed(1) : Math.round(count);

  return <span ref={ref}>{display}<span className={styles.orange}>{suffix}</span></span>;
}

export default function StatsBanner() {
  return (
    <section className={styles.banner} id="stats">
      <div className={styles.inner}>
        {STATS.map((s, i) => (
          <>
            <div key={s.label} className={styles.stat}>
              <span className={styles.num}><Counter target={s.num} suffix={s.suffix} /></span>
              <span className={styles.label}>{s.label}</span>
            </div>
            {i < STATS.length - 1 && <div key={`d${i}`} className={styles.divider} />}
          </>
        ))}
      </div>
    </section>
  );
}
