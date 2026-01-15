import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripsAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { MapPin, Calendar, Users } from 'lucide-react'

const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const Join = () => {
  const { shareToken } = useParams()
  const { isAuthenticated, token } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [tripInfo, setTripInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [alreadyMember, setAlreadyMember] = useState(false)

  useEffect(() => {
    fetchTripInfo()
  }, [shareToken])

  const fetchTripInfo = async () => {
    try {
      const res = await tripsAPI.getByShareToken(shareToken)
      setTripInfo(res.data.trip)

      // If authenticated, check if already a collaborator
      if (isAuthenticated) {
        try {
          await tripsAPI.get(res.data.trip.id)
          setAlreadyMember(true)
        } catch (e) {
          if (e.response?.status !== 403) setAlreadyMember(false)
        }
      }
    } catch (err) {
      addToast('Trip not found or link is invalid', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(`/join/${shareToken}`)}`)
      return
    }

    setJoining(true)
    try {
      await tripsAPI.join(tripInfo.id, shareToken)
      addToast('You joined the trip! 🎉', 'success')
      navigate(`/trips/${tripInfo.id}`)
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to join trip'
      if (msg.includes('Already')) {
        navigate(`/trips/${tripInfo.id}`)
      } else {
        addToast(msg, 'error')
      }
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="join-page">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div className="spinner spinner-orange" style={{ width: 36, height: 36 }} />
          <span style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Loading trip info...</span>
        </div>
      </div>
    )
  }

  if (!tripInfo) {
    return (
      <div className="join-page">
        <div className="card join-card">
          <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
          <h2 style={{ fontWeight: 700, marginBottom: 8 }}>Trip not found</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 24 }}>
            This invite link is invalid or has expired.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="join-page">
      <div className="card join-card">
        <div className="auth-logo" style={{ marginBottom: 24, textAlign: 'center' }}>Roamly</div>

        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8, textAlign: 'center' }}>
          <strong>{tripInfo.createdBy}</strong> invited you to join
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, textAlign: 'center', letterSpacing: '-0.5px' }}>
          {tripInfo.name}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0', padding: '16px', background: 'var(--color-surface)', borderRadius: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-secondary)' }}>
            <MapPin size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>{tripInfo.destination}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-secondary)' }}>
            <Calendar size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>{formatDate(tripInfo.startDate)} — {formatDate(tripInfo.endDate)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-secondary)' }}>
            <Users size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>{tripInfo.travelers} traveler{tripInfo.travelers !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {alreadyMember ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--color-success)', fontWeight: 600, marginBottom: 16 }}>
              ✓ You're already on this trip!
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/trips/${tripInfo.id}`)}>
              View Trip
            </button>
          </div>
        ) : (
          <button
            id="join-trip-btn"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handleJoin}
            disabled={joining}
          >
            {joining ? <LoadingSpinner /> : isAuthenticated ? '🤝 Join this trip' : '🔐 Sign in to join'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Join
