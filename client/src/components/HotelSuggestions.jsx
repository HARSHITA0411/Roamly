import React, { useState } from 'react'
import { hotelsAPI } from '../api'
import { useToast } from '../context/ToastContext'
import { MapPin, Star, BedDouble, RefreshCw, Check, ExternalLink } from 'lucide-react'

const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

const HotelCard = ({ hotel, onSelect, isUpdating }) => {
  const selected = hotel.saved

  return (
    <div
      className="hotel-card"
      style={{
        borderTop: selected ? '3px solid #22C55E' : '3px solid transparent'
      }}
    >
      {/* Photo */}
      <div className="hotel-card-photo">
        {hotel.photoUrl ? (
          <img src={hotel.photoUrl} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="hotel-card-photo-placeholder">
            <BedDouble size={28} style={{ color: '#BBBBBB' }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="hotel-card-body">
        <div className="hotel-card-name">{hotel.name}</div>

        <div className="hotel-card-address">
          <MapPin size={11} style={{ flexShrink: 0 }} />
          {hotel.address}
        </div>

        <div className="hotel-card-meta">
          {hotel.rating && (
            <span className="hotel-rating">
              <Star size={11} fill="#FF6B2C" color="#FF6B2C" />
              {hotel.rating}
            </span>
          )}
          {hotel.priceRange && (
            <span className="hotel-price">{hotel.priceRange}</span>
          )}
        </div>

        {hotel.mapsUrl && (
          <a
            href={hotel.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hotel-maps-link"
          >
            <ExternalLink size={10} /> View on Maps
          </a>
        )}

        <button
          className={`btn btn-sm hotel-select-btn ${selected ? 'hotel-select-btn--selected' : 'btn-primary'}`}
          onClick={() => onSelect(hotel.id)}
          disabled={isUpdating}
        >
          {selected ? (
            <><Check size={13} /> Selected</>
          ) : 'Select'}
        </button>
      </div>
    </div>
  )
}

const HotelSuggestions = ({ tripId, items, socket }) => {
  const { addToast } = useToast()
  const [hotels, setHotels] = useState([]) // flat list
  const [byZone, setByZone] = useState({})  // grouped
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [hasSuggested, setHasSuggested] = useState(false)

  const hasItems = items && items.length > 0

  const handleSuggest = async () => {
    setLoading(true)
    try {
      const res = await hotelsAPI.suggest(tripId)
      setHotels(res.data.hotels)
      setByZone(res.data.byZone)
      setHasSuggested(true)
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to fetch hotel suggestions', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async (hotelId) => {
    setUpdatingId(hotelId)
    const hotel = hotels.find(h => h.id === hotelId)

    // Optimistic update: select this one, deselect others in same zone
    setHotels(prev => prev.map(h => {
      if (h.zone === hotel?.zone) return { ...h, saved: h.id === hotelId }
      return h
    }))
    // Rebuild byZone
    setByZone(prev => {
      const updated = { ...prev }
      if (hotel?.zone && updated[hotel.zone]) {
        updated[hotel.zone] = updated[hotel.zone].map(h => ({
          ...h, saved: h.id === hotelId
        }))
      }
      return updated
    })

    try {
      await hotelsAPI.select(tripId, hotelId)
      addToast('Hotel saved to your trip 🏨', 'success')
    } catch (err) {
      addToast('Failed to select hotel', 'error')
      // Revert on error
      setHotels(prev => prev.map(h => ({ ...h, saved: false })))
    } finally {
      setUpdatingId(null)
    }
  }

  // Listen for hotel_selected from other collaborators
  React.useEffect(() => {
    if (!socket) return
    const handleHotelSelected = ({ hotelId, zone }) => {
      setHotels(prev => prev.map(h => {
        if (h.zone === zone) return { ...h, saved: h.id === hotelId }
        return h
      }))
      setByZone(prev => {
        const updated = { ...prev }
        if (updated[zone]) {
          updated[zone] = updated[zone].map(h => ({ ...h, saved: h.id === hotelId }))
        }
        return updated
      })
    }
    socket.on('hotel_selected', handleHotelSelected)
    return () => socket.off('hotel_selected', handleHotelSelected)
  }, [socket])

  if (!hasItems) return null

  const zoneNames = Object.keys(byZone)

  return (
    <div className="hotel-suggestions">
      <div className="hotel-suggestions-header">
        <div className="hotel-suggestions-title">
          <BedDouble size={16} />
          <span>Hotel Suggestions</span>
        </div>
        <button
          className={`btn ${hasSuggested ? 'btn-ghost btn-sm' : 'btn-primary'}`}
          onClick={handleSuggest}
          disabled={loading}
        >
          {loading ? (
            <><div className="spinner" style={{ width: 14, height: 14 }} /> Finding hotels...</>
          ) : hasSuggested ? (
            <><RefreshCw size={13} /> Re-suggest Hotels</>
          ) : (
            <><BedDouble size={14} /> Suggest Hotels</>
          )}
        </button>
      </div>

      {hasSuggested && zoneNames.length === 0 && !loading && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, margin: '12px 0' }}>
          No hotel suggestions found. Try re-suggesting.
        </p>
      )}

      {zoneNames.map(zone => {
        const zoneHotels = byZone[zone]
        const first = zoneHotels?.[0]
        return (
          <div key={zone} className="hotel-zone">
            <div className="hotel-zone-header">
              <div className="hotel-zone-name">{zone}</div>
              {first && (
                <div className="hotel-zone-dates">
                  Check in Day {first.checkinDay} ({formatDate(first.checkinDate)}) →
                  Check out Day {first.checkoutDay} ({formatDate(first.checkoutDate)})
                </div>
              )}
            </div>
            <div className="hotel-cards-row">
              {zoneHotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onSelect={handleSelect}
                  isUpdating={updatingId === hotel.id}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HotelSuggestions
