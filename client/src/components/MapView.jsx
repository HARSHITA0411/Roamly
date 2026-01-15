import React, { useEffect, useRef, useState, useCallback } from 'react'
import { itineraryAPI } from '../api'

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const CATEGORY_COLORS = {
  outdoor: '#22C55E',
  food: '#F59E0B',
  transport: '#3B82F6',
  culture: '#8B5CF6',
  accommodation: '#EC4899',
  default: '#FF6B2C'
}

/* ─── Load the Google Maps JS API ──────────────────────────────── */
const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps)
      return
    }

    const existingScript = document.querySelector('script[data-maps]')
    if (existingScript) {
      // Script already loading, wait for it
      const check = () => {
        if (window.google && window.google.maps) resolve(window.google.maps)
        else setTimeout(check, 100)
      }
      check()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    script.dataset.maps = 'true'
    script.onload = () => {
      const check = () => {
        if (window.google && window.google.maps) resolve(window.google.maps)
        else setTimeout(check, 100)
      }
      check()
    }
    script.onerror = () => reject(new Error('Failed to load Google Maps'))
    document.head.appendChild(script)
  })
}

/* ─── Client-side geocoding using the JS API Geocoder ──────────── */
const geocodeAddress = (geocoder, address) => {
  return new Promise((resolve) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const loc = results[0].geometry.location
        resolve({ lat: loc.lat(), lng: loc.lng() })
      } else {
        console.warn(`Geocode failed for "${address}": ${status}`)
        resolve(null)
      }
    })
  })
}

/* ─── MapView Component ────────────────────────────────────────── */
const MapView = ({ items, tripId, onItemsUpdated }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const polylineRef = useRef(null)
  const [geocoding, setGeocoding] = useState(false)
  const [geocodeProgress, setGeocodeProgress] = useState('')
  const [mapsLoaded, setMapsLoaded] = useState(
    !!(window.google && window.google.maps)
  )

  const itemsWithCoords = items
    .filter(i => i.lat != null && i.lng != null)
    .sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day
      return a.position - b.position
    })

  /* ── Client-side geocoding: uses the JS API Geocoder which works
       with referer-restricted API keys (unlike the REST endpoint) ── */
  const handleFixLocations = useCallback(async () => {
    if (!tripId) return
    setGeocoding(true)
    setGeocodeProgress('Loading Google Maps...')

    try {
      const maps = await loadGoogleMaps()
      const geocoder = new maps.Geocoder()

      const itemsToFix = items.filter(i => i.lat == null || i.lng == null)
      let updated = 0

      for (let idx = 0; idx < itemsToFix.length; idx++) {
        const item = itemsToFix[idx]
        setGeocodeProgress(`Geocoding ${idx + 1}/${itemsToFix.length}: ${item.activity}`)

        const coords = await geocodeAddress(geocoder, item.location)
        if (coords) {
          try {
            // Save to database via the existing update endpoint
            await itineraryAPI.update(tripId, item.id, {
              location: item.location,
              lat: coords.lat,
              lng: coords.lng
            })
            updated++
          } catch (err) {
            console.warn(`Failed to save coords for "${item.activity}":`, err.message)
          }
        }

        // Small delay to avoid hitting rate limits
        if (idx < itemsToFix.length - 1) {
          await new Promise(r => setTimeout(r, 200))
        }
      }

      setGeocodeProgress(`Done! Updated ${updated} of ${itemsToFix.length} locations.`)

      // Refetch all items from the server to get the updated coordinates
      try {
        const res = await import('../api').then(m => m.tripsAPI.get(tripId))
        if (res.data.trip?.items && onItemsUpdated) {
          onItemsUpdated(res.data.trip.items)
        }
      } catch (err) {
        console.warn('Failed to refetch items:', err)
      }
    } catch (err) {
      console.error('Fix locations failed:', err)
      setGeocodeProgress('Failed: ' + err.message)
    } finally {
      setGeocoding(false)
    }
  }, [items, tripId, onItemsUpdated])

  /* ── Load Google Maps script ── */
  useEffect(() => {
    if (!MAPS_KEY || MAPS_KEY === 'your_google_maps_api_key_here') return
    if (mapsLoaded) return

    loadGoogleMaps()
      .then(() => setMapsLoaded(true))
      .catch(err => console.error('Maps load error:', err))
  }, [])

  /* ── Render the map when items change ── */
  useEffect(() => {
    if (!mapsLoaded || !mapRef.current || itemsWithCoords.length === 0) return

    const center = { lat: itemsWithCoords[0].lat, lng: itemsWithCoords[0].lng }

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center,
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
      ],
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    })

    mapInstanceRef.current = map

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []
    if (polylineRef.current) polylineRef.current.setMap(null)

    const bounds = new window.google.maps.LatLngBounds()

    // Create numbered markers
    itemsWithCoords.forEach((item, idx) => {
      const position = { lat: item.lat, lng: item.lng }
      bounds.extend(position)

      const marker = new window.google.maps.Marker({
        position,
        map,
        label: {
          text: String(idx + 1),
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '12px'
        },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: CATEGORY_COLORS[item.category] || '#FF6B2C',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
          scale: 16,
        },
        title: item.activity
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: 'DM Sans', sans-serif; padding: 4px 2px; min-width: 160px;">
            <div style="font-weight: 700; font-size: 14px; color: #1A1A1A; margin-bottom: 4px;">${item.activity}</div>
            <div style="font-size: 12px; color: #FF6B2C; font-weight: 600;">${item.time} · Day ${item.day}</div>
            <div style="font-size: 12px; color: #666; margin-top: 4px;">${item.location}</div>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      markersRef.current.push(marker)
    })

    // Polyline connecting all markers
    const path = itemsWithCoords.map(i => ({ lat: i.lat, lng: i.lng }))
    polylineRef.current = new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF6B2C',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      map
    })

    map.fitBounds(bounds)
  }, [items, mapsLoaded])

  /* ── Render states ── */

  if (!MAPS_KEY || MAPS_KEY === 'your_google_maps_api_key_here') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', minHeight: 400, flexDirection: 'column', gap: 12,
        color: 'var(--color-text-secondary)', fontSize: 14, background: 'var(--color-surface)',
        borderRadius: 12
      }}>
        <span style={{ fontSize: 32 }}>🗺️</span>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Google Maps not configured</div>
        <div>Add VITE_GOOGLE_MAPS_API_KEY to client/.env to enable the map</div>
      </div>
    )
  }

  // Items exist but none have coordinates — offer to fix via client-side geocoding
  if (itemsWithCoords.length === 0 && items.length > 0) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', minHeight: 400, flexDirection: 'column', gap: 16,
        color: 'var(--color-text-secondary)', fontSize: 14, background: 'var(--color-surface)',
        borderRadius: 12
      }}>
        <span style={{ fontSize: 32 }}>📍</span>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 16 }}>
          {items.length} activities found, but no map coordinates
        </div>
        <div style={{ textAlign: 'center', maxWidth: 380, lineHeight: 1.5 }}>
          Your itinerary was created before the Google Maps API was configured.
          Click below to fetch coordinates for all locations.
        </div>
        <button
          className="btn btn-primary"
          onClick={handleFixLocations}
          disabled={geocoding}
          style={{ marginTop: 4, minWidth: 200 }}
        >
          {geocoding ? (
            <>
              <div className="spinner" style={{ width: 15, height: 15 }} />
              Fixing...
            </>
          ) : (
            '📍 Fix Map Locations'
          )}
        </button>
        {geocodeProgress && (
          <div style={{
            fontSize: 12, color: 'var(--color-text-secondary)',
            textAlign: 'center', maxWidth: 340, marginTop: 4
          }}>
            {geocodeProgress}
          </div>
        )}
      </div>
    )
  }

  if (itemsWithCoords.length === 0) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', minHeight: 400, flexDirection: 'column', gap: 12,
        color: 'var(--color-text-secondary)', fontSize: 14, background: 'var(--color-surface)',
        borderRadius: 12
      }}>
        <span style={{ fontSize: 32 }}>📍</span>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>No locations to map yet</div>
        <div>Generate an itinerary to see locations on the map</div>
      </div>
    )
  }

  return <div ref={mapRef} className="map-container" />
}

export default MapView
