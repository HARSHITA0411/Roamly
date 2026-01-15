import React, { useState, useRef, useEffect, useCallback } from 'react'
import Modal from './Modal'
import { itineraryAPI } from '../api'
import { useToast } from '../context/ToastContext'
import {
  MapPin, Clock, DollarSign, Pencil, Trash2, Check, X,
  ZoomIn, ZoomOut, Maximize2, Calendar, AlertTriangle,
  GripVertical
} from 'lucide-react'

/* ─── Constants ─────────────────────────────────────── */
const MIN_ZOOM = 0.3
const MAX_ZOOM = 1.6
const ZOOM_STEP = 0.1
const COL_WIDTH = 300
const COL_GAP = 48
const COL_HEADER_H = 52
const CANVAS_PAD = 60

const CATEGORIES = ['outdoor', 'food', 'transport', 'culture', 'accommodation']

const CATEGORY_META = {
  outdoor:       { color: '#10B981', bg: '#D1FAE5', emoji: '🏕️' },
  food:          { color: '#F59E0B', bg: '#FEF3C7', emoji: '🍜' },
  transport:     { color: '#3B82F6', bg: '#DBEAFE', emoji: '🚆' },
  culture:       { color: '#8B5CF6', bg: '#EDE9FE', emoji: '🏛️' },
  accommodation: { color: '#EC4899', bg: '#FCE7F3', emoji: '🏨' },
}

/* ─── Helpers ─────────────────────────────────────── */
const formatDayHeader = (day, tripStartDate) => {
  if (!tripStartDate) return `Day ${day}`
  const d = new Date(tripStartDate)
  d.setDate(d.getDate() + day - 1)
  return {
    dayNum: `Day ${day}`,
    label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  }
}

/* ─── Inline edit form inside a card ─────────────────── */
const InlineEditForm = ({ item, tripId, onUpdated, onCancel }) => {
  const { addToast } = useToast()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    time: item.time,
    activity: item.activity,
    location: item.location,
    durationMinutes: item.durationMinutes,
    estimatedCost: item.estimatedCost,
    category: item.category,
    notes: item.notes || ''
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await itineraryAPI.update(tripId, item.id, {
        ...form,
        durationMinutes: parseInt(form.durationMinutes),
        estimatedCost: parseInt(form.estimatedCost)
      })
      onUpdated(res.data.item)
      addToast('Activity updated ✓', 'success')
    } catch {
      addToast('Failed to update', 'error')
    } finally {
      setSaving(false)
    }
  }

  const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  return (
    <div className="canvas-edit-form" onClick={e => e.stopPropagation()}>
      <div className="canvas-edit-row">
        <div className="input-group">
          <label className="input-label">Time</label>
          <input type="time" className="input" value={form.time} onChange={f('time')} />
        </div>
        <div className="input-group">
          <label className="input-label">Category</label>
          <select className="input" value={form.category} onChange={f('category')}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Activity</label>
        <input className="input" value={form.activity} onChange={f('activity')} />
      </div>
      <div className="input-group">
        <label className="input-label">Location</label>
        <input className="input" value={form.location} onChange={f('location')} />
      </div>
      <div className="canvas-edit-row">
        <div className="input-group">
          <label className="input-label">Duration (min)</label>
          <input type="number" className="input" value={form.durationMinutes} onChange={f('durationMinutes')} />
        </div>
        <div className="input-group">
          <label className="input-label">Cost (₹)</label>
          <input type="number" className="input" value={form.estimatedCost} onChange={f('estimatedCost')} />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Notes</label>
        <input className="input" value={form.notes} onChange={f('notes')} placeholder="Optional tip..." />
      </div>
      <div className="canvas-edit-actions">
        <button className="btn btn-ghost btn-sm" onClick={onCancel}><X size={13} /> Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          {saving ? <div className="spinner" style={{ width: 13, height: 13 }} /> : <><Check size={13} /> Save</>}
        </button>
      </div>
    </div>
  )
}

/* ─── Single Activity Card ─────────────────────────── */
const CanvasCard = ({ item, tripId, onUpdated, onDeleted, isDragging, dragHandleProps, onRequestDelete }) => {
  const { addToast } = useToast()
  const [editing, setEditing] = useState(false)
  const meta = CATEGORY_META[item.category] || CATEGORY_META.outdoor

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onRequestDelete(item)
  }

  if (editing) {
    return (
      <div className={`canvas-card canvas-card-editing ${isDragging ? 'canvas-card-ghost' : ''}`}>
        <InlineEditForm
          item={item}
          tripId={tripId}
          onUpdated={(updated) => { onUpdated(updated); setEditing(false) }}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className={`canvas-card ${isDragging ? 'canvas-card-ghost' : ''}`}
      style={{ '--cat-color': meta.color, '--cat-bg': meta.bg }}>

      {/* Left accent stripe */}
      <div className="canvas-card-stripe" style={{ background: meta.color }} />

      {/* Drag handle */}
      <div className="canvas-card-grip" {...dragHandleProps} title="Drag to reorder">
        <GripVertical size={14} />
      </div>

      {/* Action buttons */}
      <div className="canvas-card-actions">
        <button className="canvas-card-btn" onClick={e => { e.stopPropagation(); setEditing(true) }} title="Edit">
          <Pencil size={12} />
        </button>
        <button className="canvas-card-btn canvas-card-btn-delete" onClick={handleDeleteClick} title="Delete">
          <Trash2 size={12} />
        </button>
      </div>

      {/* Time & emoji */}
      <div className="canvas-card-top">
        <span className="canvas-card-time">{item.time}</span>
        <span className="canvas-card-emoji">{meta.emoji}</span>
      </div>

      <div className="canvas-card-title">{item.activity}</div>

      <div className="canvas-card-location">
        <MapPin size={11} /> {item.location}
      </div>

      <div className="canvas-card-footer">
        <div className="canvas-card-meta">
          <span><Clock size={10} /> {item.durationMinutes}m</span>
          <span><DollarSign size={10} /> ₹{Number(item.estimatedCost).toLocaleString('en-IN')}</span>
        </div>
        <span className="canvas-card-badge" style={{ background: meta.bg, color: meta.color }}>
          {item.category}
        </span>
      </div>

      {item.notes && (
        <div className="canvas-card-notes">💡 {item.notes}</div>
      )}

      {item.hasTimingConflict && (
        <div className="canvas-card-conflict">
          <AlertTriangle size={11} />
          <span>⚠ Travel overlap — check timing</span>
        </div>
      )}
    </div>
  )
}

/* ─── Day Column ─────────────────────────────────── */
const DayColumn = ({ day, items, tripId, tripStartDate, onItemUpdated, onItemDeleted, onItemsChange, onRequestDelete }) => {
  const { addToast } = useToast()
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)

  const header = formatDayHeader(day, tripStartDate)

  /* Simple drag-and-drop within the column */
  const handleDragStart = (e, id) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }

  const handleDragOver = (e, id) => {
    e.preventDefault()
    setDragOverId(id)
  }

  const handleDrop = async (e, overId) => {
    e.preventDefault()
    const activeId = draggingId
    setDraggingId(null)
    setDragOverId(null)
    if (!activeId || activeId === overId) return

    const sorted = [...items].sort((a, b) => a.position - b.position)
    const fromIdx = sorted.findIndex(i => i.id === activeId)
    const toIdx = sorted.findIndex(i => i.id === overId)
    if (fromIdx < 0 || toIdx < 0) return

    const reordered = [...sorted]
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)

    const withPositions = reordered.map((item, idx) => ({ ...item, position: idx }))
    onItemsChange(withPositions)

    try {
      const targetItem = sorted[toIdx]
      let newPosition
      if (toIdx === 0) newPosition = targetItem.position - 1
      else if (toIdx >= sorted.length - 1) newPosition = targetItem.position + 1
      else newPosition = (sorted[toIdx - 1].position + targetItem.position) / 2

      await itineraryAPI.reorder(tripId, { itemId: activeId, newPosition, day })
    } catch {
      addToast('Failed to reorder', 'error')
    }
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

  const sorted = [...items].sort((a, b) => a.position - b.position)

  return (
    <div className="canvas-day-col">
      {/* Header */}
      <div className="canvas-day-header">
        <div className="canvas-day-num">{header.dayNum}</div>
        <div className="canvas-day-label">{header.label}</div>
        <div className="canvas-day-count">{items.length} activities</div>
      </div>

      {/* Cards drop zone */}
      <div
        className="canvas-day-body"
        onDragOver={e => { e.preventDefault(); setDragOverId('__end__') }}
        onDrop={e => handleDrop(e, sorted[sorted.length - 1]?.id)}
        onDragEnd={handleDragEnd}
      >
        {sorted.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={e => handleDragStart(e, item.id)}
            onDragOver={e => handleDragOver(e, item.id)}
            onDrop={e => handleDrop(e, item.id)}
            className={`canvas-card-wrapper ${dragOverId === item.id && draggingId !== item.id ? 'canvas-card-drop-target' : ''}`}
          >
            <CanvasCard
              item={item}
              tripId={tripId}
              onUpdated={onItemUpdated}
              onDeleted={onItemDeleted}
              onRequestDelete={onRequestDelete}
              isDragging={draggingId === item.id}
              dragHandleProps={{}}
            />
          </div>
        ))}

        {items.length === 0 && (
          <div className="canvas-day-empty">
            <Calendar size={22} />
            <span>No activities yet</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Mini-map ───────────────────────────────────── */
const MiniMap = ({ days, items, pan, zoom, containerSize, canvasSize }) => {
  const SCALE = 0.12
  const w = canvasSize.w * SCALE
  const h = Math.min(canvasSize.h * SCALE, 80)

  const viewW = (containerSize.w / zoom) * SCALE
  const viewH = (containerSize.h / zoom) * SCALE
  const viewX = (-pan.x / zoom) * SCALE
  const viewY = (-pan.y / zoom) * SCALE

  return (
    <div className="canvas-minimap" style={{ width: w + 8, height: h + 8 }}>
      <svg width={w} height={h}>
        {days.map((day, idx) => {
          const x = (CANVAS_PAD + idx * (COL_WIDTH + COL_GAP)) * SCALE
          const dayItems = items.filter(i => i.day === day)
          const colH = Math.max(COL_HEADER_H + dayItems.length * 90, 120) * SCALE
          return (
            <rect key={day} x={x} y={0} width={COL_WIDTH * SCALE} height={colH}
              rx={2} fill="rgba(255,107,44,0.12)" stroke="rgba(255,107,44,0.3)" strokeWidth={0.5} />
          )
        })}
        {/* Viewport rect */}
        <rect x={viewX} y={viewY} width={viewW} height={viewH}
          rx={2} fill="none" stroke="#FF6B2C" strokeWidth={1.5} opacity={0.8} />
      </svg>
    </div>
  )
}

/* ─── Main Canvas Component ──────────────────────── */
const ItineraryCanvas = ({ items, tripId, trip, onItemsChange }) => {
  const { addToast } = useToast()
  const containerRef = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const panStart = useRef(null)
  const animFrame = useRef(null)

  const days = [...new Set(items.map(i => i.day))].sort((a, b) => a - b)
  const byDay = {}
  for (const day of days) {
    byDay[day] = items.filter(i => i.day === day)
  }

  const canvasW = days.length * (COL_WIDTH + COL_GAP) + CANVAS_PAD * 2
  const maxItemsInDay = Math.max(...days.map(d => byDay[d]?.length || 0), 0)
  const canvasH = COL_HEADER_H + maxItemsInDay * 140 + CANVAS_PAD * 2

  /* ── Zoom ── */
  const handleWheel = useCallback((e) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, parseFloat((z + delta).toFixed(2)))))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  /* ── Pan ── */
  const handleMouseDown = (e) => {
    if (e.button !== 1 && !(e.button === 0 && e.altKey)) return
    e.preventDefault()
    setIsPanning(true)
    panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }
  }

  const handleMouseMove = useCallback((e) => {
    if (!isPanning || !panStart.current) return
    if (animFrame.current) cancelAnimationFrame(animFrame.current)
    animFrame.current = requestAnimationFrame(() => {
      setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y })
    })
  }, [isPanning])

  const handleMouseUp = () => {
    setIsPanning(false)
    panStart.current = null
  }

  /* ── Zoom controls ── */
  const zoomIn  = () => setZoom(z => Math.min(MAX_ZOOM, parseFloat((z + ZOOM_STEP).toFixed(2))))
  const zoomOut = () => setZoom(z => Math.max(MIN_ZOOM, parseFloat((z - ZOOM_STEP).toFixed(2))))
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  /* ── Item handlers ── */
  const handleItemUpdated = (updatedItem) => {
    onItemsChange(items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }

  const handleItemDeleted = (itemId) => {
    onItemsChange(items.filter(i => i.id !== itemId))
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      await itineraryAPI.delete(tripId, itemToDelete.id)
      handleItemDeleted(itemToDelete.id)
      addToast('Activity deleted', 'info')
    } catch {
      addToast('Failed to delete', 'error')
    } finally {
      setIsDeleting(false)
      setItemToDelete(null)
    }
  }

  const handleColumnItemsChange = (day, newDayItems) => {
    const others = items.filter(i => i.day !== day)
    onItemsChange([...others, ...newDayItems])
  }

  if (items.length === 0) {
    return (
      <div className="canvas-empty-state">
        <div className="canvas-empty-icon">🗺️</div>
        <p className="canvas-empty-title">Your canvas is empty</p>
        <p className="canvas-empty-sub">Click "Generate with AI" to populate your day-by-day plan</p>
      </div>
    )
  }

  const containerSize = {
    w: containerRef.current?.clientWidth || window.innerWidth,
    h: containerRef.current?.clientHeight || 600
  }

  return (
    <div
      className={`canvas-viewport ${isPanning ? 'canvas-viewport-panning' : ''}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dotted background */}
      <div className="canvas-bg-dots"
        style={{
          backgroundPosition: `${pan.x % (20 * zoom)}px ${pan.y % (20 * zoom)}px`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`
        }}
      />

      {/* The actual canvas layer */}
      <div
        className="canvas-stage"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: canvasW,
          minHeight: canvasH,
          padding: CANVAS_PAD,
        }}
      >
        {/* Connector line between columns */}
        {days.length > 1 && (
          <svg className="canvas-connector-svg"
            style={{ position: 'absolute', top: CANVAS_PAD + COL_HEADER_H / 2, left: CANVAS_PAD, pointerEvents: 'none' }}
            width={(days.length - 1) * (COL_WIDTH + COL_GAP) + COL_WIDTH}
            height={2}
          >
            <line
              x1={COL_WIDTH / 2} y1={1}
              x2={(days.length - 1) * (COL_WIDTH + COL_GAP) + COL_WIDTH / 2} y1={1} y2={1}
              stroke="rgba(255,107,44,0.2)" strokeWidth={2} strokeDasharray="6 4"
            />
            {days.map((_, idx) => (
              <circle key={idx}
                cx={idx * (COL_WIDTH + COL_GAP) + COL_WIDTH / 2} cy={1}
                r={5} fill="#FF6B2C" opacity={0.5}
              />
            ))}
          </svg>
        )}

        {/* Day columns */}
        <div className="canvas-cols-row">
          {days.map((day) => (
            <DayColumn
              key={day}
              day={day}
              items={byDay[day] || []}
              tripId={tripId}
              tripStartDate={trip?.startDate}
              onItemUpdated={handleItemUpdated}
              onItemDeleted={handleItemDeleted}
              onRequestDelete={setItemToDelete}
              onItemsChange={(newItems) => handleColumnItemsChange(day, newItems)}
            />
          ))}
        </div>
      </div>

      {/* ── HUD Controls ── */}
      <div className="canvas-hud">
        {/* Zoom controls */}
        <div className="canvas-zoom-controls">
          <button className="canvas-hud-btn" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} title="Zoom out">
            <ZoomOut size={16} />
          </button>
          <span className="canvas-zoom-label">{Math.round(zoom * 100)}%</span>
          <button className="canvas-hud-btn" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} title="Zoom in">
            <ZoomIn size={16} />
          </button>
          <button className="canvas-hud-btn" onClick={resetView} title="Reset view">
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Hint */}
        <div className="canvas-hint">
          <kbd>Ctrl</kbd> + scroll to zoom · <kbd>Alt</kbd> + drag to pan
        </div>
      </div>

      {/* Mini-map */}
      <MiniMap
        days={days}
        items={items}
        pan={pan}
        zoom={zoom}
        containerSize={containerSize}
        canvasSize={{ w: canvasW, h: canvasH }}
      />

      <Modal
        isOpen={!!itemToDelete}
        onClose={() => !isDeleting && setItemToDelete(null)}
        title="Delete Activity"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setItemToDelete(null)} disabled={isDeleting}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </>
        }
      >
        <div className="modal-body">
          <p style={{ margin: 0 }}>Are you sure you want to delete <strong>{itemToDelete?.activity}</strong>?</p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 8 }}>This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  )
}

export default ItineraryCanvas
