import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MapPin, Clock, Pencil, Trash2, AlertTriangle, DollarSign, Check, X, Lock } from 'lucide-react'
import { itineraryAPI } from '../api'
import { useToast } from '../context/ToastContext'

const CATEGORIES = ['outdoor', 'food', 'transport', 'culture', 'accommodation']

const ActivityCard = ({ item, tripId, onUpdated, onDeleted, onRequestDelete, socket, lockInfo }) => {
  const { addToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    time: item.time,
    activity: item.activity,
    location: item.location,
    durationMinutes: item.durationMinutes,
    estimatedCost: item.estimatedCost,
    category: item.category,
    notes: item.notes || ''
  })

  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  }

  const isLocked = !!lockInfo // being edited by someone else

  const handleEditClick = (e) => {
    e.stopPropagation()
    if (isLocked) return
    setEditing(true)
    // Notify other collaborators
    if (socket) socket.emit('editing_start', { tripId, itemId: item.id })
  }

  const handleCancel = () => {
    setEditing(false)
    setEditForm({
      time: item.time,
      activity: item.activity,
      location: item.location,
      durationMinutes: item.durationMinutes,
      estimatedCost: item.estimatedCost,
      category: item.category,
      notes: item.notes || ''
    })
    if (socket) socket.emit('editing_end', { tripId, itemId: item.id })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const changes = {
        ...editForm,
        durationMinutes: parseInt(editForm.durationMinutes),
        estimatedCost: parseInt(editForm.estimatedCost)
      }
      const res = await itineraryAPI.update(tripId, item.id, changes)
      onUpdated(res.data.item)

      // Notify other collaborators about the update
      if (socket) {
        socket.emit('card_updated', {
          tripId,
          itemId: item.id,
          changes,
          updatedAt: Date.now()
        })
        socket.emit('editing_end', { tripId, itemId: item.id })
      }

      setEditing(false)
      addToast('Activity updated', 'success')
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to update', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    if (isLocked) return
    onRequestDelete(item)
  }

  if (editing) {
    return (
      <div className="activity-card" ref={setNodeRef} style={style}>
        <div className="inline-edit-form">
          <div className="inline-edit-row">
            <div className="input-group">
              <label className="input-label">Time</label>
              <input type="time" className="input" value={editForm.time}
                onChange={e => setEditForm(p => ({ ...p, time: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="input" value={editForm.category}
                onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Activity</label>
            <input className="input" value={editForm.activity}
              onChange={e => setEditForm(p => ({ ...p, activity: e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">Location</label>
            <input className="input" value={editForm.location}
              onChange={e => setEditForm(p => ({ ...p, location: e.target.value }))} />
          </div>
          <div className="inline-edit-row">
            <div className="input-group">
              <label className="input-label">Duration (min)</label>
              <input type="number" className="input" value={editForm.durationMinutes}
                onChange={e => setEditForm(p => ({ ...p, durationMinutes: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Cost (₹/person)</label>
              <input type="number" className="input" value={editForm.estimatedCost}
                onChange={e => setEditForm(p => ({ ...p, estimatedCost: e.target.value }))} />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Notes</label>
            <input className="input" value={editForm.notes}
              onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Optional tip..." />
          </div>
          <div className="inline-edit-actions">
            <button className="btn btn-ghost btn-sm" onClick={handleCancel}>
              <X size={14} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? <div className="spinner" style={{ width: 14, height: 14 }} /> : <><Check size={14} /> Save</>}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`activity-card ${isDragging ? 'activity-card-dragging' : ''}`}
      ref={setNodeRef}
      style={{
        ...style,
        borderTop: isLocked ? `2.5px solid ${lockInfo?.color || '#3B82F6'}` : undefined,
        position: 'relative'
      }}
      {...attributes}
      {...(isLocked ? {} : listeners)}
    >
      {/* V2: Lock indicator */}
      {isLocked && (
        <div className="card-lock-banner">
          <Lock size={10} />
          Being edited by <strong>{lockInfo.userName}</strong>
        </div>
      )}

      <div className="card-actions">
        <button
          className="card-action-btn"
          onClick={handleEditClick}
          title={isLocked ? `Being edited by ${lockInfo.userName}` : 'Edit'}
          disabled={isLocked}
          style={{ opacity: isLocked ? 0.4 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
        >
          <Pencil size={13} />
        </button>
        <button
          className="card-action-btn delete"
          onClick={handleDeleteClick}
          title={isLocked ? `Cannot delete while being edited` : 'Delete'}
          disabled={isLocked}
          style={{ opacity: isLocked ? 0.4 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div className="card-time">{item.time}</div>
      <div className="card-activity">{item.activity}</div>

      <div className="card-location">
        <MapPin size={11} />
        {item.location}
      </div>

      <div className="card-footer">
        <div className="card-meta">
          <div className="card-meta-item">
            <Clock size={11} />
            {item.durationMinutes} min
          </div>
          <div className="card-meta-item">
            <DollarSign size={11} />
            ₹{Number(item.estimatedCost).toLocaleString('en-IN')}
          </div>
        </div>
        <span className={`badge badge-${item.category}`}>{item.category}</span>
      </div>

      {item.notes && (
        <div className="card-notes">💡 {item.notes}</div>
      )}

      {item.hasTimingConflict && (
        <div className="conflict-warning">
          <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Travel from previous stop takes {item.travelTimeFromPrevious} min — check your timing</span>
        </div>
      )}
    </div>
  )
}

export default ActivityCard
