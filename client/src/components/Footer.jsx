import { useState } from 'react';
import { subscribe } from '../services/api';
import styles from './Footer.module.css';

const PRODUCTS_LINKS = ['Water Bottles','Juice Bottles','Cosmetic','Pharma','Oil','Caps','Preforms'];
const INDUSTRIES_LINKS = ['Food','Pharmaceutical','Cosmetics','Chemical','Beverages','Personal Care'];
const COMPANY_LINKS = ['About','Manufacturing','Sustainability','Careers','Downloads','Contact'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subMsg, setSubMsg] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    try {
      await subscribe(email);
      setSubMsg('Thank you! ✓');
      setEmail('');
    } catch {
      setSubMsg('Subscribed!');
    }
    setTimeout(() => setSubMsg(''), 3000);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="12" rx="6" ry="9" stroke="white" strokeWidth="2"/>
                <line x1="12" y1="3" x2="12" y2="21" stroke="white" strokeWidth="1.5"/>
                <line x1="6" y1="12" x2="18" y2="12" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <span className={styles.logoName}>Angel PET</span>
              <span className={styles.logoSub}>PACKAGING STUDIO</span>
            </div>
          </div>
          <p className={styles.tagline}>India's premium PET & HDPE packaging studio. Design, prototype and manufacture bottles that build brands.</p>
          <div className={styles.emailWrap}>
            <input
              type="email" placeholder={subMsg || 'Your work email'}
              value={email} onChange={e => setEmail(e.target.value)}
              className={styles.emailInput}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
            />
            <button className={styles.emailBtn} onClick={handleSubscribe} aria-label="Subscribe">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div className={styles.social}>
            {[
              { label:'LinkedIn', path:'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { label:'Instagram', path:null, isInstagram: true },
              { label:'Twitter', path:'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
            ].map(s => (
              <a key={s.label} href="#" className={styles.socialBtn} aria-label={s.label}>
                {s.isInstagram ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                )}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h5 className={styles.colTitle}>PRODUCTS</h5>
            {PRODUCTS_LINKS.map(l => <a key={l} href="#" className={styles.link} onClick={e=>{e.preventDefault();scrollTo('products')}}>{l}</a>)}
          </div>
          <div className={styles.col}>
            <h5 className={styles.colTitle}>INDUSTRIES</h5>
            {INDUSTRIES_LINKS.map(l => <a key={l} href="#" className={styles.link} onClick={e=>{e.preventDefault();scrollTo('industries')}}>{l}</a>)}
          </div>
          <div className={styles.col}>
            <h5 className={styles.colTitle}>COMPANY</h5>
            {COMPANY_LINKS.map(l => <a key={l} href="#" className={styles.link}>{l}</a>)}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Angel PET Packaging. All rights reserved.</span>
        <div className={styles.legal}>
          {['Privacy','Terms','Cookies','Certifications'].map(l => <a key={l} href="#" className={styles.legalLink}>{l}</a>)}
        </div>
      </div>
      <div className={styles.watermark} aria-hidden="true">Angel PET</div>
    </footer>
  );
}
