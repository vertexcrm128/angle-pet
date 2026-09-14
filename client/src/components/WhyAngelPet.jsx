import styles from './WhyAngelPet.module.css';

const FEATURES = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Food-Grade Materials', desc: 'Certified virgin PET & HDPE resin, batch-verified.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: 'Leak-Proof Design', desc: 'Torque-tested caps and precision neck finishes.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M19.07 19.07l-1.41-1.41M5.34 5.34l-1.41 1.41M21 12h-2M5 12H3M12 21v-2M12 5V3"/></svg>, title: 'Modern Machinery', desc: 'Automated blow & injection lines with in-line QC.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, title: 'Custom Branding', desc: 'Full-wrap, shrink sleeve & embossed labelling.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Fast Delivery', desc: 'Dedicated logistics — on-time dispatch SLA.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, title: 'Competitive Pricing', desc: 'Direct-from-factory, transparent quotes.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, title: 'Pan-India Supply', desc: '60+ cities served, warehousing in 4 regions.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 22c0-5-4-9-9-9 0 4 3 8 9 9zm0 0c0-5 4-9 9-9-1 4-5 8-9 9z"/></svg>, title: 'Eco Manufacturing', desc: 'Closed-loop recycling & energy-efficient plant.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v10M9 18l3 3 3-3"/></svg>, title: 'ISO 9001 : 2015', desc: 'Audited quality management across the plant.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3fa0" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: 'Design Support', desc: 'In-house CAD & prototyping with your team.' },
];

export default function WhyAngelPet() {
  return (
    <section className={`section ${styles.why}`} id="why">
      <div className="container">
        <span className="section-tag">WHY ANGEL PET</span>
        <h2 className="section-title">Manufacturing you can<br /><em>stake your brand on.</em></h2>
        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h4 className={styles.title}>{f.title}</h4>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
