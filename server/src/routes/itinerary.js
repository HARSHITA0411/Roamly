const express = require('express')
const router = express.Router({ mergeParams: true })
const authMiddleware = require('../middleware/auth')
const {
  generateItineraryHandler, updateItem, deleteItem, reorderItem, addItem, generateSummary, regeocodeItems, regenerateDay, saveRegeneratedDay
} = require('../controllers/itineraryController')

router.use(authMiddleware)

router.post('/generate', generateItineraryHandler)
router.post('/summary', generateSummary)
router.post('/reorder', reorderItem)
router.post('/add', addItem)
router.post('/regeocode', regeocodeItems)
router.post('/regenerate-day', regenerateDay)
router.post('/save-day', saveRegeneratedDay)
router.put('/:itemId', updateItem)
router.delete('/:itemId', deleteItem)

module.exports = router
