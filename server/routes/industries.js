// =====================================
//  Route: GET /api/industries
// =====================================
import express from 'express';
import { db } from '../firebase-admin.js';

const router = express.Router();

const STATIC_INDUSTRIES = [
  { id: '1', num: '01', name: 'Food', subtitle: 'Certified · Regulatory grade', icon: 'food', order: 1 },
  { id: '2', num: '02', name: 'Pharmaceutical', subtitle: 'Certified · Regulatory grade', icon: 'pharma', order: 2 },
  { id: '3', num: '03', name: 'Cosmetics', subtitle: 'Certified · Regulatory grade', icon: 'cosmetics', order: 3 },
  { id: '4', num: '04', name: 'Chemical', subtitle: 'Certified · Regulatory grade', icon: 'chemical', order: 4 },
  { id: '5', num: '05', name: 'Agriculture', subtitle: 'Certified · Regulatory grade', icon: 'agriculture', order: 5 },
  { id: '6', num: '06', name: 'Personal Care', subtitle: 'Certified · Regulatory grade', icon: 'personalcare', order: 6 },
  { id: '7', num: '07', name: 'Healthcare', subtitle: 'Certified · Regulatory grade', icon: 'healthcare', order: 7 },
  { id: '8', num: '08', name: 'Beverages', subtitle: 'Certified · Regulatory grade', icon: 'beverages', order: 8 },
  { id: '9', num: '09', name: 'Industrial', subtitle: 'Certified · Regulatory grade', icon: 'industrial', order: 9 },
];

router.get('/', async (req, res, next) => {
  try {
    if (db) {
      const snapshot = await db.collection('industries').orderBy('order', 'asc').get();
      if (!snapshot.empty) {
        const industries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.json({ industries, total: industries.length, source: 'firestore' });
      }
    }
    res.json({ industries: STATIC_INDUSTRIES, total: STATIC_INDUSTRIES.length, source: 'static' });
  } catch (err) {
    next(err);
  }
});

export default router;
