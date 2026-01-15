import axios from 'axios'

const api = axios.create({
  // Empty baseURL = use Vite's proxy (configured in vite.config.js)
  // This forwards /api/* → http://localhost:5000/api/* automatically
  baseURL: '',
})

// Attach token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('roamly_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  me: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/update', data),
}

// Trips API
export const tripsAPI = {
  create: (data) => api.post('/api/trips', data),
  list: () => api.get('/api/trips'),
  get: (tripId) => api.get(`/api/trips/${tripId}`),
  delete: (tripId) => api.delete(`/api/trips/${tripId}`),
  join: (tripId, shareToken) => api.post(`/api/trips/${tripId}/join`, { shareToken }),
  getByShareToken: (shareToken) => api.get(`/api/trips/join/${shareToken}`),
  joinByCode: (code) => api.post('/api/trips/join-by-code', { code }),
}

// Itinerary API
export const itineraryAPI = {
  generate: (tripId, prompt) => api.post(`/api/trips/${tripId}/itinerary/generate`, { prompt }),
  summary: (tripId) => api.post(`/api/trips/${tripId}/itinerary/summary`),
  update: (tripId, itemId, data) => api.put(`/api/trips/${tripId}/itinerary/${itemId}`, data),
  delete: (tripId, itemId) => api.delete(`/api/trips/${tripId}/itinerary/${itemId}`),
  reorder: (tripId, data) => api.post(`/api/trips/${tripId}/itinerary/reorder`, data),
  add: (tripId, data) => api.post(`/api/trips/${tripId}/itinerary/add`, data),
  regeocode: (tripId) => api.post(`/api/trips/${tripId}/itinerary/regeocode`),
  regenerateDay: (tripId, data) => api.post(`/api/trips/${tripId}/itinerary/regenerate-day`, data),
  saveRegeneratedDay: (tripId, data) => api.post(`/api/trips/${tripId}/itinerary/save-day`, data),
}

// Hotels API
export const hotelsAPI = {
  suggest: (tripId) => api.post(`/api/trips/${tripId}/hotels/suggest`),
  select: (tripId, hotelId) => api.put(`/api/trips/${tripId}/hotels/${hotelId}/select`),
  list: (tripId) => api.get(`/api/trips/${tripId}/hotels`),
}

// Export API
export const exportAPI = {
  pdf: (tripId) => api.get(`/api/trips/${tripId}/export/pdf`, { responseType: 'blob' }),
  summaryPdf: (tripId) => api.get(`/api/trips/${tripId}/export/summary-pdf`, { responseType: 'blob' }),
}

export default api
