const prisma = require('../prismaClient')
const { generatePDF } = require('../services/pdf')

const exportPDF = async (req, res) => {
  try {
    const { tripId } = req.params

    const collaborator = await prisma.collaborator.findUnique({
      where: { tripId_userId: { tripId, userId: req.user.id } }
    })
    if (!collaborator) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        items: { orderBy: [{ day: 'asc' }, { position: 'asc' }] }
      }
    })

    if (!trip) return res.status(404).json({ error: 'Trip not found' })

    // Fetch saved hotels for PDF accommodation section
    const savedHotels = await prisma.hotel.findMany({
      where: { tripId, saved: true },
      orderBy: [{ checkinDay: 'asc' }]
    })

    generatePDF(trip, trip.items, res, savedHotels)
  } catch (err) {
    console.error('Export PDF error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const exportSummaryPDF = async (req, res) => {
  try {
    const { tripId } = req.params

    const collaborator = await prisma.collaborator.findUnique({
      where: { tripId_userId: { tripId, userId: req.user.id } }
    })
    if (!collaborator) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        items: { orderBy: [{ day: 'asc' }, { position: 'asc' }] }
      }
    })

    if (!trip) return res.status(404).json({ error: 'Trip not found' })

    const { generateSummaryPDF } = require('../services/pdf')
    generateSummaryPDF(trip, trip.items, res)
  } catch (err) {
    console.error('Export Summary PDF error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = { exportPDF, exportSummaryPDF }
