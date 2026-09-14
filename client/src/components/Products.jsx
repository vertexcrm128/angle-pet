import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import styles from './Products.module.css';

const TAG_FILTERS = ['All','Oil Bottles','Chemical Bottles','Trigger Spray','Caps','Preforms','Jars','HDPE Bottles'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data.products || []))
      .catch(() => setProducts([
        { id:'1', name:'Water Bottles', range:'100ml — 2L', image:'/images/water-bottle.jpg' },
        { id:'2', name:'Juice Bottles', range:'250ml — 1L', image:'/images/juice-bottle.jpg' },
        { id:'3', name:'Cosmetic Bottles', range:'50ml — 500ml', image:'/images/cosmetic-bottle.jpg' },
        { id:'4', name:'Pharma Bottles', range:'30ml — 200ml', image:'/images/pharma-bottle.jpg' },
      ]))
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 4);

  return (
    <section className={`section ${styles.products}`} id="products">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-tag">PRODUCT LIBRARY</span>
            <h2 className="section-title">A shape for every <em>brand story.</em></h2>
          </div>
          <a href="#quote" className={styles.linkArrow}
            onClick={e=>{e.preventDefault();document.getElementById('quote')?.scrollIntoView({behavior:'smooth'})}}>
            Request a custom shape ↗
          </a>
        </div>

        {loading ? (
          <div className={styles.loading}>
            {[1,2,3,4].map(i => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : (
          <div className={styles.grid}>
            {featured.map(p => (
              <div key={p.id} className={styles.card}>
                <div className={styles.imgWrap}>
                  <img src={p.image} alt={p.name} className={styles.img} onError={e=>e.target.src='/images/water-bottle.jpg'} />
                </div>
                <div className={styles.info}>
                  <div>
                    <h3 className={styles.name}>{p.name}</h3>
                    <p className={styles.range}>{p.range}</p>
                  </div>
                  <button className={styles.arrowBtn} aria-label={`View ${p.name}`}>↗</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.tags}>
          {TAG_FILTERS.map(tag => (
            <button key={tag}
              className={`${styles.tagBtn} ${activeTag === tag ? styles.tagActive : ''}`}
              onClick={() => setActiveTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
