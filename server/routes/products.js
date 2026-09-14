// =====================================
//  Route: GET /api/products
// =====================================
import express from 'express';
import { db } from '../firebase-admin.js';

const router = express.Router();

// Fallback static data if Firestore not available
const STATIC_PRODUCTS = [
  { id: '1', name: 'Water Bottles', range: '100ml — 2L', category: 'beverage', image: '/images/water-bottle.jpg', tags: ['PET', 'Food-grade'] },
  { id: '2', name: 'Juice Bottles', range: '250ml — 1L', category: 'beverage', image: '/images/juice-bottle.jpg', tags: ['PET', 'Food-grade'] },
  { id: '3', name: 'Cosmetic Bottles', range: '50ml — 500ml', category: 'cosmetic', image: '/images/cosmetic-bottle.jpg', tags: ['PET', 'Pump'] },
  { id: '4', name: 'Pharma Bottles', range: '30ml — 200ml', category: 'pharma', image: '/images/pharma-bottle.jpg', tags: ['Amber', 'Pharma-grade'] },
  { id: '5', name: 'Oil Bottles', range: '100ml — 5L', category: 'food', image: '/images/water-bottle.jpg', tags: ['HDPE', 'Food-grade'] },
  { id: '6', name: 'Chemical Bottles', range: '500ml — 20L', category: 'chemical', image: '/images/water-bottle.jpg', tags: ['HDPE', 'Chemical-grade'] },
  { id: '7', name: 'Trigger Spray', range: '300ml — 1L', category: 'personal-care', image: '/images/cosmetic-bottle.jpg', tags: ['PET', 'Spray'] },
  { id: '8', name: 'Caps', range: 'All sizes', category: 'accessory', image: '/images/water-bottle.jpg', tags: ['PP', 'PE'] },
  { id: '9', name: 'Preforms', range: 'Custom', category: 'raw', image: '/images/water-bottle.jpg', tags: ['PET', 'Custom'] },
  { id: '10', name: 'Jars', range: '50ml — 2L', category: 'cosmetic', image: '/images/cosmetic-bottle.jpg', tags: ['PET', 'Wide-mouth'] },
  { id: '11', name: 'HDPE Bottles', range: '100ml — 25L', category: 'industrial', image: '/images/water-bottle.jpg', tags: ['HDPE', 'Industrial'] },
];

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;

    if (db) {
      let query = db.collection('products');
      if (category && category !== 'all') query = query.where('category', '==', category);
      const snapshot = await query.orderBy('order', 'asc').get();
      if (!snapshot.empty) {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.json({ products, total: products.length, source: 'firestore' });
      }
    }

    // Return static fallback
    const filtered = category && category !== 'all'
      ? STATIC_PRODUCTS.filter(p => p.category === category)
      : STATIC_PRODUCTS;
    res.json({ products: filtered, total: filtered.length, source: 'static' });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (db) {
      const doc = await db.collection('products').doc(id).get();
      if (doc.exists) return res.json({ id: doc.id, ...doc.data() });
    }
    const product = STATIC_PRODUCTS.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
