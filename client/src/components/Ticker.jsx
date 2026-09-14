import styles from './Ticker.module.css';

const ITEMS = ['FOOD & BEVERAGE','PHARMACEUTICAL','COSMETICS','PERSONAL CARE','CHEMICAL','AGRICULTURE','HEALTHCARE','BEVERAGES','INDUSTRIAL'];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.wrap}>
      <div className={styles.ticker}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}<span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
