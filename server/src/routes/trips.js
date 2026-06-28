const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const {
  createTrip, getTrips, getTrip, deleteTrip, joinTrip, getTripByShareToken, joinTripByCode, estimateTransport
} = require('../controllers/tripsController')

// Public route
router.get('/join/:shareToken', getTripByShareToken)

// Protected routes
router.use(authMiddleware)

router.post('/join-by-code', joinTripByCode)
router.post('/estimate-transport', estimateTransport)
router.post('/', createTrip)
router.get('/', getTrips)
router.get('/:tripId', getTrip)
router.delete('/:tripId', deleteTrip)
router.post('/:tripId/join', joinTrip)

module.exports = router
