# 🚀 Roamly — AI-Powered Collaborative Trip Planner

Plan smarter. Travel together. Seamlessly explore the world.

🔗 Live Demo
👉 [Roamly Live Demo](https://roamly-ai.vercel.app)

📌 Overview
Roamly is a collaborative, real-time, AI-driven trip planner designed to take the stress out of planning group travel. 

The platform allows users to instantly generate personalized day-by-day itineraries based on travel style, pacing, and budget preferences using Google Gemini. With Google Maps integration, Roamly auto-calculates travel times, distances, and alerts users of timing conflicts. Collaboration is fully synchronized via WebSockets (Socket.io), enabling real-time cursor tracking, group editing indicators, shared budgeting analytics, interactive messaging, and quick PDF exports.

Built using React, Node.js, Express, Socket.io, Prisma, and PostgreSQL (Supabase).

---

✨ Features

🔐 Authentication & Personalization
* **Secure Auth**: User Registration & Login with JWT-based sessions.
* **Traveler Profiles**: Customizable preferences including Travel Style (*Adventure, Relaxed, Cultural*), Pace (*Packed, Light*), Budget Range (*Budget, Mid-range, Premium*), and Distance Units (*KM, Miles*).
* **UI Themes**: Support for light, dark, and system default themes.

🤖 AI-Powered Itinerary Generation
* **Custom AI Trips**: Generate detailed, multi-day trip itineraries customized to budget constraints, origin/destination, travelers, transport modes, and duration.
* **Automatic Travel Cards**: Inserts departure/arrival travel legs into the first and last days of the itinerary based on the selected mode of transport.
* **AI Daily Summaries**: Generates 1-2 line descriptive summaries for each day's planned events.
* **Gemini Smart Fallbacks**: Cascades through multiple Gemini candidate models (`gemini-2.5-flash-lite`, `gemini-2.5-flash`, `gemini-2.0-flash`) for optimized response latency and cost.

👥 Real-Time Collaboration & Presence
* **Live Presence Bar**: View active online collaborators in the session.
* **Cursor Tracking**: Spot active users planning concurrently with color-coded live cursors showing mouse movements across the workspace.
* **Collaborative Editing Indicators**: Real-time notifications showing who is currently editing which activity card.
* **Instant Sync**: Itinerary item updates, drag-and-drop movements, and new items immediately propagate to all connected clients.
* **Invite System**: Shareable links and unique Invite Codes to easily add collaborators with specific roles (*owner, editor, viewer*).

🗺️ Interactive Maps & Travel Routing
* **Live Google Map**: Interactive markers corresponding to itinerary locations and activity cards.
* **Route Polyline Rendering**: Draws paths connecting travel items chronologically.
* **Distance Matrix calculations**: Uses Google Maps API to fetch real-time travel durations and distances between successive stops.
* **Conflict Alerts**: Visually flags activities with timing overlaps or planning inconsistencies.

🔄 Drag & Drop Itinerary Canvas
* **Flexible Re-ordering**: Drag activity cards to change chronological order or move them across days.
* **Interactive Grid**: Built using `@dnd-kit/sortable` for a fluid desktop and mobile experience.

📊 Budget & Financial Analytics
* **Interactive Charts**: Rendered with Recharts to illustrate overall estimated trip costs vs. budgeted limits.
* **Category Breakdown**: Group expenses visually by category: *Outdoor, Food, Transport, Culture, and Accommodation*.

💬 Workspace Group Chat
* **In-App Chat**: Discuss plan changes right beside your itinerary canvas.
* **Message Persistence**: Store complete conversation logs in the PostgreSQL database.

📄 PDF Export Utility
* **Export PDF**: Generates high-quality, formatted travel summary sheets and full itineraries containing travel details on-demand via `pdfkit`.

---

🛠 Tech Stack

### Frontend
* **Core**: React.js, Vite
* **Routing**: React Router DOM (v7)
* **Real-time Sync**: Socket.io-Client
* **Drag-and-Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`
* **Charts**: Recharts
* **Styling & Icons**: CSS variables, Tailwind CSS, Lucide React
* **Client PDF**: `html2pdf.js`

### Backend
* **Core**: Node.js, Express.js
* **Real-time Engine**: Socket.io
* **ORM**: Prisma Client v7
* **Database**: PostgreSQL (hosted on Supabase)
* **PDF Engine**: PDFKit

### AI & Geolocation APIs
* **Large Language Models**: Google Gemini 2.5 / 2.0 Flash (via `@google/generative-ai` SDK)
* **Maps Integration**: Google Maps Javascript API, Geocoding API, Distance Matrix API

---

🏗 System Architecture

```
                 User Browser
                       │
                       ▼
                 React Frontend
              (Vite + socket.io-client)
                       │
                       ▼
                 Express Backend  ◄──►  Socket.io Server
                       │                  (Presence & Live Cursors)
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     Prisma         Gemini AI    Google Maps APIs
        │          (LangChain)        │
        ▼              │              ├── Geocoding
    PostgreSQL         └──────────────┼── Distance Matrix
    (Supabase)                        └── Maps JS
```

---

🔄 Application Workflow

```
Create Account / Login ──► Set Preferences (Theme, Style, Pace)
                                      │
                                      ▼
Create New Trip (Origin, Destination, Dates, Transport Mode)
                                      │
                                      ▼
             🤖 AI Generates Custom Daily Itinerary
                                      │
                                      ▼
             👥 Invite Collaborators via Link/Code
                                      │
                                      ▼
    ┌─────────────────────────────────┴─────────────────────────────────┐
    ▼                                 ▼                                 ▼
Real-Time Chat &       Drag & Drop Cards (DND-kit)       Browse & Save Hotels
Presence Cursors        & Edit Times / Costs              Google Places suggestions
    └─────────────────────────────────┬─────────────────────────────────┘
                                      │
                                      ▼
             🗺️ Google Maps Auto-calculates Travel Times
                                      │
                                      ▼
             📊 Review Budget Recharts Visualizations
                                      │
                                      ▼
             📄 Export Clean PDF Itinerary for Travel
```

---

📂 Project Structure

```
Roamly
│
├── client                   # Frontend React Application
│   ├── src
│   │   ├── api              # Axios configuration & API handlers
│   │   ├── components       # ActivityCard, BudgetView, MapView, PresenceBar...
│   │   ├── context          # AuthContext, ToastContext
│   │   ├── hooks            # Socket/state sync custom hooks
│   │   ├── pages            # Dashboard, Join, Landing, Login, Settings, TripDetail
│   │   └── utils            # Formatting helpers and coordinate math
│   ├── package.json
│   └── vite.config.js
│
├── server                   # Backend Express & Real-time Server
│   ├── src
│   │   ├── controllers      # Auth, Trips, Itinerary, Hotels, Export logic
│   │   ├── middleware       # Authentication & error parsing
│   │   ├── routes           # Express route definitions
│   │   ├── services         # Google Gemini, Google Maps, PDFKit generators
│   │   ├── socket           # Socket.io connection handlers & presence maps
│   │   └── index.js         # Entrypoint
│   ├── prisma               # Prisma schemas & database migrations
│   ├── package.json
│   └── vercel.json
│
├── START_APP.bat            # Windows startup script (run everything in one click)
├── package.json             # Root workspace runner
└── README.md
```

---

🚀 Installation & Setup

### Prerequisites
* **Node.js**: Version 18.x or above
* **PostgreSQL Database**: Supabase account or local DB instance
* **Google Cloud Project**: With API Key enabling *Maps Javascript API, Distance Matrix API, and Geocoding API*
* **Gemini API Key**: From [Google AI Studio](https://aistudio.google.com)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/YourUsername/Roamly.git
cd Roamly
```

### Step 2: Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and configure the variables:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://username:password@aws-db-endpoint.pooler.supabase.com:5432/postgres?pgbouncer=true"
   JWT_SECRET=your_roamly_jwt_secret_change_me
   GEMINI_API_KEY=your_google_gemini_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_platform_key
   CLIENT_URL=http://localhost:5173
   ```
4. Generate database schema:
   ```bash
   npx prisma generate
   ```
5. Apply database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start the server:
   ```bash
   npm run dev
   ```

---

### Step 3: Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_platform_key
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

---

### Alternative: Direct Windows Run
You can launch both the frontend and backend servers together with root dependencies auto-checked by double-clicking the `START_APP.bat` script in the project root, or running:
```bash
npm run install:all
npm run dev
```
The client app will launch at: **http://localhost:5173**
The server API will run at: **http://localhost:5000**

---

🔌 API Endpoints

### Authentication
* `POST /api/auth/register` - Create user profile
* `POST /api/auth/login` - Secure credential login
* `GET /api/auth/me` - Fetch authenticated user details [Protected]
* `PUT /api/auth/update` - Update travel preferences and theme [Protected]

### Trips
* `POST /api/trips/` - Create a new trip [Protected]
* `GET /api/trips/` - Retrieve all user trips [Protected]
* `GET /api/trips/:tripId` - Get details of a single trip [Protected]
* `DELETE /api/trips/:tripId` - Delete a trip plan [Protected]
* `POST /api/trips/:tripId/join` - Add authenticated user as a collaborator [Protected]
* `GET /api/trips/join/:shareToken` - Get public trip summary for joining [Public]
* `POST /api/trips/join-by-code` - Join trip using custom Invite Code [Protected]
* `POST /api/trips/estimate-transport` - Predict travel leg options using Maps Distance Matrix [Protected]

### Itinerary Items
* `POST /api/trips/:tripId/itinerary/generate` - Generate AI trip itinerary using Gemini [Protected]
* `POST /api/trips/:tripId/itinerary/summary` - Update daily summary [Protected]
* `POST /api/trips/:tripId/itinerary/add` - Add custom activity manually [Protected]
* `POST /api/trips/:tripId/itinerary/reorder` - Update item index positions and days [Protected]
* `PUT /api/trips/:tripId/itinerary/:itemId` - Update specific activity properties [Protected]
* `DELETE /api/trips/:tripId/itinerary/:itemId` - Remove an activity [Protected]
* `POST /api/trips/:tripId/itinerary/regeocode` - Fetch coordinates for itinerary locations [Protected]
* `POST /api/trips/:tripId/itinerary/recalc-travel-times` - Re-evaluate routing distances [Protected]
* `POST /api/trips/:tripId/itinerary/regenerate-day` - Regenerate specific day's activities [Protected]
* `POST /api/trips/:tripId/itinerary/save-day` - Save updated itinerary changes [Protected]

### Hotel Suggestions
* `GET /api/trips/:tripId/hotels/` - Fetch saved hotels [Protected]
* `POST /api/trips/:tripId/hotels/suggest` - Query Gemini & Google Places for suggestions [Protected]
* `PUT /api/trips/:tripId/hotels/:hotelId/select` - Select a hotel block for lodging [Protected]

### Exports
* `GET /api/trips/:tripId/export/pdf` - Download detailed itinerary as PDF [Protected]
* `GET /api/trips/:tripId/export/summary-pdf` - Download short summary as PDF [Protected]

---

🔒 Security Features
* **Stateless Token-Auth**: Secure JWT validation on HTTP headers and WS connection handshake.
* **Cascaded Cascade-Deletes**: Automatic delete triggers via Prisma schemas to prevent orphan records.
* **CORS Middleware Filtering**: Strict origin whitelisting for local development ports and production domains (`*.vercel.app`).
* **Environment Separation**: Sensitive keys (Gemini API, Google Maps, Postgres credentials) stored exclusively server-side.
* **Bcrypt Password Encryption**: Safe storage of credentials utilizing hashing algorithms.

⚡ Performance Optimizations
* **Location Lookup Cache**: Fast, deduplicated mapping calculations using PostgreSQL cache schema to prevent duplicate Google Distance Matrix API charges.
* **Parallel Promise Processing**: Executing parallel async fetches for Google Place listings and itineraries.
* **Database Indexing**: Optimized foreign key query speeds using specific indices on `Hotel` and `TripMessage` schemas.
* **Socket Debouncing & Throttling**: Lightweight events for cursor positioning tracking.

🎯 Future Roadmap
* **Voice-guided AI Planner**: Build a smart travel assistant that listens to voice commands.
* **Splitwise Expense Integration**: Split shared food/hotel bills among collaborators in-app.
* **Weather Integration**: Sync destination weather forecasts straight to travel day views.
* **Flight Pricing Tracker**: Graph prices for travel transport.
* **Offline Synchronization**: Offline-first itinerary editing using Service Workers and local storage sync.
