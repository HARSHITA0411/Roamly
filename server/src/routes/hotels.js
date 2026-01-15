const express = require('express')
const router = express.Router({ mergeParams: true })
const authMiddleware = require('../middleware/auth')
const { suggestHotels, selectHotel, getHotels } = require('../controllers/hotelsController')

router.use(authMiddleware)

router.post('/suggest', suggestHotels)
router.put('/:hotelId/select', selectHotel)
router.get('/', getHotels)

module.exports = router
