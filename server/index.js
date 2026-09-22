// =====================================
//  ANGEL PET — Express.js Server Entry
//  Works both locally and on Vercel
// =====================================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import quotesRouter from './routes/quotes.js';
import productsRouter from './routes/products.js';
import industriesRouter from './routes/industries.js';
import subscribersRouter from './routes/subscribers.js';
import seedRouter from './routes/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Allowed Origins ----
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'https://angle-pet.vercel.app',
  'https://angel-pet.vercel.app',
  /\.vercel\.app$/,          // any Vercel preview URL
];

// ---- Middleware ----
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, same-origin)
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some((o) =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Angel PET API',
    env: process.env.NODE_ENV || 'development',
  });
});

// ---- Routes ----
app.use('/api/quotes',      quotesRouter);
app.use('/api/products',    productsRouter);
app.use('/api/industries',  industriesRouter);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/seed',        seedRouter);

// ---- 404 fallback ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ---- Error Handler ----
app.use(errorHandler);

// ---- Start server only in local dev (not on Vercel) ----
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀  Angel PET API running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
}

// ---- Export for Vercel Serverless ----
export default app;
