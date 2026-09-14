# Angel PET Packaging Studio 🏭
### Full-Stack Web Application — React + Express + Node.js + Firebase

---

## 🏗️ Project Structure

```
angel-pet/
├── client/                 ← React.js (Vite) Frontend
│   ├── public/images/      ← Product images
│   ├── src/
│   │   ├── components/     ← All UI components (CSS Modules)
│   │   ├── pages/          ← Home page
│   │   ├── services/api.js ← Axios API calls
│   │   ├── firebase.js     ← Firebase Client SDK
│   │   └── App.jsx
│   └── vite.config.js      ← Proxy to Express
│
└── server/                 ← Express.js + Node.js Backend
    ├── routes/
    │   ├── quotes.js       ← POST /api/quotes (→ Firestore)
    │   ├── products.js     ← GET /api/products (← Firestore)
    │   ├── industries.js   ← GET /api/industries (← Firestore)
    │   ├── subscribers.js  ← POST /api/subscribers
    │   └── seed.js         ← POST /api/seed (one-time seeder)
    ├── firebase-admin.js   ← Firebase Admin SDK
    ├── middleware/
    │   └── errorHandler.js
    └── index.js            ← Express entry point
```

---

## 🚀 Quick Start

### Step 1 — Set up Firebase (Required)

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Add project"** → Name it `angel-pet`
3. **Enable Firestore Database**:
   - Go to Build → Firestore Database → Create database → Start in test mode
4. **Get Service Account Key** (for the server):
   - Project Settings → Service Accounts → Generate new private key
   - Download the JSON file → rename it `serviceAccountKey.json`
   - Place it in `server/serviceAccountKey.json`
5. **Get Web App Config** (for the client):
   - Project Settings → Your Apps → Add Web App
   - Copy the config values

### Step 2 — Configure Environment Variables

**Server** — copy `.env.example` to `.env`:
```bash
cd server
copy .env.example .env
# Place serviceAccountKey.json in server/ folder
```

**Client** — copy `.env.example` to `.env`:
```bash
cd client
copy .env.example .env
# Fill in your Firebase web app config values
```

### Step 3 — Start the App

**Terminal 1 — Start Express Server:**
```bash
cd server
npm run dev
# → Running on http://localhost:5000
```

**Terminal 2 — Start React Client:**
```bash
cd client
npm run dev
# → Running on http://localhost:5173
```

### Step 4 — Seed Firestore (Optional)

After both servers are running:
```bash
curl -X POST http://localhost:5000/api/seed
```
This populates Firestore with sample products and industries data.

---

## 🔥 Firebase Collections

| Collection | Description |
|---|---|
| `quotes` | Quote form submissions from users |
| `products` | Product catalog (name, range, image, category) |
| `industries` | 9 industry categories |
| `subscribers` | Newsletter email subscribers |

---

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/industries` | Get all industries |
| POST | `/api/quotes` | Submit quote form → Firestore |
| POST | `/api/subscribers` | Newsletter subscribe → Firestore |
| POST | `/api/seed` | One-time Firestore seeder |

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), CSS Modules |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Express.js + Node.js (ESM) |
| Database | Firebase Firestore |
| Validation | express-validator |
| Dev Server | Nodemon |

---

## 💡 Notes

- If `serviceAccountKey.json` is not found, the server runs in **static fallback mode** — products/industries are served from hardcoded data and form submissions are logged to console.
- The Vite dev server proxies `/api/*` requests to `localhost:5000` automatically.
