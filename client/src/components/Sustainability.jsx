import styles from './Sustainability.module.css';

const CARDS = [
  { wide: true, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e86700" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9M3 12a9 9 0 019-9M12 3l3-3-3 3zM12 21l-3 3 3-3z"/></svg>, title: '100% Recyclable PET', desc: 'Every bottle we make is fully recyclable at end of life.', orange: true },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: 'Energy Efficient', desc: 'Servo-driven machines cut power by 35%.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>, title: 'Waste Reduction', desc: 'Lean production with <1% scrap yield.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 22V12M12 12C12 7 8 3 3 3c0 5 4 9 9 9zm0 0c0-5 4-9 9-9-1 5-5 9-9 9z"/></svg>, title: 'Eco Materials', desc: 'Bio-based & rPET blends where certified.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M3 12a9 9 0 109-9M3 12l3-3M3 12l3 3"/></svg>, title: 'Circular Packaging', desc: 'Designed for the second life of every bottle.' },
];

export default function Sustainability() {
  return (
    <section className={`section ${styles.sustain}`} id="sustainability">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <span className="section-tag">SUSTAINABILITY</span>
            <h2 className="section-title">Packaging with a<br /><em>second life.</em></h2>
            <p className="section-desc">
              We treat sustainability as engineering, not marketing. Every bottle is designed to return to the loop — recyclable, lighter by design, and produced with radically less energy than the industry average.
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.cards}>
              {CARDS.map((c, i) => (
                <div key={i} className={`${styles.card} ${c.wide ? styles.wide : ''}`}>
                  <div className={`${styles.icon} ${c.orange ? styles.iconOrange : ''}`}>{c.icon}</div>
                  <h4 className={styles.title}>{c.title}</h4>
                  <p className={styles.desc}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
