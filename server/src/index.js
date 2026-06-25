require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const { setupSocket } = require('./socket/index')

const authRoutes = require('./routes/auth')
const tripsRoutes = require('./routes/trips')
const itineraryRoutes = require('./routes/itinerary')
const exportRoutes = require('./routes/export')
const hotelsRoutes = require('./routes/hotels')

const app = express()

// CORS — accept any localhost origin (Vite picks unpredictable ports like 5173, 5177, etc.)
const isAllowedOrigin = (origin) => {
  if (!origin) return true
  // Allow any localhost port in development
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true
  if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true
  // Allow explicit CLIENT_URL for production (normalize trailing slashes)
  if (process.env.CLIENT_URL) {
    const cleanOrigin = origin.replace(/\/$/, '')
    const cleanClientUrl = process.env.CLIENT_URL.replace(/\/$/, '')
    if (cleanOrigin === cleanClientUrl) return true
  }
  // Fallback: Allow any Vercel subdomain to prevent CORS block
  if (/\.vercel\.app$/.test(origin)) return true
  return false
}

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) return callback(null, true)
    // Don't throw an Error — just deny the CORS. Throwing crashes the request as 500.
    return callback(null, false)
  },
  credentials: true
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/trips', tripsRoutes)
app.use('/api/trips/:tripId/itinerary', itineraryRoutes)
app.use('/api/trips/:tripId/export', exportRoutes)
app.use('/api/trips/:tripId/hotels', hotelsRoutes)

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Something went wrong' })
})

// Wrap with HTTP server + Socket.io
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true)
      return callback(null, false)
    },
    credentials: true
  }
})

// Make io available to route handlers (for emitting from HTTP routes)
app.set('io', io)

setupSocket(io)

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  httpServer.listen(PORT, () => {
    console.log(`🚀 Roamly server running on port ${PORT}`)
  })
}

module.exports = app
