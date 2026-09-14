import { useState, useEffect } from 'react';
import { getIndustries } from '../services/api';
import styles from './Industries.module.css';

const ICONS = {
  food: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M3 11L12 2l9 9M5 9v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9"/></svg>,
  pharma: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  cosmetics: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  chemical: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M9 3v10.5a4.5 4.5 0 009 0V3M9 3h6M6 21h12"/></svg>,
  agriculture: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 22V12M12 12C12 7 8 3 3 3c0 5 4 9 9 9zm0 0c0-5 4-9 9-9-1 5-5 9-9 9z"/></svg>,
  personalcare: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  healthcare: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  beverages: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 9h6M9 13h4"/></svg>,
  industrial: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
};

const FALLBACK = [
  { id:'1', num:'01', name:'Food', subtitle:'Certified · Regulatory grade', icon:'food' },
  { id:'2', num:'02', name:'Pharmaceutical', subtitle:'Certified · Regulatory grade', icon:'pharma' },
  { id:'3', num:'03', name:'Cosmetics', subtitle:'Certified · Regulatory grade', icon:'cosmetics' },
  { id:'4', num:'04', name:'Chemical', subtitle:'Certified · Regulatory grade', icon:'chemical' },
  { id:'5', num:'05', name:'Agriculture', subtitle:'Certified · Regulatory grade', icon:'agriculture' },
  { id:'6', num:'06', name:'Personal Care', subtitle:'Certified · Regulatory grade', icon:'personalcare' },
  { id:'7', num:'07', name:'Healthcare', subtitle:'Certified · Regulatory grade', icon:'healthcare' },
  { id:'8', num:'08', name:'Beverages', subtitle:'Certified · Regulatory grade', icon:'beverages' },
  { id:'9', num:'09', name:'Industrial', subtitle:'Certified · Regulatory grade', icon:'industrial' },
];

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIndustries()
      .then(data => setIndustries(data.industries || FALLBACK))
      .catch(() => setIndustries(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={`section ${styles.industries}`} id="industries">
      <div className="container">
        <span className="section-tag">INDUSTRIES</span>
        <h2 className="section-title">Trusted across <em>nine industries.</em></h2>
        <p className="section-desc">
          From pharma-grade amber to premium cosmetic finishes, Angel PET engineers packaging precise enough for regulated categories and beautiful enough for shelf-defining brands.
        </p>
        <div className={styles.grid}>
          {(loading ? FALLBACK : industries).map(ind => (
            <div key={ind.id} className={`${styles.card} ${loading ? styles.loading : ''}`}>
              <div className={styles.top}>
                <div className={styles.icon}>{ICONS[ind.icon] || ICONS.food}</div>
                <span className={styles.num}>{ind.num}</span>
              </div>
              <h3 className={styles.name}>{ind.name}</h3>
              <p className={styles.sub}>{ind.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
