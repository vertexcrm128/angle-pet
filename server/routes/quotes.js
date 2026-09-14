// =====================================
//  Route: POST /api/quotes
//  Saves quote inquiry to Firestore
// =====================================
import express from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../firebase-admin.js';

const router = express.Router();

// Validation rules
const quoteValidation = [
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('contact').trim().notEmpty().withMessage('Contact person is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('bottleType').trim().notEmpty().withMessage('Bottle type is required'),
];

// POST /api/quotes
router.post('/', quoteValidation, async (req, res, next) => {
  try {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, contact, email, phone, industry, bottleType, quantity, capacity, requirements } = req.body;

    const quoteData = {
      company,
      contact,
      email,
      phone,
      industry,
      bottleType,
      quantity: quantity || '',
      capacity: capacity || '',
      requirements: requirements || '',
      status: 'new',               // new | in_progress | quoted | closed
      createdAt: new Date().toISOString(),
    };

    if (db) {
      const docRef = await db.collection('quotes').add(quoteData);
      console.log(`✅  Quote saved to Firestore: ${docRef.id}`);
      return res.status(201).json({
        success: true,
        message: 'Quote inquiry submitted successfully! We\'ll get back to you within 24 hours.',
        id: docRef.id,
      });
    } else {
      // Firebase not configured — log and return mock success
      console.log('⚠️   Firebase not configured. Quote data (not saved):', quoteData);
      return res.status(201).json({
        success: true,
        message: 'Quote received! (Firebase not configured — data logged to console)',
        id: 'mock-' + Date.now(),
      });
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/quotes — Admin: list all quotes
router.get('/', async (req, res, next) => {
  try {
    if (!db) return res.json({ quotes: [], message: 'Firebase not configured' });

    const snapshot = await db.collection('quotes').orderBy('createdAt', 'desc').get();
    const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ quotes, total: quotes.length });
  } catch (err) {
    next(err);
  }
});

export default router;
