import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripsAPI } from '../api'
import { useToast } from '../context/ToastContext'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'
import {
  Plus, MapPin, Calendar, Users, Compass, ArrowRight,
  Bus, Train, Car, Plane, Clock, Trash2
} from 'lucide-react'

const TRANSPORT_OPTIONS = [
  { value: 'bus', label: '🚌 Bus', icon: Bus },
  { value: 'train', label: '🚆 Train', icon: Train },
  { value: 'car', label: '🚗 Car', icon: Car },
  { value: 'flight', label: '✈️ Flight', icon: Plane },
]

const TRENDING_DESTINATIONS = [
  { dest: 'Bali, Indonesia', title: 'Tropical Paradise Retreat', days: '7 Days', activities: 12, bg: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80) center/cover no-repeat' },
  { dest: 'Tokyo, Japan', title: 'City Lights & Culture', days: '10 Days', activities: 24, bg: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80) center/cover no-repeat' },
  { dest: 'Swiss Alps', title: 'Skiing & Mountains', days: '5 Days', activities: 8, bg: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80) center/cover no-repeat' },
  { dest: 'Paris, France', title: 'Romantic Getaway', days: '4 Days', activities: 10, bg: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80) center/cover no-repeat' },
  { dest: 'New York, USA', title: 'The Big Apple Experience', days: '5 Days', activities: 15, bg: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80) center/cover no-repeat' },
  { dest: 'Rome, Italy', title: 'Historical Journey', days: '6 Days', activities: 14, bg: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80) center/cover no-repeat' }
]

const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [joining, setJoining] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [errors, setErrors] = useState({})
  const [showAllTrending, setShowAllTrending] = useState(false)
  const [tripToDelete, setTripToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState({
    name: '', destination: '', startDate: '', endDate: '',
    travelers: '', originCity: '', transportMode: '', estimatedTravelHours: ''
  })

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const res = await tripsAPI.list()
      setTrips(res.data.trips)
    } catch (err) {
      addToast('Failed to load trips', 'error')
    } finally {
      setLoading(false)
    }
  }

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Trip name is required'
    if (!form.destination.trim()) errs.destination = 'Destination is required'
    if (!form.startDate) errs.startDate = 'Start date is required'
    if (!form.endDate) errs.endDate = 'End date is required'
    if (!form.travelers || parseInt(form.travelers) < 1) errs.travelers = 'Number of travelers is required'
    if (!form.originCity.trim()) errs.originCity = 'Starting city is required'
    if (!form.transportMode) errs.transportMode = 'Transport mode is required'
    if (!form.estimatedTravelHours || parseFloat(form.estimatedTravelHours) <= 0) {
      errs.estimatedTravelHours = 'Travel time is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleCreate = async () => {
    if (!validateForm()) return
    setCreating(true)
    try {
      const res = await tripsAPI.create(form)
      addToast('Trip created! 🗺️', 'success')
      setShowModal(false)
      navigate(`/trips/${res.data.trip.id}`)
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create trip'
      addToast(msg, 'error')
    } finally {
      setCreating(false)
    }
  }

  const handleJoinByCode = async () => {
    if (!joinCode.trim()) {
      addToast('Please enter a trip code', 'error')
      return
    }
    setJoining(true)
    try {
      const res = await tripsAPI.joinByCode(joinCode.trim())
      addToast('Successfully joined trip! 🗺️', 'success')
      navigate(`/trips/${res.data.trip.id}`)
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to join trip'
      addToast(msg, 'error')
    } finally {
      setJoining(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', destination: '', startDate: '', endDate: '', travelers: '', originCity: '', transportMode: '', estimatedTravelHours: '' })
    setErrors({})
  }

  const confirmDeleteTrip = async () => {
    if (!tripToDelete) return;
    setDeleting(true);
    try {
      await tripsAPI.delete(tripToDelete);
      addToast('Trip deleted successfully', 'success');
      setTrips(trips.filter(t => t.id !== tripToDelete));
      setTripToDelete(null);
    } catch (err) {
      addToast('Failed to delete trip', 'error');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' }}>My Trips</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              {trips.length} trip{trips.length !== 1 ? 's' : ''} planned
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="input"
                placeholder="Enter Trip Code"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                style={{ width: '160px', padding: '8px 12px' }}
                maxLength={6}
              />
              <button
                className="btn btn-secondary"
                onClick={handleJoinByCode}
                disabled={joining || !joinCode.trim()}
              >
                {joining ? <LoadingSpinner /> : 'Join'}
              </button>
            </div>
            <button
              id="new-trip-btn"
              className="btn btn-primary"
              onClick={() => { resetForm(); setShowModal(true) }}
            >
              <Plus size={16} /> New Trip
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-overlay">
            <div className="spinner spinner-orange" style={{ width: 32, height: 32 }} />
            <span>Loading your trips...</span>
          </div>
        ) : trips.length === 0 ? (
          <div className="empty-state" style={{ padding: '64px 24px', textAlign: 'center', background: 'var(--color-bg-secondary)', borderRadius: '16px', border: '1px dashed var(--color-border)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={40} />
              </div>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Your journey starts here</h2>
            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto 24px' }}>
              You don't have any trips planned yet. Create your first itinerary or join an existing one using a trip code.
            </p>
            <button
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '16px' }}
              onClick={() => { resetForm(); setShowModal(true) }}
            >
              <Plus size={20} style={{ marginRight: '8px' }} /> Plan your first trip
            </button>
          </div>
        ) : (
          <div className="trips-grid">
            {trips.map(trip => (
              <div key={trip.id} className="card trip-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="trip-card-dest">{trip.destination}</div>
                    <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 2, fontWeight: 500 }}>{trip.name}</div>
                  </div>
                  <button 
                    className="btn btn-ghost" 
                    style={{ padding: '4px', height: 'auto', minWidth: 'auto', color: 'var(--color-text-tertiary)' }}
                    onClick={(e) => { e.stopPropagation(); setTripToDelete(trip.id); }}
                    title="Delete Trip"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="trip-card-dates">
                  <Calendar size={13} />
                  {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                </div>

                <div className="trip-card-meta">
                  <div className="trip-card-stat">
                    <Users size={13} />
                    {trip.collaboratorCount} collaborator{trip.collaboratorCount !== 1 ? 's' : ''}
                  </div>
                  <div className="trip-card-stat">
                    <MapPin size={13} />
                    {trip.activityCount} activities
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                >
                  View Trip <ArrowRight size={14} />
                </button>
              </div>
            ))}
            <div 
              className="card trip-card" 
              onClick={() => { resetForm(); setShowModal(true) }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-border)', background: 'transparent', cursor: 'pointer', minHeight: '200px', gap: '16px', boxShadow: 'none' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.background = 'var(--color-primary-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-secondary)', color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <Plus size={24} />
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '16px' }}>Plan a new trip</div>
            </div>
          </div>
        )}

        {/* Trending Destinations Section */}
        <div style={{ marginTop: trips.length === 0 ? '0px' : '48px', paddingBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>Trending Destinations</h2>
            <span 
              style={{ fontSize: 14, color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setShowAllTrending(!showAllTrending)}
            >
              {showAllTrending ? 'Show less' : 'View all'}
            </span>
          </div>
          <div className="trips-grid">
            {(showAllTrending ? TRENDING_DESTINATIONS : TRENDING_DESTINATIONS.slice(0, 3)).map((trend, i) => (
              <div key={i} className="card trip-card" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                <div style={{ height: '120px', background: trend.bg, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ background: 'rgba(255,255,255,0.9)', width: 'fit-content', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#333' }}>
                    Trending
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '20px', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {trend.dest}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', fontWeight: 500, marginBottom: '12px' }}>{trend.title}</div>
                  <div className="trip-card-meta" style={{ marginBottom: '16px' }}>
                    <div className="trip-card-stat">
                      <Clock size={13} /> {trend.days}
                    </div>
                    <div className="trip-card-stat">
                      <MapPin size={13} /> {trend.activities} activities
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', background: 'var(--color-bg-secondary)' }}
                    onClick={() => {
                      resetForm()
                      set('destination', trend.dest)
                      set('name', trend.title)
                      setShowModal(true)
                    }}
                  >
                    Use as Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Trip Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Plan a New Trip"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button
              id="create-trip-submit"
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={creating}
            >
              {creating ? <LoadingSpinner /> : 'Create Trip'}
            </button>
          </>
        }
      >
        <div className="modal-body">
          <div className="input-group">
            <label className="input-label">Trip name</label>
            <input
              id="trip-name"
              className={`input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Manali Winter Escape"
              value={form.name}
              onChange={e => set('name', e.target.value)}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Destination</label>
            <input
              id="trip-destination"
              className={`input ${errors.destination ? 'input-error' : ''}`}
              placeholder="e.g. Manali, Himachal Pradesh"
              value={form.destination}
              onChange={e => set('destination', e.target.value)}
            />
            {errors.destination && <span className="field-error">{errors.destination}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="input-group">
              <label className="input-label">Start date</label>
              <input
                id="trip-start"
                type="date"
                className={`input ${errors.startDate ? 'input-error' : ''}`}
                value={form.startDate}
                onChange={e => set('startDate', e.target.value)}
              />
              {errors.startDate && <span className="field-error">{errors.startDate}</span>}
            </div>
            <div className="input-group">
              <label className="input-label">End date</label>
              <input
                id="trip-end"
                type="date"
                className={`input ${errors.endDate ? 'input-error' : ''}`}
                value={form.endDate}
                onChange={e => set('endDate', e.target.value)}
              />
              {errors.endDate && <span className="field-error">{errors.endDate}</span>}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Number of travelers</label>
            <input
              id="trip-travelers"
              type="number"
              min="1"
              className={`input ${errors.travelers ? 'input-error' : ''}`}
              placeholder="2"
              value={form.travelers}
              onChange={e => set('travelers', e.target.value)}
            />
            {errors.travelers && <span className="field-error">{errors.travelers}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Your starting city</label>
            <input
              id="trip-origin"
              className={`input ${errors.originCity ? 'input-error' : ''}`}
              placeholder="e.g. Delhi"
              value={form.originCity}
              onChange={e => set('originCity', e.target.value)}
            />
            {errors.originCity && <span className="field-error">{errors.originCity}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Mode of transport</label>
            <div className="option-group">
              {TRANSPORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`option-btn ${form.transportMode === opt.value ? 'selected' : ''}`}
                  onClick={() => set('transportMode', opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.transportMode && <span className="field-error">{errors.transportMode}</span>}
          </div>

          {form.transportMode && (
            <div className="input-group">
              <label className="input-label">
                <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                Approx. travel time to destination (hours)
              </label>
              <input
                id="trip-travel-hours"
                type="number"
                min="0.5"
                step="0.5"
                className={`input ${errors.estimatedTravelHours ? 'input-error' : ''}`}
                placeholder="e.g. 6.5"
                value={form.estimatedTravelHours}
                onChange={e => set('estimatedTravelHours', e.target.value)}
              />
              {errors.estimatedTravelHours && <span className="field-error">{errors.estimatedTravelHours}</span>}
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Trip Confirmation Modal */}
      <Modal
        isOpen={!!tripToDelete}
        onClose={() => !deleting && setTripToDelete(null)}
        title="Delete Trip"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setTripToDelete(null)} disabled={deleting}>Cancel</button>
            <button
              className="btn btn-primary"
              onClick={confirmDeleteTrip}
              disabled={deleting}
            >
              {deleting ? <LoadingSpinner /> : 'Delete'}
            </button>
          </>
        }
      >
        <div className="modal-body">
          <p>Are you sure you want to delete this trip? This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard
