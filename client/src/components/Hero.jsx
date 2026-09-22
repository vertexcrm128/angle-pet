import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Hero.module.css';

const handleScroll = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
};

/* ── Inline SVG Bottle (transparent, matches reference) ── */
function BottleSVG({ className }) {
  return (
    <svg viewBox="0 0 260 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(160,190,230,0.55)" />
          <stop offset="22%"  stopColor="rgba(215,232,252,0.18)" />
          <stop offset="65%"  stopColor="rgba(208,228,250,0.16)" />
          <stop offset="100%" stopColor="rgba(155,188,228,0.5)"  />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f7f9fd" />
          <stop offset="55%"  stopColor="#e6ecf7" />
          <stop offset="100%" stopColor="#cfd8ee" />
        </linearGradient>
        <linearGradient id="capSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(200,215,238,0.8)" />
          <stop offset="100%" stopColor="rgba(240,245,255,0.4)" />
        </linearGradient>
        <linearGradient id="hlMain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
        <linearGradient id="hlRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)"  />
        </linearGradient>
        <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(155,188,228,0.55)" />
          <stop offset="40%"  stopColor="rgba(215,232,252,0.2)"  />
          <stop offset="100%" stopColor="rgba(150,185,226,0.5)"  />
        </linearGradient>
        <radialGradient id="bottomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(26,63,160,0.12)" />
          <stop offset="100%" stopColor="transparent"           />
        </radialGradient>
        <clipPath id="bodyClip">
          <rect x="58" y="148" width="144" height="302" rx="30" />
        </clipPath>
      </defs>

      {/* ── Flip-top cap handle ── */}
      <rect x="101" y="6" width="58" height="30" rx="15" fill="url(#capGrad)" />
      <rect x="105" y="9"  width="50" height="22" rx="11" fill="rgba(255,255,255,0.55)" />
      <rect x="109" y="12" width="42" height="6"  rx="3"  fill="rgba(255,255,255,0.7)" />

      {/* ── Hinge connector ── */}
      <rect x="115" y="34" width="30" height="8" rx="4" fill="url(#capGrad)" />

      {/* ── Cap main body ── */}
      <rect x="80" y="38" width="100" height="62" rx="12" fill="url(#capGrad)" />
      {/* Cap top highlight */}
      <rect x="84" y="41" width="92" height="10" rx="5" fill="rgba(255,255,255,0.62)" />
      {/* Cap horizontal ridges */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="82" y={52 + i*8} width="96" height="3" rx="1.5"
          fill="rgba(185,205,232,0.38)" />
      ))}
      {/* Cap left shade */}
      <rect x="80" y="38" width="16" height="62" rx="8" fill="rgba(150,185,225,0.25)" />

      {/* ── Neck ── */}
      <path d="M108 98 L98 118 L92 138 L168 138 L162 118 L152 98 Z"
        fill="url(#neckGrad)" stroke="rgba(160,192,230,0.45)" strokeWidth="1.2" />
      {/* Neck left highlight */}
      <path d="M108 98 L101 118 L99 136 L107 136 L112 118 L118 98 Z"
        fill="rgba(255,255,255,0.28)" />

      {/* ── Shoulder ── */}
      <path d="M76 136 Q64 147 62 160 L198 160 Q196 147 184 136 Z"
        fill="url(#bodyGrad)" stroke="rgba(160,192,230,0.4)" strokeWidth="1" />

      {/* ── Main body ── */}
      <rect x="58" y="148" width="144" height="302" rx="30"
        fill="url(#bodyGrad)" stroke="rgba(155,190,230,0.55)" strokeWidth="1.5" />

      {/* Body inner content (clipped) */}
      <g clipPath="url(#bodyClip)">
        {/* Left primary highlight */}
        <rect x="64" y="152" width="26" height="285" rx="13" fill="url(#hlMain)" opacity="0.7" />
        {/* Right soft highlight */}
        <rect x="170" y="155" width="18" height="240" rx="9"  fill="url(#hlRight)" />
        {/* Narrow centre sparkle */}
        <rect x="126" y="158" width="7"  height="200" rx="3.5" fill="rgba(255,255,255,0.22)" />
        {/* Label plate */}
        <rect x="70" y="210" width="120" height="160" rx="12"
          fill="rgba(255,255,255,0.1)" stroke="rgba(185,210,238,0.2)" strokeWidth="1" />
      </g>

      {/* ── Bottom grip rings ── */}
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M72 ${418 + i*10} Q130 ${427 + i*10} 188 ${418 + i*10}`}
          stroke="rgba(155,190,230,0.32)" strokeWidth="1.2" fill="none" />
      ))}

      {/* ── Base ellipse ── */}
      <ellipse cx="130" cy="450" rx="72" ry="10" fill="rgba(160,192,230,0.18)" />
      {/* ── Shadow ── */}
      <ellipse cx="130" cy="508" rx="88" ry="14" fill="url(#bottomGlow)" />
    </svg>
  );
}

/* ── Ripple hook ── */
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const addRipple = useCallback((e, rect) => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 800);
  }, []);
  return [ripples, addRipple];
}

export default function Hero() {
  const bottleRef          = useRef(null);
  const [ripples, addRipple] = useRipple();
  const [tapped, setTapped]  = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount]    = useState({ bottles: 0, years: 0 });

  /* entrance */
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* counter animation */
  useEffect(() => {
    if (!isVisible) return;
    let frame;
    const start    = Date.now();
    const duration = 1800;
    const animate  = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      setCount({ bottles: Math.round(500 * ease), years: Math.round(22 * ease) });
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  /* mouse parallax */
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  /* bottle tap */
  const handleBottleTap = useCallback((e) => {
    const rect = bottleRef.current?.getBoundingClientRect();
    if (rect) addRipple(e, rect);
    setTapped(true);
    setTimeout(() => setTapped(false), 500);
  }, [addRipple]);

  const px = (mousePos.x - 0.5) * 22;
  const py = (mousePos.y - 0.5) * 14;

  return (
    <section className={`${styles.hero} ${isVisible ? styles.visible : ''}`} id="hero">
      {/* Animated background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* LEFT CONTENT */}
      <div className={`${styles.content} ${isVisible ? styles.slideIn : ''}`}>
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
            <span className={styles.statNum}>{count.years}+</span>
            <span className={styles.statLabel}>Years crafting</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{count.bottles}M+</span>
            <span className={styles.statLabel}>Bottles / year</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>ISO</span>
            <span className={styles.statLabel}>9001 : 2015</span>
          </div>
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div
        className={`${styles.visual} ${isVisible ? styles.slideInRight : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
      >
        {/* Background concentric circles (like reference) */}
        <svg className={styles.bgCircles} viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="200" stroke="rgba(26,63,160,0.07)" strokeWidth="1.2" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="255" stroke="rgba(26,63,160,0.05)" strokeWidth="1"   strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="280" stroke="rgba(26,63,160,0.035)" strokeWidth="1"  />
        </svg>

        {/* Background bottle silhouettes */}
        <div className={styles.bgBottles}>
          <div className={`${styles.bgBottle} ${styles.b1}`} />
          <div className={`${styles.bgBottle} ${styles.b2}`} />
          <div className={`${styles.bgBottle} ${styles.b3}`} />
          <div className={`${styles.bgBottle} ${styles.b4}`} />
          <div className={`${styles.bgBottle} ${styles.b5}`} />
        </div>

        {/* Bottle wrapper — parallax + float + tap */}
        <div
          className={`${styles.bottleWrap} ${tapped ? styles.tapped : ''}`}
          style={{ transform: `translate(${px}px, ${py}px)` }}
          ref={bottleRef}
          onClick={handleBottleTap}
          onTouchStart={handleBottleTap}
          title="Tap me!"
        >
          {/* Touch ripples */}
          {ripples.map(r => (
            <span key={r.id} className={styles.ripple} style={{ left: r.x, top: r.y }} />
          ))}

          {/* Glow ring */}
          <div className={styles.glowRing} />

          {/* SVG Bottle — fully transparent background */}
          <BottleSVG className={styles.bottleSvg} />

          {/* Tap hint */}
          <div className={styles.tapHint}>
            <span className={styles.tapIcon}>👆</span>
            <span>Tap me!</span>
          </div>

          {/* Feature tags */}
          <div className={`${styles.tag} ${styles.tagFood}`}>
            <span className={styles.dot} /> Food-grade PET
          </div>
          <div className={`${styles.tag} ${styles.tagCap}`}>
            <span className={styles.dot} /> Custom cap
          </div>
          <div className={`${styles.tag} ${styles.tagLeak}`}>
            <span className={`${styles.dot} ${styles.dotOrange}`} /> Leak-proof
          </div>

          {/* Water ripple on tap */}
          {tapped && <div className={styles.waterRipple} />}
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.particle} style={{ '--i': i }} />
        ))}
      </div>
    </section>
  );
}
