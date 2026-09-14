// =====================================
//  Route: POST /api/subscribers
// =====================================
import express from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../firebase-admin.js';

const router = express.Router();

router.post('/', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;

    if (db) {
      // Check for existing subscriber
      const existing = await db.collection('subscribers').where('email', '==', email).get();
      if (!existing.empty) {
        return res.json({ success: true, message: 'Already subscribed!' });
      }
      await db.collection('subscribers').add({ email, subscribedAt: new Date().toISOString() });
    }

    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    next(err);
  }
});

export default router;
