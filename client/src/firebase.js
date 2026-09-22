// Firebase Client SDK Configuration
// ====================================
// All credentials are loaded from environment variables (.env)
// NEVER hardcode credentials here — they would be exposed in the browser bundle.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate that all required env vars are present
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
requiredKeys.forEach((key) => {
  if (!firebaseConfig[key]) {
    console.error(`❌ Firebase config missing: VITE_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);
  }
});

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only if supported (not in SSR / non-browser envs)
export const analytics = isSupported().then((supported) => {
  if (supported) return getAnalytics(app);
  return null;
});

export default app;
