import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="12" rx="6" ry="9" stroke="white" strokeWidth="2"/>
              <line x1="12" y1="3" x2="12" y2="21" stroke="white" strokeWidth="1.5"/>
              <line x1="6" y1="12" x2="18" y2="12" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Angel PET</span>
            <span className={styles.logoSub}>PACKAGING STUDIO</span>
          </div>
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {['products','industries','manufacturing','sustainability'].map(id => (
            <button key={id} className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
              onClick={() => handleNavClick(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        <button className={styles.quoteBtn} onClick={() => handleNavClick('quote')}>
          Request Quote
        </button>

        <button className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
