// =====================================
//  Route: POST /api/seed
//  One-time Firestore seeder
// =====================================
import express from 'express';
import { db } from '../firebase-admin.js';

const router = express.Router();

const PRODUCTS = [
  { name: 'Water Bottles', range: '100ml — 2L', category: 'beverage', image: '/images/water-bottle.jpg', tags: ['PET', 'Food-grade'], order: 1 },
  { name: 'Juice Bottles', range: '250ml — 1L', category: 'beverage', image: '/images/juice-bottle.jpg', tags: ['PET', 'Food-grade'], order: 2 },
  { name: 'Cosmetic Bottles', range: '50ml — 500ml', category: 'cosmetic', image: '/images/cosmetic-bottle.jpg', tags: ['PET', 'Pump'], order: 3 },
  { name: 'Pharma Bottles', range: '30ml — 200ml', category: 'pharma', image: '/images/pharma-bottle.jpg', tags: ['Amber', 'Pharma-grade'], order: 4 },
  { name: 'Oil Bottles', range: '100ml — 5L', category: 'food', image: '/images/water-bottle.jpg', tags: ['HDPE', 'Food-grade'], order: 5 },
  { name: 'Chemical Bottles', range: '500ml — 20L', category: 'chemical', image: '/images/water-bottle.jpg', tags: ['HDPE', 'Chemical-grade'], order: 6 },
  { name: 'Trigger Spray', range: '300ml — 1L', category: 'personal-care', image: '/images/cosmetic-bottle.jpg', tags: ['PET', 'Spray'], order: 7 },
  { name: 'Caps', range: 'All sizes', category: 'accessory', image: '/images/water-bottle.jpg', tags: ['PP', 'PE'], order: 8 },
  { name: 'Preforms', range: 'Custom', category: 'raw', image: '/images/water-bottle.jpg', tags: ['PET', 'Custom'], order: 9 },
  { name: 'Jars', range: '50ml — 2L', category: 'cosmetic', image: '/images/cosmetic-bottle.jpg', tags: ['PET', 'Wide-mouth'], order: 10 },
  { name: 'HDPE Bottles', range: '100ml — 25L', category: 'industrial', image: '/images/water-bottle.jpg', tags: ['HDPE', 'Industrial'], order: 11 },
];

const INDUSTRIES = [
  { num: '01', name: 'Food', subtitle: 'Certified · Regulatory grade', icon: 'food', order: 1 },
  { num: '02', name: 'Pharmaceutical', subtitle: 'Certified · Regulatory grade', icon: 'pharma', order: 2 },
  { num: '03', name: 'Cosmetics', subtitle: 'Certified · Regulatory grade', icon: 'cosmetics', order: 3 },
  { num: '04', name: 'Chemical', subtitle: 'Certified · Regulatory grade', icon: 'chemical', order: 4 },
  { num: '05', name: 'Agriculture', subtitle: 'Certified · Regulatory grade', icon: 'agriculture', order: 5 },
  { num: '06', name: 'Personal Care', subtitle: 'Certified · Regulatory grade', icon: 'personalcare', order: 6 },
  { num: '07', name: 'Healthcare', subtitle: 'Certified · Regulatory grade', icon: 'healthcare', order: 7 },
  { num: '08', name: 'Beverages', subtitle: 'Certified · Regulatory grade', icon: 'beverages', order: 8 },
  { num: '09', name: 'Industrial', subtitle: 'Certified · Regulatory grade', icon: 'industrial', order: 9 },
];

// POST /api/seed — seeds Firestore with products and industries
router.post('/', async (req, res, next) => {
  try {
    if (!db) return res.status(503).json({ error: 'Firebase not configured' });

    const batch = db.batch();

    // Seed products
    for (const product of PRODUCTS) {
      const ref = db.collection('products').doc();
      batch.set(ref, { ...product, createdAt: new Date().toISOString() });
    }

    // Seed industries
    for (const industry of INDUSTRIES) {
      const ref = db.collection('industries').doc();
      batch.set(ref, { ...industry, createdAt: new Date().toISOString() });
    }

    await batch.commit();
    console.log('✅  Firestore seeded with products and industries');
    res.json({ success: true, message: 'Firestore seeded successfully!', seeded: { products: PRODUCTS.length, industries: INDUSTRIES.length } });
  } catch (err) {
    next(err);
  }
});

export default router;
