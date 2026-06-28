const prisma = require('../prismaClient')
const crypto = require('crypto')
const { estimateTransportOptions } = require('../services/gemini')

const VALID_TRANSPORT_MODES = ['bus', 'train', 'car', 'flight']

const generateTripCode = async () => {
  let isUnique = false
  let code = ''
  while (!isUnique) {
    code = crypto.randomBytes(3).toString('hex').toUpperCase()
    const existing = await prisma.trip.findUnique({ where: { tripCode: code } })
    if (!existing) isUnique = true
  }
  return code
}

const createTrip = async (req, res) => {
  try {
    const { name, destination, startDate, endDate, travelers, originCity, transportMode, estimatedTravelHours } = req.body

    if (!name) return res.status(400).json({ error: 'name is required' })
    if (!destination) return res.status(400).json({ error: 'destination is required' })
    if (!startDate) return res.status(400).json({ error: 'startDate is required' })
    if (!endDate) return res.status(400).json({ error: 'endDate is required' })
    if (!travelers) return res.status(400).json({ error: 'travelers is required' })
    if (!originCity) return res.status(400).json({ error: 'originCity is required' })
    if (!transportMode) return res.status(400).json({ error: 'transportMode is required' })
    if (estimatedTravelHours === undefined || estimatedTravelHours === null || estimatedTravelHours === '') {
      return res.status(400).json({ error: 'estimatedTravelHours is required' })
    }

    if (!VALID_TRANSPORT_MODES.includes(transportMode)) {
      return res.status(400).json({ error: 'transportMode must be one of: bus, train, car, flight' })
    }

    const travelHours = parseFloat(estimatedTravelHours)
    if (isNaN(travelHours) || travelHours <= 0) {
      return res.status(400).json({ error: 'estimatedTravelHours must be a positive number' })
    }

    const tripCode = await generateTripCode()

    const trip = await prisma.trip.create({
      data: {
        name,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        travelers: parseInt(travelers),
        originCity,
        transportMode,
        estimatedTravelHours: travelHours,
        tripCode
      }
    })

    // Auto-create owner collaborator
    await prisma.collaborator.create({
      data: { tripId: trip.id, userId: req.user.id, role: 'owner' }
    })

    return res.status(201).json({ trip })
  } catch (err) {
    console.error('Create trip error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const getTrips = async (req, res) => {
  try {
    const collaborations = await prisma.collaborator.findMany({
      where: { userId: req.user.id },
      include: {
        trip: {
          include: {
            _count: { select: { collaborators: true, items: true } }
          }
        }
      }
    })

    const trips = collaborations.map(c => ({
      ...c.trip,
      role: c.role,
      collaboratorCount: c.trip._count.collaborators,
      activityCount: c.trip._count.items
    }))

    return res.json({ trips })
  } catch (err) {
    console.error('Get trips error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const getTrip = async (req, res) => {
  try {
    const { tripId } = req.params

    const collaborator = await prisma.collaborator.findUnique({
      where: { tripId_userId: { tripId, userId: req.user.id } }
    })
    if (!collaborator) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        collaborators: {
          include: { user: { select: { id: true, name: true, email: true } } }
        },
        items: { orderBy: [{ day: 'asc' }, { position: 'asc' }] }
      }
    })

    if (!trip) return res.status(404).json({ error: 'Trip not found' })

    const formattedCollaborators = trip.collaborators.map(c => ({
      id: c.id,
      role: c.role,
      userId: c.userId,
      name: c.user.name,
      email: c.user.email
    }))

    return res.json({ trip: { ...trip, collaborators: formattedCollaborators, userRole: collaborator.role } })
  } catch (err) {
    console.error('Get trip error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params

    const collaborator = await prisma.collaborator.findUnique({
      where: { tripId_userId: { tripId, userId: req.user.id } }
    })
    if (!collaborator) return res.status(403).json({ error: 'Forbidden' })
    if (collaborator.role !== 'owner') return res.status(403).json({ error: 'Only the owner can delete this trip' })

    await prisma.trip.delete({ where: { id: tripId } })

    return res.json({ success: true })
  } catch (err) {
    console.error('Delete trip error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const joinTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const { shareToken } = req.body

    if (!shareToken) return res.status(400).json({ error: 'shareToken is required' })

    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip) return res.status(404).json({ error: 'Trip not found' })
    if (trip.shareToken !== shareToken) return res.status(400).json({ error: 'Invalid share token' })

    const existing = await prisma.collaborator.findUnique({
      where: { tripId_userId: { tripId, userId: req.user.id } }
    })
    if (existing) return res.status(400).json({ error: 'Already a collaborator on this trip' })

    await prisma.collaborator.create({
      data: { tripId, userId: req.user.id, role: 'editor' }
    })

    return res.json({ trip })
  } catch (err) {
    console.error('Join trip error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const getTripByShareToken = async (req, res) => {
  try {
    const { shareToken } = req.params

    const trip = await prisma.trip.findUnique({
      where: { shareToken },
      include: {
        collaborators: {
          where: { role: 'owner' },
          include: { user: { select: { name: true } } }
        }
      }
    })

    if (!trip) return res.status(404).json({ error: 'Trip not found' })

    const owner = trip.collaborators[0]?.user?.name || 'Someone'

    return res.json({
      trip: {
        id: trip.id,
        name: trip.name,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        travelers: trip.travelers,
        shareToken: trip.shareToken,
        tripCode: trip.tripCode,
        createdBy: owner
      }
    })
  } catch (err) {
    console.error('Get trip by share token error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const joinTripByCode = async (req, res) => {
  try {
    const { code } = req.body

    if (!code) return res.status(400).json({ error: 'Trip code is required' })

    const trip = await prisma.trip.findUnique({ where: { tripCode: code.toUpperCase() } })
    if (!trip) return res.status(404).json({ error: 'Invalid trip code' })

    const existing = await prisma.collaborator.findUnique({
      where: { tripId_userId: { tripId: trip.id, userId: req.user.id } }
    })
    if (existing) return res.status(400).json({ error: 'Already a collaborator on this trip' })

    await prisma.collaborator.create({
      data: { tripId: trip.id, userId: req.user.id, role: 'editor' }
    })

    return res.json({ trip })
  } catch (err) {
    console.error('Join trip by code error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const estimateTransport = async (req, res) => {
  try {
    const { originCity, destination } = req.body
    if (!originCity) return res.status(400).json({ error: 'Origin city is required' })
    if (!destination) return res.status(400).json({ error: 'Destination is required' })

    const estimates = await estimateTransportOptions(originCity, destination)
    return res.json({ estimates })
  } catch (err) {
    console.error('Estimate transport error:', err)
    return res.status(500).json({ error: 'Failed to estimate transport details' })
  }
}

module.exports = { createTrip, getTrips, getTrip, deleteTrip, joinTrip, getTripByShareToken, joinTripByCode, estimateTransport }
