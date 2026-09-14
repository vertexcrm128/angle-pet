import { useState } from 'react';
import { submitQuote } from '../services/api';
import styles from './QuoteForm.module.css';

const INDUSTRIES = ['Food','Pharmaceutical','Cosmetics','Chemical','Agriculture','Personal Care','Healthcare','Beverages','Industrial'];
const BOTTLE_TYPES = ['Water','Juice','Cosmetic','Pharma','Oil','Chemical','HDPE','Trigger Spray','Jars'];

export default function QuoteForm() {
  const [form, setForm] = useState({
    company:'', contact:'', email:'', phone:'',
    industry:'Food', bottleType:'Water', quantity:'', capacity:'', requirements:''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await submitQuote(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.section}`} id="quote">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <span className="section-tag">REQUEST A QUOTE</span>
            <h2 className={styles.title}>Tell us what<br />you're bottling.</h2>
            <p className={styles.desc}>Share a few details and our packaging team gets back within 24 hours with a quote, sample plan and lead time.</p>
            <div className={styles.steps}>
              {['Choose your bottle','Upload your branding','Preview in real time','Submit inquiry','Receive quote in 24h'].map((s,i)=>(
                <div key={i} className={styles.step}>
                  <span className={styles.stepNum}>{i+1}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            {success ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Inquiry Submitted!</h3>
                <p>Our packaging team will get back to you within 24 hours with a quote and sample plan.</p>
                <button className={styles.resetBtn} onClick={() => { setSuccess(false); setForm({ company:'', contact:'', email:'', phone:'', industry:'Food', bottleType:'Water', quantity:'', capacity:'', requirements:'' }); }}>
                  Submit Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="company">COMPANY NAME</label>
                    <input id="company" name="company" value={form.company} onChange={handle} required />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="contact">CONTACT PERSON</label>
                    <input id="contact" name="contact" value={form.contact} onChange={handle} required />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="email">EMAIL</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handle} required />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="phone">PHONE</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handle} required />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="industry">INDUSTRY</label>
                    <select id="industry" name="industry" value={form.industry} onChange={handle}>
                      {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="bottleType">BOTTLE TYPE</label>
                    <select id="bottleType" name="bottleType" value={form.bottleType} onChange={handle}>
                      {BOTTLE_TYPES.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="quantity">QUANTITY</label>
                    <input id="quantity" name="quantity" value={form.quantity} onChange={handle} placeholder="e.g. 50,000" />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="capacity">CAPACITY</label>
                    <input id="capacity" name="capacity" value={form.capacity} onChange={handle} placeholder="e.g. 500ml" />
                  </div>
                </div>
                <div className={styles.groupFull}>
                  <label htmlFor="requirements">ADDITIONAL REQUIREMENTS</label>
                  <textarea id="requirements" name="requirements" rows={4} value={form.requirements} onChange={handle} placeholder="Cap type, label, delivery date, references..." />
                </div>
                {error && <div className={styles.errorMsg}>{error}</div>}
                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? 'Submitting...' : <>Submit Inquiry <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
