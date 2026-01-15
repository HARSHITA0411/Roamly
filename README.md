# Roamly — AI-Powered Trip Planner

Plan smarter. Travel better.

## Quick Start

### 1. Set up the database

Copy the `.env.example` to `.env` in `server/` and fill in:

```
DATABASE_URL="postgresql://postgres.ovjrdgdtwokbqkqxidrr:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
JWT_SECRET=roamly_jwt_secret_2024_change_me
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 2. Push schema to Supabase

```bash
cd server
npx prisma migrate dev --name init
```

### 3. Start the backend

```bash
cd server
npm run dev
```

### 4. Set up the client

Edit `client/.env`:

```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
```

### 5. Start the frontend

```bash
cd client
npm run dev
```

App runs at: **http://localhost:5173**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma v7 |
| AI | Gemini 2.0 Flash |
| Maps | Google Maps JS + Distance Matrix + Geocoding |
| Auth | JWT + bcrypt |
| PDF | pdfkit |
| Drag & Drop | dnd-kit |
| Charts | recharts |

## API Keys Needed

- **Gemini API Key** — from [Google AI Studio](https://aistudio.google.com) ✅ (provided)
- **Google Maps API Key** — from [Google Cloud Console](https://console.cloud.google.com) ⏳ (enable: Maps JS API, Distance Matrix API, Geocoding API)
- **Supabase DB Password** — from Supabase dashboard ⏳

## Deployment

### Frontend → Vercel
Set env vars:
- `VITE_API_URL` = your Render backend URL
- `VITE_GOOGLE_MAPS_API_KEY` = your key

### Backend → Render
Set all env vars from `.env`, then use build command:
```
npx prisma migrate deploy && node src/index.js
```
