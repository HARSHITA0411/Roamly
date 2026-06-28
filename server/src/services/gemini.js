const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Ordered list of models to try — gemini-2.0-flash was retired June 1 2026
const MODEL_CANDIDATES = [
  'gemini-3.5-flash',       // Current recommended replacement
  'gemini-3.1-flash-lite',  // Cost-efficient fallback
  'gemini-2.5-flash',       // Older but may still work
]

const buildPrompt = (params) => {
  const {
    userPrompt, destination, originCity, transportMode, estimatedTravelHours,
    travelStyle, pace, budgetRange, travelers, startDate, endDate
  } = params

  return `You are a travel itinerary generator. Your ONLY job is to return a valid JSON array.
Do NOT include any explanation, preamble, markdown, or code fences.
Return ONLY the raw JSON array and nothing else.

Each item in the array must follow this exact structure:
{
  "day": <number, starting from 1>,
  "time": <string, 24-hour format like "09:00">,
  "activity": <string, name of the activity>,
  "location": <string, full address or landmark name with city>,
  "durationMinutes": <number>,
  "estimatedCost": <number, in INR, integer only>,
  "category": <one of: "outdoor", "food", "transport", "culture", "accommodation">,
  "notes": <string, one helpful tip, or empty string>
}

Rules:
- The traveler is starting their journey from ${originCity} to ${destination} by ${transportMode}.
- The estimated one-way travel time from ${originCity} to ${destination} is ${estimatedTravelHours} hours.
- On Day 1, account for this travel time at the start of the day. Add a "travel" activity card as the first item of Day 1 with category "transport", the correct duration in minutes (${Math.round(estimatedTravelHours * 60)}), and realistic departure time. The location for this card should be the destination city, not the origin.
- Schedule all remaining activities for Day 1 only after the traveler has arrived.
- On the last day, if the traveler needs to return, add a return journey card at the end of the last day with the same duration and transport mode.
- Schedule activities realistically. Include travel time between locations in your timing.
- Do not schedule more than 4-5 activities per day (not counting the travel card).
- estimatedCost is per person in INR.
- location must be specific enough to geocode — include city name always.
- Return items sorted by day, then by time within each day.

Trip details: ${userPrompt}

Traveler preferences:
- Travel style: ${travelStyle}
- Pace preference: ${pace}
- Budget range: ${budgetRange}
- Number of travelers: ${travelers}
- Trip duration: ${startDate} to ${endDate}
- Starting from: ${originCity}
- Mode of transport to destination: ${transportMode}
- Estimated travel time one way: ${estimatedTravelHours} hours

Generate a complete day-by-day itinerary.`
}

const parseResponse = (text) => {
  // Strip markdown fences
  let cleaned = text.replace(/```json|```/g, '').trim()
  // Extract the JSON array
  const start = cleaned.indexOf('[')
  const end = cleaned.lastIndexOf(']')
  if (start === -1 || end === -1) throw new Error('No JSON array found in AI response')
  const parsed = JSON.parse(cleaned.slice(start, end + 1))

  // Validate basic structure
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('AI returned an empty itinerary')
  }

  // Validate and sanitize each item
  return parsed.map((item, idx) => ({
    day: parseInt(item.day) || 1,
    time: typeof item.time === 'string' && /^\d{2}:\d{2}$/.test(item.time) ? item.time : '09:00',
    activity: String(item.activity || `Activity ${idx + 1}`),
    location: String(item.location || 'Unknown location'),
    durationMinutes: parseInt(item.durationMinutes) || 60,
    estimatedCost: parseInt(item.estimatedCost) || 0,
    category: ['outdoor', 'food', 'transport', 'culture', 'accommodation'].includes(item.category)
      ? item.category : 'outdoor',
    notes: String(item.notes || '')
  }))
}

// Sleep helper for retry backoff
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Try a single model with retry logic for rate limits
const tryModelWithRetry = async (modelName, prompt, maxRetries = 2) => {
  const model = genAI.getGenerativeModel({ model: modelName })

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      return parseResponse(text)
    } catch (err) {
      const status = err.status || err.httpStatusCode || 0
      const message = err.message || ''

      // Model doesn't exist or was retired → don't retry, move to next model
      if (status === 404 || message.includes('is not found')) {
        console.warn(`Model "${modelName}" not available (404). Skipping.`)
        throw { modelNotFound: true, modelName }
      }

      // Rate limit → wait and retry with exponential backoff
      if (status === 429 || message.includes('429') || message.includes('quota')) {
        // Extract retry delay from error if available
        const retryMatch = message.match(/retry in (\d+(?:\.\d+)?)/i)
        const suggestedDelay = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) * 1000 : null
        const backoffMs = suggestedDelay || (Math.pow(2, attempt) * 5000) // 5s, 10s, 20s

        if (attempt < maxRetries) {
          console.log(`Rate limited on "${modelName}", retrying in ${backoffMs / 1000}s (attempt ${attempt + 1}/${maxRetries})...`)
          await sleep(backoffMs)
          continue
        }
        // All retries exhausted for this model
        throw { quotaExhausted: true, modelName }
      }

      // API key invalid
      if (status === 400 || status === 403 || message.includes('API key')) {
        throw { invalidKey: true, message: err.message }
      }

      // Other error — retry once more, then give up
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt + 1} failed for "${modelName}": ${err.message}. Retrying...`)
        await sleep(2000)
        continue
      }
      throw err
    }
  }
}

const generateItinerary = async (params) => {
  const prompt = buildPrompt(params)
  const errors = []

  // Try each model in order
  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`Trying model: ${modelName}...`)
      const items = await tryModelWithRetry(modelName, prompt)
      console.log(`✅ Success with "${modelName}" — generated ${items.length} items`)
      return items
    } catch (err) {
      if (err.modelNotFound) {
        errors.push(`${err.modelName}: retired/unavailable`)
        continue // Try next model
      }
      if (err.quotaExhausted) {
        errors.push(`${err.modelName}: rate limit exceeded`)
        continue // Try next model (might have separate quota)
      }
      if (err.invalidKey) {
        // Don't try other models — the key itself is bad
        throw new Error('Invalid Gemini API key. Please check your GEMINI_API_KEY in the server .env file.')
      }
      // Parse errors or unexpected failures
      errors.push(`${modelName}: ${err.message}`)
      continue
    }
  }

  // All models failed
  const allQuota = errors.every(e => e.includes('rate limit'))
  if (allQuota) {
    throw new Error(
      'Gemini API quota exceeded for all available models. ' +
      'Your free tier daily limit has been reached. ' +
      'Please wait for the quota to reset (usually resets daily) or upgrade to a paid plan at https://ai.google.dev.'
    )
  }

  console.error('All model attempts failed:', errors)
  throw new Error(
    `AI generation failed after trying ${MODEL_CANDIDATES.length} models. ` +
    `Errors: ${errors.join(' | ')}. ` +
    'Please try again in a few minutes.'
  )
}

const generateDailySummaries = async (trip, items) => {
  // Group items by day
  const byDay = {}
  items.forEach(i => {
    if (!byDay[i.day]) byDay[i.day] = []
    byDay[i.day].push(i)
  })

  const days = Object.keys(byDay).map(Number).sort((a,b) => a - b)
  const tripDetails = `Trip to ${trip.destination}. Days: ${days.join(', ')}`
  const dailyActivities = days.map(day => {
    const acts = byDay[day].sort((a,b) => a.time.localeCompare(b.time)).map(a => `${a.time} - ${a.activity} at ${a.location}`).join('; ')
    return `Day ${day}: ${acts}`
  }).join('\n')

  const prompt = `You are a travel summary assistant. For the given trip itinerary, write a short, exciting 1-2 line summary for EACH day.

The summary should highlight the vibe of the day (e.g., "An adventurous day starting with...", "A relaxing cultural exploration...").

Return a valid JSON object where the keys are the day numbers (as strings, e.g. "1", "2") and the values are the 1-2 line summary string. Do NOT include markdown or code fences. Just raw JSON.

Trip Context: ${tripDetails}
Daily Activities:
${dailyActivities}`

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      let text = result.response.text()
      text = text.replace(/```json|```/g, '').trim()
      const start = text.indexOf('{')
      const end = text.lastIndexOf('}')
      if (start === -1 || end === -1) throw new Error('No JSON object found')
      return JSON.parse(text.slice(start, end + 1))
    } catch (err) {
      console.warn(`Failed to generate summary with ${modelName}:`, err.message)
      // ignore and try next
    }
  }
  return {}
}

const estimateTransportOptions = async (originCity, destination) => {
  const prompt = `You are a travel assistant. Evaluate the practicality and estimated one-way travel time of 4 transport modes (bus, train, car, flight) from "${originCity}" to "${destination}".
Return ONLY a valid JSON object. Do NOT include any explanations, markdown code fences, or preamble. The response must be raw JSON matching this structure:
{
  "bus": { "practical": boolean, "hours": number or null, "reason": "string describing why if impractical, or empty" },
  "train": { "practical": boolean, "hours": number or null, "reason": "string describing why if impractical, or empty" },
  "car": { "practical": boolean, "hours": number or null, "reason": "string describing why if impractical, or empty" },
  "flight": { "practical": boolean, "hours": number or null, "reason": "string describing why if impractical, or empty" }
}

Rules:
1. "practical" must be false if the mode of transport is impossible (e.g., crossing an ocean/sea without a bridge/tunnel/ferry) or extremely impractical/unreasonable (e.g. driving/bus/train taking more than 36 hours for a vacation trip).
2. If "practical" is false, "hours" should be null, and "reason" must explain why (e.g., "Impractical: requires crossing oceans" or "Impractical: driving time exceeds 36 hours").
3. If "practical" is true, "hours" must be a realistic estimate of the one-way travel time in hours (can be a decimal, like 6.5, representing average actual travel duration), and "reason" should be empty.
4. "flight" can be impractical if there are no airports or if the distance is extremely short.
5. Be realistic and accurate based on real-world geography.`

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      let text = result.response.text()
      text = text.replace(/```json|```/g, '').trim()
      const start = text.indexOf('{')
      const end = text.lastIndexOf('}')
      if (start === -1 || end === -1) throw new Error('No JSON object found')
      const parsed = JSON.parse(text.slice(start, end + 1))
      
      const modes = ['bus', 'train', 'car', 'flight']
      const verified = {}
      for (const m of modes) {
        if (parsed[m] && typeof parsed[m].practical === 'boolean') {
          verified[m] = {
            practical: parsed[m].practical,
            hours: typeof parsed[m].hours === 'number' ? parsed[m].hours : null,
            reason: typeof parsed[m].reason === 'string' ? parsed[m].reason : ''
          }
        } else {
          verified[m] = { practical: false, hours: null, reason: 'Evaluation failed' }
        }
      }
      return verified
    } catch (err) {
      console.warn(`Failed to estimate transport with ${modelName}:`, err.message)
    }
  }
  
  return {
    bus: { practical: false, hours: null, reason: 'Failed to estimate' },
    train: { practical: false, hours: null, reason: 'Failed to estimate' },
    car: { practical: false, hours: null, reason: 'Failed to estimate' },
    flight: { practical: true, hours: 2.0, reason: '' }
  }
}

module.exports = { generateItinerary, generateDailySummaries, estimateTransportOptions }

