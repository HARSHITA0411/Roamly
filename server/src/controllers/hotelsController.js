const prisma = require('../prismaClient')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const axios = require('axios')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const MODEL_CANDIDATES = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash']

const canModify = (role) => role === 'owner' || role === 'editor'

const getCollaboratorRole = async (tripId, userId) => {
  const collab = await prisma.collaborator.findUnique({
    where: { tripId_userId: { tripId, userId } }
  })
  return collab?.role || null
}

const priceLevelToRange = (level) => {
  switch (level) {
    case 1: return '₹500–₹1,500/night'
    case 2: return '₹1,500–₹3,500/night'
    case 3: return '₹3,500–₹7,000/night'
    case 4: return '₹7,000+/night'
    default: return null
  }
}

const callGeminiForZones = async (itineraryItems, destination, startDate, endDate) => {
  const prompt = `You are a travel assistant. Return ONLY a valid raw JSON array. No explanation, no markdown, no code fences.

Here is a multi-day trip itinerary. Analyze the locations across all days and identify the minimum number of hotel zones needed — ideally 1, maximum 2.

Itinerary:
${JSON.stringify(itineraryItems)}

Trip destination: ${destination}
Trip dates: ${startDate} to ${endDate}

For each zone return:
{
  "zone": "<string, short zone name e.g. Central Manali>",
  "checkinDay": <number, day the traveler should check in>,
  "checkoutDay": <number, day the traveler should check out>,
  "checkinDate": "<string, ISO date>",
  "checkoutDate": "<string, ISO date>",
  "searchArea": "<string, specific area name suitable for a Google Places search e.g. Mall Road, Manali, Himachal Pradesh>",
  "rationale": "<string, one sentence explaining why this zone covers these days>"
}

Rules:
- Minimize hotel moves. One zone is ideal if geographically sensible.
- checkinDay is the first day whose activities are in this zone.
- checkoutDay is the last day whose activities are in this zone.
- searchArea must be specific enough for Google Places API to return relevant hotels.`

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      let text = result.response.text().replace(/```json|```/g, '').trim()
      const start = text.indexOf('[')
      const end = text.lastIndexOf(']')
      if (start === -1 || end === -1) throw new Error('No JSON array')
      return JSON.parse(text.slice(start, end + 1))
    } catch (err) {
      console.warn(`Hotel zone clustering failed with ${modelName}:`, err.message)
    }
  }
  throw new Error('Hotel zone clustering failed with all models')
}

const fetchHotelsForZone = async (zone) => {
  const key = process.env.GOOGLE_MAPS_API_KEY

  const generateMockHotels = () => {
    return [
      {
        name: `Premium Stay in ${zone.zone}`,
        formatted_address: `123 Main St, ${zone.searchArea}`,
        rating: 4.8,
        price_level: 3,
        place_id: `mock_place_1_${zone.zone}`,
      },
      {
        name: `Comfort Inn ${zone.zone}`,
        formatted_address: `456 Oak Rd, ${zone.searchArea}`,
        rating: 4.2,
        price_level: 2,
        place_id: `mock_place_2_${zone.zone}`,
      },
      {
        name: `Budget Lodge ${zone.zone}`,
        formatted_address: `789 Pine Ln, ${zone.searchArea}`,
        rating: 3.9,
        price_level: 1,
        place_id: `mock_place_3_${zone.zone}`,
      }
    ].map(place => ({
      name: place.name,
      address: place.formatted_address,
      zone: zone.zone,
      checkinDay: zone.checkinDay,
      checkoutDay: zone.checkoutDay,
      checkinDate: new Date(zone.checkinDate),
      checkoutDate: new Date(zone.checkoutDate),
      rating: place.rating,
      priceRange: priceLevelToRange(place.price_level),
      photoUrl: null,
      googlePlaceId: place.place_id,
      mapsUrl: null,
      saved: false
    }));
  };

  if (!key || key === 'your_google_maps_api_key_here') {
    return generateMockHotels();
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`
    const res = await axios.get(url, {
      params: {
        query: `hotels near ${zone.searchArea}`,
        type: 'lodging',
        key
      }
    })

    if (res.data.status !== 'OK' || !res.data.results || res.data.results.length === 0) {
      console.warn(`Places API returned ${res.data.status || 'no results'}. Falling back to mock data.`);
      return generateMockHotels();
    }

    const results = res.data.results.slice(0, 3)
    return results.map(place => {
      const photoRef = place.photos?.[0]?.photo_reference
      const photoUrl = photoRef
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${key}`
        : null
      return {
        name: place.name || 'Unknown Hotel',
        address: place.formatted_address || '',
        zone: zone.zone,
        checkinDay: zone.checkinDay,
        checkoutDay: zone.checkoutDay,
        checkinDate: new Date(zone.checkinDate),
        checkoutDate: new Date(zone.checkoutDate),
        rating: place.rating || null,
        priceRange: priceLevelToRange(place.price_level),
        photoUrl,
        googlePlaceId: place.place_id || null,
        mapsUrl: place.place_id ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}` : null,
        saved: false
      }
    })
  } catch (err) {
    console.error(`Places API failed for zone "${zone.zone}":`, err.message)
    return generateMockHotels();
  }
}

// POST /api/trips/:tripId/hotels/suggest
const suggestHotels = async (req, res) => {
  try {
    const { tripId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { items: { orderBy: [{ day: 'asc' }, { position: 'asc' }] } }
    })
    if (!trip) return res.status(404).json({ error: 'Trip not found' })
    if (!trip.items || trip.items.length === 0) {
      return res.status(400).json({ error: 'Generate an itinerary first' })
    }

    // Get zone suggestions from Gemini
    const zones = await callGeminiForZones(
      trip.items,
      trip.destination,
      trip.startDate.toISOString().split('T')[0],
      trip.endDate.toISOString().split('T')[0]
    )

    // Delete existing unsaved hotels for this trip
    await prisma.hotel.deleteMany({ where: { tripId, saved: false } })

    // Fetch real hotels for each zone
    const allHotels = []
    for (const zone of zones) {
      const hotels = await fetchHotelsForZone(zone)
      for (const hotel of hotels) {
        const saved = await prisma.hotel.create({
          data: { tripId, ...hotel }
        })
        allHotels.push(saved)
      }
    }

    // Group by zone
    const byZone = {}
    for (const hotel of allHotels) {
      if (!byZone[hotel.zone]) byZone[hotel.zone] = []
      byZone[hotel.zone].push(hotel)
    }

    return res.json({ hotels: allHotels, byZone })
  } catch (err) {
    console.error('Suggest hotels error:', err)
    return res.status(500).json({ error: err.message || 'Something went wrong' })
  }
}

// PUT /api/trips/:tripId/hotels/:hotelId/select
const selectHotel = async (req, res) => {
  try {
    const { tripId, hotelId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })
    if (!canModify(role)) return res.status(403).json({ error: 'Forbidden' })

    const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } })
    if (!hotel || hotel.tripId !== tripId) return res.status(404).json({ error: 'Hotel not found' })

    // Deselect all in same zone, select this one
    await prisma.hotel.updateMany({
      where: { tripId, zone: hotel.zone },
      data: { saved: false }
    })
    const updated = await prisma.hotel.update({
      where: { id: hotelId },
      data: { saved: true }
    })

    // Emit socket event
    const io = req.app.get('io')
    if (io) {
      io.to(`trip:${tripId}`).emit('hotel_selected', { hotelId, zone: hotel.zone })
    }

    return res.json({ hotel: updated })
  } catch (err) {
    console.error('Select hotel error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

// GET /api/trips/:tripId/hotels
const getHotels = async (req, res) => {
  try {
    const { tripId } = req.params

    const role = await getCollaboratorRole(tripId, req.user.id)
    if (!role) return res.status(403).json({ error: 'Forbidden' })

    const hotels = await prisma.hotel.findMany({
      where: { tripId },
      orderBy: [{ zone: 'asc' }, { rating: 'desc' }]
    })

    const byZone = {}
    for (const hotel of hotels) {
      if (!byZone[hotel.zone]) byZone[hotel.zone] = []
      byZone[hotel.zone].push(hotel)
    }

    return res.json({ hotels, byZone })
  } catch (err) {
    console.error('Get hotels error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = { suggestHotels, selectHotel, getHotels }
