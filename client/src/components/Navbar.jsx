import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [scrollDir, setScrollDir]     = useState('up');
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [logoSpin, setLogoSpin]       = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const lastY = useRef(0);
  const linksRef = useRef([]);

  // Scroll direction & hide-on-scroll-down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setScrollDir(y > lastY.current && y > 80 ? 'down' : 'up');
      lastY.current = y;

      // Active section highlight
      const ids = ['products','industries','manufacturing','sustainability','quote'];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding indicator under active nav link
  useEffect(() => {
    const navIds = ['products','industries','manufacturing','sustainability'];
    const idx = navIds.indexOf(activeSection);
    if (idx >= 0 && linksRef.current[idx]) {
      const el = linksRef.current[idx];
      const rect = el.getBoundingClientRect();
      const parentRect = el.closest('div')?.getBoundingClientRect();
      if (parentRect) {
        setIndicatorStyle({
          width: rect.width,
          transform: `translateX(${rect.left - parentRect.left}px)`,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle(s => ({ ...s, opacity: 0 }));
    }
  }, [activeSection]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setLogoSpin(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setLogoSpin(false), 700);
  };

  const navIds = ['products','industries','manufacturing','sustainability'];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${scrollDir === 'down' ? styles.hidden : ''}`}>
      {/* Animated gradient border at bottom */}
      <div className={styles.gradientBar} />

      <div className={styles.inner}>
        {/* Logo with spin-on-click */}
        <button className={styles.logo} onClick={handleLogoClick} aria-label="Angel PET Home">
          <div className={`${styles.logoIcon} ${logoSpin ? styles.spin : ''}`}>
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

        {/* Nav links with sliding indicator */}
        <div className={styles.linksWrapper}>
          <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            {navIds.map((id, i) => (
              <button
                key={id}
                ref={el => linksRef.current[i] = el}
                className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
                onClick={() => handleNavClick(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            {/* Sliding underline indicator */}
            <div className={styles.indicator} style={indicatorStyle} />
          </div>
        </div>

        {/* CTA button with ripple */}
        <button
          className={styles.quoteBtn}
          onClick={() => handleNavClick('quote')}
        >
          <span className={styles.quoteBtnText}>Request Quote</span>
          <span className={styles.quoteBtnGlow} />
        </button>

        {/* Hamburger — morphs to X */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
