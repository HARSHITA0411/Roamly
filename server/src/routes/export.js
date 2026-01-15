const express = require('express')
const router = express.Router({ mergeParams: true })
const authMiddleware = require('../middleware/auth')
const { exportPDF, exportSummaryPDF } = require('../controllers/exportController')

router.use(authMiddleware)

router.get('/pdf', exportPDF)
router.get('/summary-pdf', exportSummaryPDF)

module.exports = router
