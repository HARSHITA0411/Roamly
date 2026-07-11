# 🚀 Roamly — AI-Powered Collaborative Trip Planner

Plan smarter. Travel better. 

🔗 Live Demo
👉 [Roamly Live Demo](https://roamly-frontend-opal.vercel.app/)

Roamly is a real-time collaborative trip planning platform that uses Google Gemini AI to generate personalized itineraries and Google Maps to optimize routes, travel time, and planning. Multiple users can collaborate live with synchronized edits, budgeting, and PDF exports.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Socket.io Client, DnD Kit, Recharts

**Backend:** Node.js, Express.js, Socket.io, Prisma ORM, PostgreSQL (Supabase)

**AI & APIs:** Google Gemini AI, Google Maps API, PDFKit

**Authentication:** JWT

---

## Features

- AI-powered personalized itinerary generation
- Real-time collaborative trip planning with Socket.io
- Live cursor tracking and editing indicators
- Google Maps integration for routes, travel time, and distance calculation
- Drag-and-drop itinerary management
- Budget analytics with interactive charts
- PDF export of complete itineraries
- Secure JWT authentication and user profiles

---

## Project Structure

```text
Roamly/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── context/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   └── middleware/
│   ├── prisma/
│
└── README.md
```

---

## Key APIs

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/trips` | Create a new trip |
| GET | `/api/trips` | Get user's trips |
| POST | `/api/trips/:tripId/itinerary/generate` | Generate AI itinerary |
| POST | `/api/trips/:tripId/join` | Join a trip |
| POST | `/api/trips/:tripId/itinerary/add` | Add itinerary activity |
| GET | `/api/trips/:tripId/export/pdf` | Export itinerary as PDF |

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HARSHITA0411/Roamly.git
cd Roamly
```

---

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the frontend:

```bash
npm run dev
```

---

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
