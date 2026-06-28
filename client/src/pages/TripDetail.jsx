import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripsAPI, itineraryAPI, exportAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'
import ItineraryBoard from '../components/ItineraryBoard'
import JourneyMap from '../components/JourneyMap'
import MapView from '../components/MapView'
import BudgetView from '../components/BudgetView'
import TripSummaryView from '../components/TripSummaryView'
import CollaboratorsList from '../components/CollaboratorsList'
import HotelSuggestions from '../components/HotelSuggestions'
import useSocket from '../hooks/useSocket'
import {
  Map, DollarSign, List, Sparkles, Link2, Download,
  Users, Calendar, Route, Plus, X, FileText, Compass
} from 'lucide-react'

const CATEGORIES = ['outdoor', 'food', 'transport', 'culture', 'accommodation']

const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const TripDetail = () => {
  const { tripId } = useParams()
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [trip, setTrip] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('itinerary')

  // Generate modal
  const [showGenModal, setShowGenModal] = useState(false)
  const [genPrompt, setGenPrompt] = useState('')
  const [generating, setGenerating] = useState(false)

  // Add activity
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState({
    day: 1, time: '09:00', activity: '', location: '',
    durationMinutes: 60, estimatedCost: 0, category: 'outdoor', notes: ''
  })
  const [adding, setAdding] = useState(false)

  // Export
  const [exporting, setExporting] = useState(false)

  // V2: Real-time collaboration
  const socket = useSocket(tripId)
  const [presenceUsers, setPresenceUsers] = useState([])
  const [lockedItems, setLockedItems] = useState({}) // itemId → { userName, userId }
  const [cursors, setCursors] = useState({}) // userId → { x, y, userName, color }
  const cursorTimeoutsRef = useRef({})
  const boardRef = useRef(null)
  const cursorThrottleRef = useRef(null)

  // V2: Partial day regeneration
  const [showRegenModal, setShowRegenModal] = useState(false)
  const [regenDay, setRegenDay] = useState(null)
  const [regenPrompt, setRegenPrompt] = useState('')
  const [regenerating, setRegenerating] = useState(false)
  const [previewItems, setPreviewItems] = useState([])
  const [isReviewing, setIsReviewing] = useState(false)
  const [savingRegen, setSavingRegen] = useState(false)

  useEffect(() => {
    fetchTrip()
  }, [tripId])

  // ── Socket event listeners ────────────────────────────────────────────────
  useEffect(() => {
    if (!socket) return

    // Presence update
    const handlePresenceUpdate = ({ users }) => {
      setPresenceUsers(users)
    }

    // Full state snapshot on reconnect
    const handleStateSnapshot = ({ items: snapshotItems }) => {
      setItems(snapshotItems)
    }

    // Card updated by another user
    const handleCardUpdated = ({ itemId, changes }) => {
      setItems(prev => prev.map(i =>
        i.id === itemId ? { ...i, ...changes } : i
      ))
    }

    // Card deleted by another user
    const handleCardDeleted = ({ itemId }) => {
      setItems(prev => prev.filter(i => i.id !== itemId))
    }

    // Card reordered by another user
    const handleCardReordered = ({ itemId, newPosition, newDay }) => {
      setItems(prev => prev.map(i =>
        i.id === itemId ? { ...i, position: newPosition, day: newDay } : i
      ))
    }

    // Card added by another user
    const handleCardAdded = ({ item }) => {
      setItems(prev => {
        if (prev.find(i => i.id === item.id)) return prev
        return [...prev, item]
      })
    }

    // Someone started editing a card
    const handleEditingStart = ({ itemId, userName, userId }) => {
      if (userId === user?.id) return // don't lock own card
      setLockedItems(prev => ({ ...prev, [itemId]: { userName, userId } }))
    }

    // Editing ended
    const handleEditingEnd = ({ itemId }) => {
      setLockedItems(prev => {
        const next = { ...prev }
        delete next[itemId]
        return next
      })
    }

    // Remote cursor movement
    const handleCursorMove = ({ userId, userName, x, y, color }) => {
      if (userId === user?.id) return
      setCursors(prev => ({ ...prev, [userId]: { x, y, userName, color } }))

      // Clear existing timeout for this user
      if (cursorTimeoutsRef.current[userId]) {
        clearTimeout(cursorTimeoutsRef.current[userId])
      }
      // Remove cursor after 3s of inactivity
      cursorTimeoutsRef.current[userId] = setTimeout(() => {
        setCursors(prev => {
          const next = { ...prev }
          delete next[userId]
          return next
        })
      }, 3000)
    }

    // Day regenerated by another user or this user (via socket broadcast)
    const handleDayRegenerated = ({ day, items: newItems }) => {
      setItems(prev => {
        const filtered = prev.filter(i => i.day !== day)
        return [...filtered, ...newItems].sort((a, b) => a.day - b.day || a.position - b.position)
      })
    }

    socket.on('presence_update', handlePresenceUpdate)
    socket.on('state_snapshot', handleStateSnapshot)
    socket.on('card_updated', handleCardUpdated)
    socket.on('card_deleted', handleCardDeleted)
    socket.on('card_reordered', handleCardReordered)
    socket.on('card_added', handleCardAdded)
    socket.on('editing_start', handleEditingStart)
    socket.on('editing_end', handleEditingEnd)
    socket.on('cursor_move', handleCursorMove)
    socket.on('day_regenerated', handleDayRegenerated)

    return () => {
      socket.off('presence_update', handlePresenceUpdate)
      socket.off('state_snapshot', handleStateSnapshot)
      socket.off('card_updated', handleCardUpdated)
      socket.off('card_deleted', handleCardDeleted)
      socket.off('card_reordered', handleCardReordered)
      socket.off('card_added', handleCardAdded)
      socket.off('editing_start', handleEditingStart)
      socket.off('editing_end', handleEditingEnd)
      socket.off('cursor_move', handleCursorMove)
      socket.off('day_regenerated', handleDayRegenerated)

      // Clear all cursor timeouts
      Object.values(cursorTimeoutsRef.current).forEach(clearTimeout)
    }
  }, [socket, user])

  // Mouse move handler (throttled to 50ms)
  const handleMouseMove = useCallback((e) => {
    if (!socket || !boardRef.current) return
    if (cursorThrottleRef.current) return

    cursorThrottleRef.current = setTimeout(() => {
      cursorThrottleRef.current = null
    }, 50)

    const rect = boardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    socket.emit('cursor_move', { tripId, x, y })
  }, [socket, tripId])

  const fetchTrip = async () => {
    try {
      const res = await tripsAPI.get(tripId)
      setTrip(res.data.trip)
      setItems(res.data.trip.items || [])
    } catch (err) {
      if (err.response?.status === 403) {
        addToast('You do not have access to this trip', 'error')
        navigate('/dashboard')
      } else {
        addToast('Failed to load trip', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!genPrompt.trim()) {
      addToast('Please describe your trip', 'error')
      return
    }
    setGenerating(true)
    try {
      const res = await itineraryAPI.generate(tripId, genPrompt)
      setItems(res.data.items)
      if (res.data.dailySummaries) {
        setTrip(prev => ({ ...prev, dailySummaries: res.data.dailySummaries }))
      }
      setShowGenModal(false)
      setGenPrompt('')
      addToast(`Generated ${res.data.items.length} activities! ✨`, 'success')
    } catch (err) {
      const errorData = err.response?.data
      const msg = errorData?.error || 'AI generation failed. Please try again.'
      const hint = errorData?.hint
      addToast(hint ? `${msg}\n${hint}` : msg, 'error')
    } finally {
      setGenerating(false)
    }
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/join/${trip.shareToken}`
    navigator.clipboard.writeText(url)
      .then(() => addToast('Link copied! Share it with your travel companions 🔗', 'success'))
      .catch(() => addToast('Failed to copy link', 'error'))
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const res = await exportAPI.pdf(tripId)
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = `roamly-${trip.name.replace(/\s+/g, '-').toLowerCase()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      addToast('PDF downloaded! 📄', 'success')
    } catch (err) {
      addToast('Failed to export PDF', 'error')
    } finally {
      setExporting(false)
    }
  }

  const handleAddActivity = async () => {
    if (!addForm.activity.trim() || !addForm.location.trim()) {
      addToast('Activity name and location are required', 'error')
      return
    }
    setAdding(true)
    try {
      const res = await itineraryAPI.add(tripId, addForm)
      const newItem = res.data.item
      setItems(prev => [...prev, newItem])
      // Broadcast to other collaborators
      if (socket) socket.emit('card_added', { tripId, item: newItem })
      setAddForm({ day: 1, time: '09:00', activity: '', location: '', durationMinutes: 60, estimatedCost: 0, category: 'outdoor', notes: '' })
      setShowAddForm(false)
      addToast('Activity added!', 'success')
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to add activity', 'error')
    } finally {
      setAdding(false)
    }
  }

  // V2: Partial day regeneration
  const handleOpenRegenModal = (day) => {
    setRegenDay(day)
    setRegenPrompt('')
    setPreviewItems([])
    setIsReviewing(false)
    setShowRegenModal(true)
  }

  const handleRegenerateDay = async () => {
    if (!regenPrompt.trim()) {
      addToast('Please describe what to change', 'error')
      return
    }
    setRegenerating(true)
    try {
      const res = await itineraryAPI.regenerateDay(tripId, { day: regenDay, prompt: regenPrompt, preview: true })
      setPreviewItems(res.data.items)
      setIsReviewing(true)
    } catch (err) {
      addToast(err.response?.data?.error || 'Regeneration failed. Please try again.', 'error')
    } finally {
      setRegenerating(false)
    }
  }

  const handleSaveRegeneratedDay = async () => {
    setSavingRegen(true)
    try {
      const res = await itineraryAPI.saveRegeneratedDay(tripId, { day: regenDay, items: previewItems })
      // Replace only that day's items (other collaborators see it via socket)
      setItems(prev => {
        const filtered = prev.filter(i => i.day !== regenDay)
        return [...filtered, ...res.data.items].sort((a, b) => a.day - b.day || a.position - b.position)
      })
      setShowRegenModal(false)
      setRegenPrompt('')
      setIsReviewing(false)
      setPreviewItems([])
      addToast(`Day ${regenDay} updated! ✨`, 'success')
    } catch (err) {
      addToast(err.response?.data?.error || 'Save failed. Please try again.', 'error')
    } finally {
      setSavingRegen(false)
    }
  }

  const totalCost = items.reduce((s, i) => s + i.estimatedCost, 0)
  const days = [...new Set(items.map(i => i.day))].length

  if (loading) {
    return (
      <div className="trip-detail-page">
        <Navbar />
        <div className="loading-overlay" style={{ minHeight: '60vh' }}>
          <div className="spinner spinner-orange" style={{ width: 36, height: 36 }} />
          <span>Loading your trip...</span>
        </div>
      </div>
    )
  }

  if (!trip) return null

  return (
    <div className="trip-detail-page">
      <Navbar />

      {/* Trip Header */}
      <div className="trip-header">
        <div className="trip-header-top">
          <div>
            <h1 className="trip-header-title">{trip.name}</h1>
            <div className="trip-header-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={13} /> {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Users size={13} /> {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="trip-header-meta" style={{ marginTop: 6 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Route size={13} />
                From <strong>{trip.originCity}</strong> by <strong>{trip.transportMode}</strong> — ~{trip.estimatedTravelHours}h travel
              </span>
            </div>
          </div>

          <div className="trip-header-actions" style={{ alignItems: 'center' }}>
            {trip.tripCode && (
              <div 
                style={{ 
                  background: 'var(--color-surface)', 
                  padding: '6px 12px', 
                  borderRadius: '6px', 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  border: '1px dashed var(--color-border)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  navigator.clipboard.writeText(trip.tripCode)
                  addToast('Trip Code copied! 📋', 'success')
                }}
                title="Click to copy"
              >
                Code: {trip.tripCode}
              </div>
            )}
            <CollaboratorsList 
              collaborators={trip.collaborators} 
              presenceUsers={presenceUsers} 
              currentUserId={user?.id} 
            />
            <button className="btn btn-ghost btn-sm" onClick={handleCopyLink}>
              <Link2 size={15} /> Invite
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleExportPDF} disabled={exporting}>
              {exporting ? <LoadingSpinner white={false} /> : <Download size={15} />}
              Export Detailed PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
          onClick={() => setActiveTab('itinerary')}
        >
          <List size={15} /> Itinerary
        </button>
        <button
          className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={15} /> Map
        </button>
        <button
          className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          <DollarSign size={15} /> Budget
        </button>
        <button
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <FileText size={15} /> Trip Summary
        </button>
        <button
          className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
          onClick={() => setActiveTab('journey')}
        >
          <Compass size={15} /> Journey
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'itinerary' && (
        <div className="itinerary-layout">
          <div className="itinerary-main" style={{ width: '100%' }}>
            <div className="generate-bar" style={{ display: 'flex', gap: 12 }}>
              <button
                id="generate-ai-btn"
                className="btn btn-primary"
                onClick={() => setShowGenModal(true)}
              >
                <Sparkles size={15} /> Generate with AI
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={15} /> Add Activity
              </button>
            </div>

            {/* V2: Itinerary board with cursor tracking overlay */}
            <div
              ref={boardRef}
              style={{ position: 'relative' }}
              onMouseMove={handleMouseMove}
            >
              <ItineraryBoard
                items={items}
                tripId={tripId}
                trip={trip}
                onItemsChange={setItems}
                socket={socket}
                lockedItems={lockedItems}
                onRegenerateDay={handleOpenRegenModal}
              />

              {/* V2: Remote cursors */}
              {Object.entries(cursors).map(([userId, cursor]) => (
                <div
                  key={userId}
                  style={{
                    position: 'absolute',
                    left: cursor.x,
                    top: cursor.y,
                    pointerEvents: 'none',
                    zIndex: 1000,
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.05s linear, top 0.05s linear'
                  }}
                >
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: cursor.color || '#FF6B2C',
                    border: '2px solid white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: cursor.color || '#FF6B2C',
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}>
                    {cursor.userName}
                  </div>
                </div>
              ))}
            </div>

            {/* V2: Hotel suggestions below board */}
            <HotelSuggestions tripId={tripId} items={items} socket={socket} />
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div style={{ padding: 'var(--space-3) var(--space-4)' }}>
          <MapView items={items} tripId={tripId} onItemsUpdated={setItems} />
        </div>
      )}

      {activeTab === 'budget' && (
        <BudgetView items={items} trip={trip} />
      )}

      {activeTab === 'summary' && (
        <TripSummaryView trip={trip} items={items} setTrip={setTrip} />
      )}

      {activeTab === 'journey' && (
        <div style={{ padding: 'var(--space-3) var(--space-4)' }}>
          <JourneyMap items={items} trip={trip} />
        </div>
      )}

      {/* Generate Modal */}
      <Modal
        isOpen={showGenModal}
        onClose={() => !generating && setShowGenModal(false)}
        title="Generate with AI"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowGenModal(false)} disabled={generating}>
              Cancel
            </button>
            <button
              id="run-generate-btn"
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={generating || !genPrompt.trim()}
            >
              {generating ? (
                <><LoadingSpinner /> Generating...</>
              ) : (
                <><Sparkles size={15} /> Generate Itinerary</>
              )}
            </button>
          </>
        }
      >
        <div className="generate-modal-body">
          <div className="input-group">
            <label className="input-label">Describe your trip</label>
            <textarea
              id="generate-prompt"
              className="input"
              placeholder={`e.g. 5 days in ${trip.destination}, we love hiking and local food, budget around ₹20,000 per person`}
              value={genPrompt}
              onChange={e => setGenPrompt(e.target.value)}
              rows={4}
              disabled={generating}
            />
          </div>

          {user && (
            <div className="generate-prefs">
              <strong>Your preferences:</strong> {user.travelStyle} style · {user.pace} pace · {user.budgetRange} budget
            </div>
          )}

          {generating && (
            <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--color-text-secondary)', fontSize: 13 }}>
              ✨ Gemini is crafting your personalized itinerary...
            </div>
          )}

          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
            This will replace any existing itinerary for this trip.
          </p>
        </div>
      </Modal>

      {/* V2: Day Regeneration Modal */}
      <Modal
        isOpen={showRegenModal}
        onClose={() => !regenerating && !savingRegen && setShowRegenModal(false)}
        title={isReviewing ? `Review Day ${regenDay}` : `Regenerate Day ${regenDay}`}
        footer={
          isReviewing ? (
            <>
              <button className="btn btn-ghost" onClick={() => setIsReviewing(false)} disabled={savingRegen}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveRegeneratedDay}
                disabled={savingRegen}
              >
                {savingRegen ? (
                  <><LoadingSpinner /> Saving...</>
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setShowRegenModal(false)} disabled={regenerating}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleRegenerateDay}
                disabled={regenerating || !regenPrompt.trim()}
              >
                {regenerating ? (
                  <><LoadingSpinner /> Regenerating...</>
                ) : (
                  <><Sparkles size={15} /> Regenerate Day {regenDay}</>
                )}
              </button>
            </>
          )
        }
      >
        <div className="generate-modal-body">
          {!isReviewing ? (
            <>
              <div className="input-group">
                <label className="input-label">What would you like to change?</label>
                <textarea
                  className="input"
                  placeholder="e.g. Make it more relaxed, we want fewer activities and more food stops"
                  value={regenPrompt}
                  onChange={e => setRegenPrompt(e.target.value)}
                  rows={4}
                  disabled={regenerating}
                />
              </div>
              {regenerating && (
                <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--color-text-secondary)', fontSize: 13 }}>
                  ✨ Gemini is reimagining Day {regenDay}...
                </div>
              )}
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                Only Day {regenDay}'s activities will be replaced. All other days remain untouched.
              </p>
            </>
          ) : (
            <div className="review-comparison">
              <p style={{ fontSize: 13, marginBottom: 12 }}>Do you want to save the changes?</p>
              <div className="comparison-columns">
                <div className="comparison-column">
                  <h4>Before</h4>
                  <div className="comparison-items">
                    {items.filter(i => i.day === regenDay).map((item, idx) => (
                      <div key={idx} className="comparison-item">
                        <strong>{item.time}</strong> - {item.activity}
                      </div>
                    ))}
                    {items.filter(i => i.day === regenDay).length === 0 && (
                      <div className="comparison-empty">No activities</div>
                    )}
                  </div>
                </div>
                <div className="comparison-column">
                  <h4>After</h4>
                  <div className="comparison-items">
                    {previewItems.map((item, idx) => (
                      <div key={idx} className="comparison-item new">
                        <strong>{item.time}</strong> - {item.activity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Add Activity Modal */}
      <Modal
        isOpen={showAddForm}
        onClose={() => !adding && setShowAddForm(false)}
        title="Add Activity"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowAddForm(false)} disabled={adding}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAddActivity} disabled={adding}>
              {adding ? (
                <><LoadingSpinner /> Adding...</>
              ) : (
                <><Plus size={15} /> Add Activity</>
              )}
            </button>
          </>
        }
      >
        <div className="modal-body add-activity-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="input-group">
              <label className="input-label">Day</label>
              <input type="number" min="1" className="input" value={addForm.day}
                onChange={e => setAddForm(p => ({ ...p, day: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Time</label>
              <input type="time" className="input" value={addForm.time}
                onChange={e => setAddForm(p => ({ ...p, time: e.target.value }))} />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Activity name</label>
            <input className="input" placeholder="e.g. Sunrise hike" value={addForm.activity}
              onChange={e => setAddForm(p => ({ ...p, activity: e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">Location</label>
            <input className="input" placeholder="e.g. Rohtang Pass, Manali" value={addForm.location}
              onChange={e => setAddForm(p => ({ ...p, location: e.target.value }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="input-group">
              <label className="input-label">Duration (min)</label>
              <input type="number" className="input" value={addForm.durationMinutes}
                onChange={e => setAddForm(p => ({ ...p, durationMinutes: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Cost (₹/person)</label>
              <input type="number" className="input" value={addForm.estimatedCost}
                onChange={e => setAddForm(p => ({ ...p, estimatedCost: e.target.value }))} />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select className="input" value={addForm.category}
              onChange={e => setAddForm(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Notes (optional)</label>
            <input className="input" placeholder="A helpful tip..." value={addForm.notes}
              onChange={e => setAddForm(p => ({ ...p, notes: e.target.value }))} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TripDetail
