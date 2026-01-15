const prisma = require('../prismaClient')
const { generateItinerary } = require('../services/gemini')
const { geocodeItems, validateTravelTimes, geocodeLocation, isMapsConfigured } = require('../services/maps')


const canModify = (role) => role === 'owner' || role === 'editor'

const getCollaboratorRole = async (tripId, userId) => {
  const collab = await prisma.collaborator.findUnique({
    where: { tripId_userId: { tripId, userId } }
  })
  return collab?.role || null
}

// POST /api/trips/:tripId/itinerary/generate
const generateItineraryHandler = async (req, res) => {
  try {
    const { tripId } = req.params
    const { prompt } = req.body

    if (!prompt) return res.status(400).json({ error: 'prompt is required' })

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip) return res.status(404).json({ error: 'Trip not found' })

    const userRecord = await prisma.user.findUnique({ where: { id: req.user.id } })

    // Generate with AI
    const aiItems = await generateItinerary({
      userPrompt: prompt,
      destination: trip.destination,
      originCity: trip.originCity,
      transportMode: trip.transportMode,
      estimatedTravelHours: trip.estimatedTravelHours,
      travelStyle: userRecord.travelStyle,
      pace: userRecord.pace,
      budgetRange: userRecord.budgetRange,
      travelers: trip.travelers,
      startDate: trip.startDate.toISOString().split('T')[0],
      endDate: trip.endDate.toISOString().split('T')[0]
    })

    // Geocode locations
    const geocodedItems = await geocodeItems(aiItems)

    // Validate travel times
    const validatedItems = await validateTravelTimes(geocodedItems)

    // Delete existing items
    await prisma.itineraryItem.deleteMany({ where: { tripId } })

    // Save all items
    const saved = await Promise.all(
      validatedItems.map((item, idx) =>
        prisma.itineraryItem.create({
          data: {
            tripId,
            day: item.day,
            position: idx * 1.0,
            type: item.category === 'transport' ? 'transport' : 'activity',
            time: item.time,
            activity: item.activity,
            location: item.location,
            lat: item.lat,
            lng: item.lng,
            durationMinutes: item.durationMinutes,
            estimatedCost: item.estimatedCost,
            category: item.category,
            notes: item.notes || null,
            travelTimeFromPrevious: item.travelTimeFromPrevious || null,
            hasTimingConflict: item.hasTimingConflict || false
          }
        })
      )
    )

    // Generate summary
    const { generateDailySummaries } = require('../services/gemini')
    const summaries = await generateDailySummaries(trip, saved)
    await prisma.trip.update({ where: { id: tripId }, data: { dailySummaries: summaries } })

    return res.json({ items: saved, dailySummaries: summaries })
  } catch (err) {
    console.error('Generate itinerary error:', err)

    // Differentiate error types for the frontend
    const message = err.message || 'Something went wrong'
    let status = 500

    if (message.includes('API key')) status = 401
    if (message.includes('quota') || message.includes('rate limit')) status = 429

    return res.status(status).json({
      error: message,
      hint: status === 429
        ? 'Your free Gemini API quota has been exhausted. Please wait for it to reset or use a paid plan.'
        : status === 401
          ? 'The Gemini API key in the server .env file is invalid. Please update it.'
          : 'Please try again in a few moments.'
    })
  }
}

// PUT /api/trips/:tripId/itinerary/:itemId
const updateItem = async (req, res) => {
  try {
    const { tripId, itemId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const allowedFields = ['time', 'activity', 'location', 'durationMinutes', 'estimatedCost', 'category', 'notes', 'day', 'position', 'lat', 'lng']
    const updateData = {}
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field]
    }

    // Re-geocode server-side only if location changed AND client didn't provide coords
    if (updateData.location && updateData.lat === undefined && updateData.lng === undefined) {
      const coords = await geocodeLocation(updateData.location)
      if (coords) {
        updateData.lat = coords.lat
        updateData.lng = coords.lng
      }
    }

    const item = await prisma.itineraryItem.update({
      where: { id: itemId },
      data: updateData
    })

    return res.json({ item })
  } catch (err) {
    console.error('Update item error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

// DELETE /api/trips/:tripId/itinerary/:itemId
const deleteItem = async (req, res) => {
  try {
    const { tripId, itemId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    await prisma.itineraryItem.delete({ where: { id: itemId } })

    return res.json({ success: true })
  } catch (err) {
    console.error('Delete item error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

// POST /api/trips/:tripId/itinerary/reorder
const reorderItem = async (req, res) => {
  try {
    const { tripId } = req.params
    const { itemId, newPosition, day } = req.body

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const item = await prisma.itineraryItem.update({
      where: { id: itemId },
      data: { position: newPosition, day: parseInt(day) }
    })

    return res.json({ item })
  } catch (err) {
    console.error('Reorder item error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

// POST /api/trips/:tripId/itinerary/add
const addItem = async (req, res) => {
  try {
    const { tripId } = req.params
    const { day, time, activity, location, durationMinutes, estimatedCost, category, notes } = req.body

    if (!day) return res.status(400).json({ error: 'day is required' })
    if (!time) return res.status(400).json({ error: 'time is required' })
    if (!activity) return res.status(400).json({ error: 'activity is required' })
    if (!location) return res.status(400).json({ error: 'location is required' })

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    // Determine position based on chronological order of time
    const dayItems = await prisma.itineraryItem.findMany({
      where: { tripId, day: parseInt(day) },
      orderBy: { position: 'asc' }
    })

    let position = 0
    let placed = false
    const [newH, newM] = time.split(':').map(Number)
    const newTimeMins = newH * 60 + newM

    for (let i = 0; i < dayItems.length; i++) {
      const item = dayItems[i]
      const [h, m] = item.time.split(':').map(Number)
      const itemTimeMins = h * 60 + m

      if (newTimeMins < itemTimeMins) {
        if (i === 0) {
          position = item.position - 1.0
        } else {
          position = (dayItems[i - 1].position + item.position) / 2.0
        }
        placed = true
        break
      }
    }

    if (!placed) {
      if (dayItems.length > 0) {
        position = dayItems[dayItems.length - 1].position + 1.0
      } else {
        position = 0
      }
    }

    // Geocode location
    let lat = null, lng = null
    const coords = await geocodeLocation(location)
    if (coords) { lat = coords.lat; lng = coords.lng }

    const item = await prisma.itineraryItem.create({
      data: {
        tripId,
        day: parseInt(day),
        position,
        time,
        activity,
        location,
        lat,
        lng,
        durationMinutes: parseInt(durationMinutes) || 60,
        estimatedCost: parseInt(estimatedCost) || 0,
        category: category || 'outdoor',
        notes: notes || null
      }
    })

    return res.status(201).json({ item })
  } catch (err) {
    console.error('Add item error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

// POST /api/trips/:tripId/itinerary/summary
const generateSummary = async (req, res) => {
  try {
    const { tripId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { items: true }
    })
    
    if (!trip || trip.items.length === 0) {
      return res.status(400).json({ error: 'No itinerary to summarize' })
    }

    const { generateDailySummaries } = require('../services/gemini')
    const summaries = await generateDailySummaries(trip, trip.items)
    
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: { dailySummaries: summaries }
    })

    return res.json({ dailySummaries: updatedTrip.dailySummaries })
  } catch (err) {
    console.error('Generate summary error:', err)
    return res.status(500).json({ error: 'Failed to generate summary' })
  }
}

// POST /api/trips/:tripId/itinerary/regeocode
const regeocodeItems = async (req, res) => {
  try {
    const { tripId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })

    if (!isMapsConfigured()) {
      return res.status(400).json({ error: 'Google Maps API key is not configured on the server.' })
    }

    // Fetch all items for this trip that are missing coordinates
    const itemsToGeocode = await prisma.itineraryItem.findMany({
      where: {
        tripId,
        OR: [{ lat: null }, { lng: null }]
      }
    })

    if (itemsToGeocode.length === 0) {
      return res.json({ message: 'All items already have coordinates', updated: 0 })
    }

    let updated = 0
    for (const item of itemsToGeocode) {
      const coords = await geocodeLocation(item.location)
      if (coords) {
        await prisma.itineraryItem.update({
          where: { id: item.id },
          data: { lat: coords.lat, lng: coords.lng }
        })
        updated++
      }
    }

    // Fetch all updated items to return
    const allItems = await prisma.itineraryItem.findMany({
      where: { tripId },
      orderBy: [{ day: 'asc' }, { position: 'asc' }]
    })

    return res.json({ message: `Geocoded ${updated} of ${itemsToGeocode.length} items`, updated, items: allItems })
  } catch (err) {
    console.error('Regeocode error:', err)
    return res.status(500).json({ error: 'Failed to geocode items' })
  }
}

// POST /api/trips/:tripId/itinerary/regenerate-day
const regenerateDay = async (req, res) => {
  try {
    const { tripId } = req.params
    const { day, prompt, preview } = req.body

    if (!day) return res.status(400).json({ error: 'day is required' })
    if (!prompt) return res.status(400).json({ error: 'prompt is required' })

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip) return res.status(404).json({ error: 'Trip not found' })

    const userRecord = await prisma.user.findUnique({ where: { id: req.user.id } })

    // Get all existing items for context
    const allItems = await prisma.itineraryItem.findMany({
      where: { tripId },
      orderBy: [{ day: 'asc' }, { position: 'asc' }]
    })
    const otherDaysItems = allItems.filter(i => i.day !== parseInt(day))

    const totalDays = [...new Set(allItems.map(i => i.day))].length

    const dayNum = parseInt(day)
    const isLastDay = dayNum === Math.max(...allItems.map(i => i.day))

    const regenPrompt = `You are a travel itinerary generator. Return ONLY a valid raw JSON array. No explanation, no markdown, no code fences.

You are regenerating ONLY Day ${dayNum} of an existing trip. Do not touch any other day.

Trip context:
- Destination: ${trip.destination}
- Traveling from: ${trip.originCity} by ${trip.transportMode}
- Total trip: ${trip.startDate.toISOString().split('T')[0]} to ${trip.endDate.toISOString().split('T')[0]}
- Travelers: ${trip.travelers}
- Travel style: ${userRecord.travelStyle}, Pace: ${userRecord.pace}, Budget: ${userRecord.budgetRange}

What the other days look like (for context only — do not change these):
${JSON.stringify(otherDaysItems)}

User's instruction for Day ${dayNum}: "${prompt}"

Rules:
- Return items for Day ${dayNum} only.
- Each item must have: day (must be ${dayNum}), time (24hr), activity, location (include city), durationMinutes, estimatedCost (INR integer), category (outdoor/food/transport/culture/accommodation), notes.
- Do not schedule more than 4-5 activities.
- If this is Day 1, include the travel card from ${trip.originCity} first.
- If this is the last day (Day ${isLastDay ? dayNum : '?'}), include a return journey card at the end.
- Schedule realistically with travel time between locations.`

    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const MODEL_CANDIDATES = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash']

    let aiItems = null
    for (const modelName of MODEL_CANDIDATES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const result = await model.generateContent(regenPrompt)
        let text = result.response.text().replace(/```json|```/g, '').trim()
        const start = text.indexOf('[')
        const end = text.lastIndexOf(']')
        if (start === -1 || end === -1) throw new Error('No JSON array')
        aiItems = JSON.parse(text.slice(start, end + 1))
        aiItems = aiItems.map((item, idx) => ({
          day: dayNum,
          time: typeof item.time === 'string' && /^\d{2}:\d{2}$/.test(item.time) ? item.time : '09:00',
          activity: String(item.activity || `Activity ${idx + 1}`),
          location: String(item.location || 'Unknown location'),
          durationMinutes: parseInt(item.durationMinutes) || 60,
          estimatedCost: parseInt(item.estimatedCost) || 0,
          category: ['outdoor', 'food', 'transport', 'culture', 'accommodation'].includes(item.category)
            ? item.category : 'outdoor',
          notes: String(item.notes || '')
        }))
        break
      } catch (err) {
        console.warn(`Regen day failed with ${modelName}:`, err.message)
      }
    }

    if (!aiItems) return res.status(500).json({ error: 'AI generation failed. Please try again.' })

    // Geocode and validate new day items
    const geocodedItems = await geocodeItems(aiItems)
    const validatedItems = await validateTravelTimes(geocodedItems)

    if (preview) {
      const previewItems = validatedItems.map((item, idx) => ({
        ...item,
        id: `temp-${Date.now()}-${idx}`,
        tripId,
        position: idx * 1.0,
        type: item.category === 'transport' ? 'transport' : 'activity',
        lat: item.lat || null,
        lng: item.lng || null,
        hasTimingConflict: item.hasTimingConflict || false,
        travelTimeFromPrevious: item.travelTimeFromPrevious || null
      }))
      return res.json({ items: previewItems, day: dayNum, preview: true })
    }

    // Delete only items for this day
    await prisma.itineraryItem.deleteMany({ where: { tripId, day: dayNum } })

    // Save new items
    const saved = await Promise.all(
      validatedItems.map((item, idx) =>
        prisma.itineraryItem.create({
          data: {
            tripId,
            day: item.day,
            position: idx * 1.0,
            type: item.category === 'transport' ? 'transport' : 'activity',
            time: item.time,
            activity: item.activity,
            location: item.location,
            lat: item.lat || null,
            lng: item.lng || null,
            durationMinutes: item.durationMinutes,
            estimatedCost: item.estimatedCost,
            category: item.category,
            notes: item.notes || null,
            travelTimeFromPrevious: item.travelTimeFromPrevious || null,
            hasTimingConflict: item.hasTimingConflict || false
          }
        })
      )
    )

    // Emit socket event so other collaborators see the update
    const io = req.app.get('io')
    if (io) {
      io.to(`trip:${tripId}`).emit('day_regenerated', { day: dayNum, items: saved })
    }

    return res.json({ items: saved, day: dayNum })
  } catch (err) {
    console.error('Regenerate day error:', err)
    return res.status(500).json({ error: err.message || 'Something went wrong' })
  }
}

// POST /api/trips/:tripId/itinerary/save-day
const saveRegeneratedDay = async (req, res) => {
  try {
    const { tripId } = req.params
    const { day, items } = req.body

    if (!day) return res.status(400).json({ error: 'day is required' })
    if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'items array is required' })

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const dayNum = parseInt(day)

    // Delete existing items for this day
    await prisma.itineraryItem.deleteMany({ where: { tripId, day: dayNum } })

    // Save new items
    const saved = await Promise.all(
      items.map((item, idx) =>
        prisma.itineraryItem.create({
          data: {
            tripId,
            day: dayNum,
            position: idx * 1.0,
            type: item.category === 'transport' ? 'transport' : 'activity',
            time: item.time,
            activity: item.activity,
            location: item.location,
            lat: item.lat || null,
            lng: item.lng || null,
            durationMinutes: item.durationMinutes,
            estimatedCost: item.estimatedCost,
            category: item.category,
            notes: item.notes || null,
            travelTimeFromPrevious: item.travelTimeFromPrevious || null,
            hasTimingConflict: item.hasTimingConflict || false
          }
        })
      )
    )

    // Emit socket event
    const io = req.app.get('io')
    if (io) {
      io.to(`trip:${tripId}`).emit('day_regenerated', { day: dayNum, items: saved })
    }

    return res.json({ items: saved, day: dayNum })
  } catch (err) {
    console.error('Save regenerated day error:', err)
    return res.status(500).json({ error: err.message || 'Something went wrong' })
  }
}

module.exports = { generateItineraryHandler, updateItem, deleteItem, reorderItem, addItem, generateSummary, regeocodeItems, regenerateDay, saveRegeneratedDay }
