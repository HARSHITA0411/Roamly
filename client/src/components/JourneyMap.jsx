import React, { useState, useEffect, useMemo } from 'react'
import { X, Camera, ExternalLink, Clock, DollarSign, MapPin } from 'lucide-react'

/* ──────────────────────────────────────────────────────────
   Category config
   ────────────────────────────────────────────────────────── */
const CAT = {
  outdoor:       { emoji: '🏔️', label: 'Outdoor',       color: '#D84C10', fill: '#FFF3ED', ring: '#FF6B2C' },
  food:          { emoji: '🍽️', label: 'Food & Drinks', color: '#D84C10', fill: '#FFF3ED', ring: '#FF6B2C' },
  transport:     { emoji: '🚌', label: 'Transport',      color: '#D84C10', fill: '#FFF3ED', ring: '#FF6B2C' },
  culture:       { emoji: '🏛️', label: 'Culture',        color: '#D84C10', fill: '#FFF3ED', ring: '#FF6B2C' },
  accommodation: { emoji: '🏨', label: 'Stay',           color: '#D84C10', fill: '#FFF3ED', ring: '#FF6B2C' },
}
const getCat = (c) => CAT[c] || CAT.outdoor

/* ──────────────────────────────────────────────────────────
   Layout constants — LANDSCAPE
   ────────────────────────────────────────────────────────── */
const SVG_H   = 360
const TOP_Y   = 55
const BOT_Y   = 290
const NODE_R  = 32
const X_STEP  = 210
const START_X = 100

/* ──────────────────────────────────────────────────────────
   Build horizontal serpentine path
   ────────────────────────────────────────────────────────── */
function buildPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const c = pts[i], n = pts[i + 1]
    const midX = (c.x + n.x) / 2
    d += ` C ${midX} ${c.y} ${midX} ${n.y} ${n.x} ${n.y}`
  }
  return d
}

/* ──────────────────────────────────────────────────────────
   Photo URLs — LoremFlickr (free, keyword-based, no API key)
   Each lock number fetches a DIFFERENT photo for the same keyword
   ────────────────────────────────────────────────────────── */
function makePhotoUrl(location, lock = 1) {
  // Take only the primary place name (before first comma)
  const place = location.split(',')[0].trim()
  return `https://loremflickr.com/800/500/${encodeURIComponent(place)},travel?lock=${lock}`
}

/* ──────────────────────────────────────────────────────────
   Single gallery photo cell
   ────────────────────────────────────────────────────────── */
const GalleryPhoto = ({ url, cat, className }) => {
  const [loaded, setLoaded] = useState(false)
  const [err,    setErr]    = useState(false)

  return (
    <div className={`jml-gp ${className || ''}`}>
      {!err ? (
        <>
          {!loaded && <div className="jml-shimmer"><div className="jml-shimmer-inner" /></div>}
          <img
            src={url}
            alt=""
            className={`jml-gp-img ${loaded ? 'jml-gp-loaded' : ''}`}
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
          />
        </>
      ) : (
        <div
          className="jml-gp-fallback"
          style={{ background: `linear-gradient(135deg, ${cat.fill}, ${cat.ring}33)` }}
        >
          <span style={{ fontSize: 30 }}>{cat.emoji}</span>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Photo Popup — 3 real photos + "See more" link
   ────────────────────────────────────────────────────────── */
const PhotoPopup = ({ act, onClose }) => {
  const cat     = getCat(act.category)
  const moreUrl = `https://www.google.com/search?q=${encodeURIComponent(act.location + ' ' + act.activity + ' photos')}&tbm=isch`

  // Three different lock values = three different Flickr photos of the same place
  const photoUrls = [
    makePhotoUrl(act.location, 1),
    makePhotoUrl(act.location, 2),
    makePhotoUrl(act.location, 3),
  ]

  return (
    <div className="jml-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="jml-popup">

        {/* 3-photo editorial grid */}
        <div className="jml-gallery">
          <GalleryPhoto url={photoUrls[0]} cat={cat} className="jml-gp-main" />
          <GalleryPhoto url={photoUrls[1]} cat={cat} />
          <GalleryPhoto url={photoUrls[2]} cat={cat} />
        </div>

        {/* Overlays */}
        <div className="jml-gallery-fade" />
        <button className="jml-close" onClick={onClose}><X size={15} /></button>
        <div className="jml-cat-tag" style={{ background: cat.fill, color: cat.color }}>
          {cat.emoji} {cat.label}
        </div>

        {/* Info */}
        <div className="jml-popup-body">
          <div className="jml-popup-time" style={{ color: cat.color }}>{act.time}</div>
          <h3 className="jml-popup-title">{act.activity}</h3>
          <div className="jml-popup-loc"><MapPin size={13} />{act.location}</div>

          <div className="jml-popup-chips">
            <span className="jml-chip"><Clock size={11} /> {act.durationMinutes} min</span>
            <span className="jml-chip"><DollarSign size={11} /> ₹{Number(act.estimatedCost).toLocaleString('en-IN')}</span>
          </div>

          {act.notes && <div className="jml-notes">💡 {act.notes}</div>}

          <a className="jml-photo-link" href={moreUrl} target="_blank" rel="noopener noreferrer">
            <Camera size={14} /> See more photos of {act.location}
            <ExternalLink size={12} style={{ marginLeft: 'auto' }} />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   SVG Activity Node

   CLICK FIX — definitive approach:
   • The <g> element has pointerEvents:'none' so the GROUP
     itself (including all its text/circle children) will
     NEVER receive pointer events — not hover, not click.
   • A single transparent <circle> at the end of the group
     explicitly sets pointerEvents:'all' to override the parent.
   • That hit circle is the ONE AND ONLY element that can
     receive clicks/hovers. Its radius equals NODE_R exactly,
     so you must click the circle — corners of text labels
     are completely inert.
   ────────────────────────────────────────────────────────── */
const Node = ({ pt, index, isTop, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const { x, y, act } = pt
  const cat = getCat(act.category)

  const labelY    = isTop ? y + NODE_R + 18 : y - NODE_R - 48
  const labelStep = 16

  // Scale is driven only by the hit circle's mouse events
  const sc = hovered || isActive ? 1.1 : 1
  const tx = `scale(${sc})` 
  const to = `${x}px ${y}px`
  const tr = 'transform 0.15s ease'

  return (
    /* pointer-events: none on the group — the group and ALL its
       children are invisible to pointer events by default.
       Only the explicit hit circle at the bottom overrides this. */
    <g style={{ pointerEvents: 'none' }}>

      {/* Active glow ring */}
      {isActive && (
        <circle cx={x} cy={y} r={NODE_R + 13}
          fill={cat.ring + '20'} stroke={cat.ring}
          strokeWidth={1.5} strokeDasharray="4 3"
          style={{ transform: tx, transformOrigin: to, transition: tr }}
        />
      )}

      {/* Drop shadow */}
      <circle cx={x} cy={y + 3} r={NODE_R}
        fill="rgba(0,0,0,0.1)"
        style={{ filter: 'blur(5px)', transform: tx, transformOrigin: to, transition: tr }}
      />

      {/* Main circle */}
      <circle cx={x} cy={y} r={NODE_R}
        fill={isActive ? cat.ring : '#FFFFFF'}
        stroke={cat.ring}
        strokeWidth={isActive ? 0 : 2.5}
        style={{ transform: tx, transformOrigin: to, transition: tr }}
      />

      {/* Inner fill ring */}
      {!isActive && (
        <circle cx={x} cy={y} r={NODE_R - 7}
          fill={cat.fill} opacity={0.8}
          style={{ transform: tx, transformOrigin: to, transition: tr }}
        />
      )}

      {/* Emoji */}
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
        fontSize={21} style={{ userSelect: 'none',
          transform: tx, transformOrigin: to, transition: tr }}>
        {cat.emoji}
      </text>

      {/* STOP badge */}
      <text x={x} y={isTop ? y - NODE_R - 11 : y + NODE_R + 15}
        textAnchor="middle" fontSize={9} fontWeight={800}
        fill={cat.color} fontFamily="DM Sans, sans-serif" letterSpacing="0.8">
        STOP {index + 1}
      </text>

      {/* Activity name */}
      <text x={x} y={labelY} textAnchor="middle"
        fontSize={13} fontWeight={700} fill="#1A1A1A"
        fontFamily="DM Sans, sans-serif"
        paintOrder="stroke"
        stroke="rgba(249,249,249,0.95)" strokeWidth={4} strokeLinecap="round">
        {act.activity.length > 18 ? act.activity.slice(0, 16) + '…' : act.activity}
      </text>

      {/* Location */}
      <text x={x} y={labelY + labelStep} textAnchor="middle"
        fontSize={10} fill="#666666" fontFamily="DM Sans, sans-serif"
        paintOrder="stroke" stroke="rgba(249,249,249,0.9)" strokeWidth={3}>
        {act.location.length > 20 ? act.location.slice(0, 18) + '…' : act.location}
      </text>

      {/* Time */}
      <text x={x} y={labelY + labelStep * 2} textAnchor="middle"
        fontSize={10} fontWeight={700} fill={cat.color}
        fontFamily="DM Sans, sans-serif">
        {act.time} · {act.durationMinutes}m
      </text>

      {/* ── SOLE POINTER-EVENT RECEIVER ──────────────────────────
          pointerEvents:'all' overrides the parent's 'none'.
          Only clicks/hovers exactly within r=NODE_R of (x,y)
          will trigger anything. Text labels are fully inert.  */}
      <circle
        cx={x} cy={y} r={NODE_R}
        fill="transparent" stroke="none"
        style={{ pointerEvents: 'all', cursor: 'pointer' }}
        onClick={() => onClick(act)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </g>
  )
}

/* ──────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────── */
const JourneyMap = ({ items, trip }) => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [activeAct,   setActiveAct]   = useState(null)

  const days = useMemo(() =>
    [...new Set(items.map(i => i.day))].sort((a, b) => a - b),
    [items]
  )

  useEffect(() => {
    if (days.length > 0) setSelectedDay(d => d ?? days[0])
  }, [days])

  const dayItems = useMemo(() =>
    items
      .filter(i => i.day === selectedDay)
      .sort((a, b) =>
        a.position !== undefined && b.position !== undefined
          ? a.position - b.position
          : a.time.localeCompare(b.time)
      ),
    [items, selectedDay]
  )

  const pts = dayItems.map((act, i) => ({
    x: START_X + i * X_STEP,
    y: i % 2 === 0 ? TOP_Y : BOT_Y,
    act,
  }))

  const svgW    = Math.max(START_X + (dayItems.length - 1) * X_STEP + START_X, 500)
  const pathD   = buildPath(pts)
  const pathLen = (dayItems.length - 1) * X_STEP * 1.4 + 80

  const getDateLabel = (day) => {
    if (!trip?.startDate) return null
    const d = new Date(trip.startDate)
    d.setDate(d.getDate() + day - 1)
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  if (items.length === 0) {
    return (
      <div className="jml-empty">
        <span style={{ fontSize: 48 }}>🗺️</span>
        <p>Generate your itinerary to see the Journey view</p>
      </div>
    )
  }

  return (
    <div className="jml-wrapper">

      {/* Day tabs */}
      <div className="jml-day-bar">
        <span className="jml-day-bar-label">🗓️ Select a day</span>
        <div className="jml-day-tabs">
          {days.map(day => (
            <button
              key={day}
              className={`jml-tab ${selectedDay === day ? 'jml-tab-active' : ''}`}
              onClick={() => { setSelectedDay(day); setActiveAct(null) }}
            >
              <span className="jml-tab-num">Day {day}</span>
              {getDateLabel(day) && <span className="jml-tab-date">{getDateLabel(day)}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="jml-canvas">
        <div className="jml-canvas-header">
          <div className="jml-canvas-day">Day {selectedDay}</div>
          <div className="jml-canvas-meta">
            {dayItems.length} activities
            {getDateLabel(selectedDay) && ` · ${getDateLabel(selectedDay)}`}
            {trip?.destination && ` · ${trip.destination}`}
          </div>
        </div>

        <div className="jml-scroll">
          <svg
            key={selectedDay}
            width={svgW}
            height={SVG_H}
            viewBox={`0 0 ${svgW} ${SVG_H}`}
            className="jml-svg"
          >
            <defs>
              <linearGradient id="jmlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#FF6B2C" stopOpacity="0.6" />
                <stop offset="50%"  stopColor="#FF6B2C" />
                <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0.6" />
              </linearGradient>
              <filter id="jmlGlow" x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {dayItems.length > 1 && (
              <>
                <path d={pathD} fill="none"
                  stroke="url(#jmlGrad)" strokeWidth={3.5}
                  strokeLinecap="round" strokeDasharray="12 7"
                />
              </>
            )}

            {pts.map((pt, i) => (
              <Node
                key={pt.act.id || i}
                pt={pt}
                index={i}
                isTop={i % 2 === 0}
                isActive={activeAct === pt.act || activeAct?.id === pt.act.id}
                onClick={act => setActiveAct(prev => prev === act ? null : act)}
              />
            ))}
          </svg>
        </div>

        <div className="jml-hint">👆 Tap any stop to see photos &amp; details</div>
      </div>

      {/* Activity strip */}
      <div className="jml-strip">
        {dayItems.map((act, i) => {
          const cat = getCat(act.category)
          const isAct = activeAct === act || activeAct?.id === act.id
          return (
            <button
              key={act.id || i}
              className={`jml-strip-btn ${isAct ? 'jml-strip-btn-active' : ''}`}
              style={{ '--ring': cat.ring, '--fill': cat.fill }}
              onClick={() => setActiveAct(prev => prev === act ? null : act)}
            >
              <span className="jml-strip-num" style={{ background: cat.ring, color: '#fff' }}>{i + 1}</span>
              <span className="jml-strip-emoji">{cat.emoji}</span>
              <div className="jml-strip-text">
                <div className="jml-strip-name">{act.activity}</div>
                <div className="jml-strip-sub">{act.time} · {act.location}</div>
              </div>
            </button>
          )
        })}
      </div>

      {activeAct && <PhotoPopup act={activeAct} onClose={() => setActiveAct(null)} />}
    </div>
  )
}

export default JourneyMap
