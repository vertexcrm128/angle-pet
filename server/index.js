// =====================================
//  ANGEL PET — Express.js Server Entry
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

// ---- Middleware ----
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Angel PET API' });
});

// ---- Routes ----
app.use('/api/quotes', quotesRouter);
app.use('/api/products', productsRouter);
app.use('/api/industries', industriesRouter);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/seed', seedRouter);   // one-time Firestore seeder

// ---- 404 fallback ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ---- Error Handler ----
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀  Angel PET API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});

export default app;
