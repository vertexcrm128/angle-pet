import styles from './Manufacturing.module.css';

const STEPS = [
  { num:'01', title:'Raw Material', desc:'Food-grade PET & HDPE resins, batch tested' },
  { num:'02', title:'Design', desc:'CAD engineering & rapid prototyping' },
  { num:'03', title:'Mould Development', desc:'In-house tooling & mould library' },
  { num:'04', title:'Injection Moulding', desc:'Precision preforms at scale' },
  { num:'05', title:'Blow Moulding', desc:'Stretch blow with even wall distribution' },
  { num:'06', title:'Quality Testing', desc:'Leak, drop, torque & migration tests' },
  { num:'07', title:'Packaging', desc:'Clean-room grade wrap & palletisation' },
  { num:'08', title:'Dispatch', desc:'Pan-India logistics, on-time SLA' },
];

export default function Manufacturing() {
  return (
    <section className={`section ${styles.mfg}`} id="manufacturing">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <span className="section-tag">MANUFACTURING EXCELLENCE</span>
            <h2 className="section-title">Precision from<br /><em>resin to shelf.</em></h2>
            <p className="section-desc">
              A single, monitored production line — from resin intake to dispatch. Every bottle passes eight controlled stages, so what leaves our facility performs the same on every shelf, every batch.
            </p>
            <div className={styles.stats}>
              {[['500M+','BOTTLES / YR'],['22+','YEARS'],['60+','CITIES']].map(([n,l])=>(
                <div key={l} className={styles.stat}>
                  <span className={styles.statNum}>{n}</span>
                  <span className={styles.statLabel}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.facilityWrap}>
              <img src="/images/manufacturing.jpg" alt="Our Manufacturing Facility" className={styles.facilityImg} />
              <div className={styles.caption}>
                OUR FACILITY<br />
                <span>Blow moulding · Injection · QC Lab</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.steps}>
          <div className={styles.line} />
          {STEPS.map(step => (
            <div key={step.num} className={styles.step}>
              <div className={styles.circle}><span className={styles.stepNum}>{step.num}</span></div>
              <div className={styles.stepInfo}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
