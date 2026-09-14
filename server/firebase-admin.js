// =====================================
//  Firebase Admin SDK Initialization
// =====================================
import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

function initFirebase() {
  if (admin.apps.length > 0) {
    db = admin.firestore();
    return db;
  }

  // Option 1: Use service account JSON file (recommended for local dev)
  const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');

  if (existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅  Firebase Admin initialized via serviceAccountKey.json');
  } else if (process.env.FIREBASE_PROJECT_ID) {
    // Option 2: Use environment variables
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('✅  Firebase Admin initialized via environment variables');
  } else {
    console.warn('⚠️   No Firebase credentials found. Running without database.');
    // Initialize with a mock (for development without Firebase)
    return null;
  }

  db = admin.firestore();
  return db;
}

db = initFirebase();

export { db, admin };
