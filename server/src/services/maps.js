const axios = require('axios')
const prisma = require('../prismaClient')


const MAPS_KEY = () => process.env.GOOGLE_MAPS_API_KEY

// Check if Google Maps is actually configured
const isMapsConfigured = () => {
  const key = MAPS_KEY()
  return key && key !== 'your_google_maps_api_key_here' && key.length > 10
}

// Geocode a single location — returns { lat, lng } or null
const geocodeLocation = async (location) => {
  if (!isMapsConfigured()) return null

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json`
    const res = await axios.get(url, {
      params: { address: location, key: MAPS_KEY() }
    })
    if (res.data.results && res.data.results.length > 0) {
      const { lat, lng } = res.data.results[0].geometry.location
      return { lat, lng }
    }
    return null
  } catch (err) {
    console.error(`Geocode failed for "${location}":`, err.message)
    return null
  }
}

// Geocode all items in-place — gracefully skips if Maps is not configured
const geocodeItems = async (items) => {
  if (!isMapsConfigured()) {
    console.log('⚠️  Google Maps API key not configured — skipping geocoding. Items will be saved without coordinates.')
    for (const item of items) {
      item.lat = null
      item.lng = null
    }
    return items
  }

  for (const item of items) {
    const coords = await geocodeLocation(item.location)
    if (coords) {
      item.lat = coords.lat
      item.lng = coords.lng
    } else {
      item.lat = null
      item.lng = null
    }
  }
  return items
}

// Parse time "HH:MM" to minutes since midnight
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

// Run Distance Matrix for uncached pairs
const getDistanceMatrix = async (pairs) => {
  if (pairs.length === 0) return {}

  const origins = pairs.map(p => p.from)
  const destinations = pairs.map(p => p.to)

  console.log(`📍 Distance Matrix API: ${pairs.length} pairs`)
  console.log(`   Origins: ${origins.join(' | ')}`)
  console.log(`   Destinations: ${destinations.join(' | ')}`)

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`
  const res = await axios.get(url, {
    params: {
      origins: origins.join('|'),
      destinations: destinations.join('|'),
      mode: 'driving',
      key: MAPS_KEY()
    }
  })

  console.log(`   API Status: ${res.data.status}`)
  if (res.data.error_message) {
    console.error(`   API Error: ${res.data.error_message}`)
  }

  const results = {}
  const rows = res.data.rows

  if (!rows || rows.length === 0) {
    console.warn('   No rows returned from Distance Matrix API')
    return results
  }

  for (let i = 0; i < pairs.length; i++) {
    try {
      const element = rows[i].elements[i]
      console.log(`   Pair ${i}: ${pairs[i].from} → ${pairs[i].to} = ${element.status}${element.status === 'OK' ? ` (${element.duration.text})` : ''}`)
      if (element.status === 'OK') {
        const minutes = Math.ceil(element.duration.value / 60)
        results[`${pairs[i].from}|||${pairs[i].to}`] = minutes
      }
    } catch (e) {
      console.warn(`   Pair ${i} failed:`, e.message)
    }
  }

  console.log(`   ✅ Got ${Object.keys(results).length} travel times`)
  return results
}

// Main validation function — updates items with travelTimeFromPrevious and hasTimingConflict
// Gracefully skips if Maps is not configured
const validateTravelTimes = async (items) => {
  if (!isMapsConfigured()) {
    console.log('⚠️  Google Maps API key not configured — skipping travel time validation.')
    // Still set default values so the database doesn't complain
    for (const item of items) {
      item.travelTimeFromPrevious = null
      item.hasTimingConflict = false
    }
    return items
  }

  // Group items by day
  const byDay = {}
  for (const item of items) {
    if (!byDay[item.day]) byDay[item.day] = []
    byDay[item.day].push(item)
  }

  // Sort each day by time
  for (const day of Object.keys(byDay)) {
    byDay[day].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
  }

  // For each day, check consecutive pairs
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const uncachedPairs = []

  for (const day of Object.keys(byDay)) {
    const dayItems = byDay[day]
    for (let i = 1; i < dayItems.length; i++) {
      const from = dayItems[i - 1].location
      const to = dayItems[i].location

      // Check cache
      const cached = await prisma.locationCache.findUnique({
        where: { origin_destination: { origin: from, destination: to } }
      })

      if (!cached || cached.cachedAt < thirtyDaysAgo) {
        uncachedPairs.push({ from, to, dayKey: day, idx: i })
      }
    }
  }

  // Batch API call for uncached pairs
  let apiResults = {}
  if (uncachedPairs.length > 0) {
    try {
      apiResults = await getDistanceMatrix(uncachedPairs)

      // Store in cache
      for (const pair of uncachedPairs) {
        const key = `${pair.from}|||${pair.to}`
        if (apiResults[key] !== undefined) {
          await prisma.locationCache.upsert({
            where: { origin_destination: { origin: pair.from, destination: pair.to } },
            create: { origin: pair.from, destination: pair.to, travelMinutes: apiResults[key], cachedAt: new Date() },
            update: { travelMinutes: apiResults[key], cachedAt: new Date() }
          })
        }
      }
    } catch (err) {
      console.error('Distance Matrix API failed:', err.message)
    }
  }

  // Apply travel times and flag conflicts
  for (const day of Object.keys(byDay)) {
    const dayItems = byDay[day]
    dayItems[0].travelTimeFromPrevious = null
    dayItems[0].hasTimingConflict = false

    for (let i = 1; i < dayItems.length; i++) {
      const prev = dayItems[i - 1]
      const curr = dayItems[i]
      const from = prev.location
      const to = curr.location
      const cacheKey = `${from}|||${to}`

      let travelMinutes = null

      // Try cache first
      try {
        const cached = await prisma.locationCache.findUnique({
          where: { origin_destination: { origin: from, destination: to } }
        })
        if (cached) travelMinutes = cached.travelMinutes
      } catch (e) {}

      // Fallback to API result
      if (travelMinutes === null && apiResults[cacheKey] !== undefined) {
        travelMinutes = apiResults[cacheKey]
      }

      curr.travelTimeFromPrevious = travelMinutes

      if (travelMinutes !== null) {
        const prevStartMinutes = timeToMinutes(prev.time)
        const currStartMinutes = timeToMinutes(curr.time)
        const gap = currStartMinutes - prevStartMinutes - prev.durationMinutes
        curr.hasTimingConflict = gap < travelMinutes
      } else {
        curr.hasTimingConflict = false
      }
    }
  }

  return items
}

module.exports = { geocodeItems, validateTravelTimes, geocodeLocation, isMapsConfigured }
