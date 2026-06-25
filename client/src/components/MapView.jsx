import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
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

const DAY_COLORS = [
  '#FF6B2C', '#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B',
  '#EC4899', '#06B6D4', '#EF4444', '#14B8A6', '#A855F7'
]

/* ─── Load the Google Maps JS API ──────────────────────────────── */
const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    // If the Maps library (with Map constructor) is already fully loaded
    if (window.google && window.google.maps && window.google.maps.Map) {
      resolve(window.google.maps)
      return
    }

    const waitForMapsReady = () => {
      // With loading=async, we need to use importLibrary to ensure
      // core modules (Map, etc.) are actually loaded
      if (window.google && window.google.maps && window.google.maps.importLibrary) {
        Promise.all([
          window.google.maps.importLibrary('maps'),
          window.google.maps.importLibrary('marker'),
          window.google.maps.importLibrary('places')
        ]).then(() => resolve(window.google.maps))
          .catch(reject)
      } else if (window.google && window.google.maps && window.google.maps.Map) {
        resolve(window.google.maps)
      } else {
        setTimeout(waitForMapsReady, 100)
      }
    }

    const existingScript = document.querySelector('script[data-maps]')
    if (existingScript) {
      waitForMapsReady()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    script.dataset.maps = 'true'
    script.onload = () => waitForMapsReady()
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

/* ─── Format travel time nicely ── */
const formatTravelTime = (minutes) => {
  if (!minutes && minutes !== 0) return null
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

/* ─── MapView Component ────────────────────────────────────────── */
const MapView = ({ items, tripId, onItemsUpdated }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const polylinesRef = useRef([])
  const infoWindowsRef = useRef([])
  const travelTooltipRef = useRef(null)
  const [geocoding, setGeocoding] = useState(false)
  const [geocodeProgress, setGeocodeProgress] = useState('')
  const [selectedDay, setSelectedDay] = useState('all')
  const [calcingTravelTimes, setCalcingTravelTimes] = useState(false)
  const [mapsLoaded, setMapsLoaded] = useState(
    !!(window.google && window.google.maps && window.google.maps.Map)
  )

  const itemsWithCoords = useMemo(() =>
    items
      .filter(i => i.lat != null && i.lng != null)
      .sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day
        return a.position - b.position
      }),
    [items]
  )

  // Get unique sorted days
  const availableDays = useMemo(() => {
    const days = [...new Set(itemsWithCoords.map(i => i.day))].sort((a, b) => a - b)
    return days
  }, [itemsWithCoords])

  // Filter items by selected day
  const filteredItems = useMemo(() => {
    if (selectedDay === 'all') return itemsWithCoords
    return itemsWithCoords.filter(i => i.day === selectedDay)
  }, [itemsWithCoords, selectedDay])

  // Check if any items are missing travel times
  const hasTravelTimes = useMemo(() => {
    // Check items that should have travel time (not the first item of each day)
    const byDay = {}
    for (const item of itemsWithCoords) {
      if (!byDay[item.day]) byDay[item.day] = []
      byDay[item.day].push(item)
    }
    for (const dayItems of Object.values(byDay)) {
      for (let i = 1; i < dayItems.length; i++) {
        if (dayItems[i].travelTimeFromPrevious != null) return true
      }
    }
    return false
  }, [itemsWithCoords])

  // Handle recalculating travel times
  const handleCalcTravelTimes = useCallback(async () => {
    if (!tripId || calcingTravelTimes) return
    setCalcingTravelTimes(true)
    try {
      const res = await itineraryAPI.recalcTravelTimes(tripId)
      if (res.data.items && onItemsUpdated) {
        onItemsUpdated(res.data.items)
      }
    } catch (err) {
      console.error('Failed to calculate travel times:', err)
    } finally {
      setCalcingTravelTimes(false)
    }
  }, [tripId, calcingTravelTimes, onItemsUpdated])

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

  // Auto-select first day when items load
  useEffect(() => {
    if (availableDays.length > 0 && selectedDay === 'all') {
      setSelectedDay(availableDays[0])
    }
  }, [availableDays])

  /* ── Clean up map objects ── */
  const clearMapObjects = useCallback(() => {
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []
    polylinesRef.current.forEach(p => p.setMap(null))
    polylinesRef.current = []
    infoWindowsRef.current.forEach(iw => iw.close())
    infoWindowsRef.current = []
    if (travelTooltipRef.current) {
      travelTooltipRef.current.close()
      travelTooltipRef.current = null
    }
  }, [])

  /* ── Render the map when items or selectedDay change ── */
  useEffect(() => {
    if (!mapsLoaded || !mapRef.current || filteredItems.length === 0) return

    const center = { lat: filteredItems[0].lat, lng: filteredItems[0].lng }

    // Create map only once, then reuse
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center,
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
        ],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      })
    }

    const map = mapInstanceRef.current

    // Clear old markers and polylines
    clearMapObjects()

    const bounds = new window.google.maps.LatLngBounds()
    const dayColor = selectedDay === 'all'
      ? '#FF6B2C'
      : DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length]

    // Create numbered markers
    filteredItems.forEach((item, idx) => {
      const position = { lat: item.lat, lng: item.lng }
      bounds.extend(position)

      const markerColor = CATEGORY_COLORS[item.category] || dayColor

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
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
          scale: 16,
        },
        title: item.activity,
        zIndex: 100 + idx
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: 'DM Sans', sans-serif; padding: 6px 2px; min-width: 180px;">
            <div style="font-weight: 700; font-size: 14px; color: #1A1A1A; margin-bottom: 4px;">${item.activity}</div>
            <div style="font-size: 12px; color: ${dayColor}; font-weight: 600;">${item.time} · Day ${item.day}</div>
            <div style="font-size: 12px; color: #666; margin-top: 4px;">📍 ${item.location}</div>
            ${item.durationMinutes ? `<div style="font-size: 11px; color: #888; margin-top: 2px;">⏱️ ${item.durationMinutes} min</div>` : ''}
          </div>
        `
      })

      marker.addListener('click', () => {
        // Close all other info windows
        infoWindowsRef.current.forEach(iw => iw.close())
        infoWindow.open(map, marker)
      })

      markersRef.current.push(marker)
      infoWindowsRef.current.push(infoWindow)
    })

    // Create individual polyline segments between consecutive markers
    // so each segment can have its own hover tooltip
    for (let i = 0; i < filteredItems.length - 1; i++) {
      const from = filteredItems[i]
      const to = filteredItems[i + 1]

      const segmentPath = [
        { lat: from.lat, lng: from.lng },
        { lat: to.lat, lng: to.lng }
      ]

      const polyline = new window.google.maps.Polyline({
        path: segmentPath,
        geodesic: true,
        strokeColor: dayColor,
        strokeOpacity: 0.7,
        strokeWeight: 3,
        map,
        zIndex: 50
      })

      // Travel time tooltip on hover
      const travelTime = to.travelTimeFromPrevious
      const travelStr = formatTravelTime(travelTime)

      // Create a thicker invisible polyline for easier hover detection
      const hoverPolyline = new window.google.maps.Polyline({
        path: segmentPath,
        geodesic: true,
        strokeColor: dayColor,
        strokeOpacity: 0,
        strokeWeight: 20,
        map,
        zIndex: 51
      })

      const handleMouseOver = (e) => {
        // Highlight the segment
        polyline.setOptions({ strokeOpacity: 1, strokeWeight: 5 })

        // Show travel time tooltip
        if (travelTooltipRef.current) {
          travelTooltipRef.current.close()
        }

        const tooltipContent = travelStr
          ? `<div style="font-family: 'DM Sans', sans-serif; padding: 8px 12px; white-space: nowrap;">
              <div style="font-size: 11px; color: #888; margin-bottom: 2px;">${from.activity} → ${to.activity}</div>
              <div style="font-weight: 700; font-size: 14px; color: ${dayColor};">🚗 ${travelStr}</div>
            </div>`
          : `<div style="font-family: 'DM Sans', sans-serif; padding: 8px 12px; white-space: nowrap;">
              <div style="font-size: 11px; color: #888; margin-bottom: 2px;">${from.activity} → ${to.activity}</div>
              <div style="font-size: 12px; color: #aaa;">Travel time not available</div>
            </div>`

        const tooltip = new window.google.maps.InfoWindow({
          content: tooltipContent,
          position: e.latLng,
          disableAutoPan: true
        })
        tooltip.open(map)
        travelTooltipRef.current = tooltip
      }

      const handleMouseOut = () => {
        polyline.setOptions({ strokeOpacity: 0.7, strokeWeight: 3 })
        if (travelTooltipRef.current) {
          travelTooltipRef.current.close()
          travelTooltipRef.current = null
        }
      }

      hoverPolyline.addListener('mouseover', handleMouseOver)
      hoverPolyline.addListener('mouseout', handleMouseOut)
      polyline.addListener('mouseover', handleMouseOver)
      polyline.addListener('mouseout', handleMouseOut)

      polylinesRef.current.push(polyline)
      polylinesRef.current.push(hoverPolyline)
    }

    map.fitBounds(bounds)

    // If only one marker, zoom to a reasonable level
    if (filteredItems.length === 1) {
      map.setZoom(14)
    }
  }, [filteredItems, mapsLoaded, selectedDay, clearMapObjects])

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

  return (
    <div className="map-view-wrapper">
      {/* Day toggle bar */}
      <div className="map-day-toggle">
        <button
          className={`map-day-btn ${selectedDay === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDay('all')}
          style={selectedDay === 'all' ? { '--day-color': '#FF6B2C' } : {}}
        >
          All Days
        </button>
        {availableDays.map(day => {
          const dayColor = DAY_COLORS[(day - 1) % DAY_COLORS.length]
          const count = itemsWithCoords.filter(i => i.day === day).length
          return (
            <button
              key={day}
              className={`map-day-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
              style={{ '--day-color': dayColor }}
            >
              <span className="map-day-btn-label">Day {day}</span>
              <span className="map-day-btn-count">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Map */}
      <div ref={mapRef} className="map-container" />

      {/* Legend */}
      <div className="map-legend">
        <div className="map-legend-left">
          {!hasTravelTimes && itemsWithCoords.length > 1 ? (
            <button
              className="map-calc-travel-btn"
              onClick={handleCalcTravelTimes}
              disabled={calcingTravelTimes}
            >
              {calcingTravelTimes ? (
                <>
                  <div className="spinner" style={{ width: 12, height: 12 }} />
                  Calculating...
                </>
              ) : (
                '🚗 Calculate Travel Times'
              )}
            </button>
          ) : (
            <span className="map-legend-hint">
              Hover over route lines to see travel time
            </span>
          )}
        </div>
        <span className="map-legend-count">
          {filteredItems.length} location{filteredItems.length !== 1 ? 's' : ''}
          {selectedDay !== 'all' ? ` · Day ${selectedDay}` : ''}
        </span>
      </div>
    </div>
  )
}

export default MapView
