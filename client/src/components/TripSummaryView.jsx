import React, { useState, useRef } from 'react'
import { Sparkles, Download, Printer, MapPin, Clock, DollarSign, Users, Calendar, Plane, Share2 } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import { itineraryAPI } from '../api'
import { useToast } from '../context/ToastContext'

const CATEGORY_ICONS = {
  outdoor: '🏕️',
  food: '🍽️',
  transport: '🚌',
  culture: '🏛️',
  accommodation: '🏨',
}

const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatTime = (t) => {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

const TripSummaryView = ({ trip, items, setTrip }) => {
  const { addToast } = useToast()
  const [exporting, setExporting] = useState(false)
  const [sharing, setSharing] = useState(false)
  const pageRef = useRef(null)

  const daysCount = [...new Set(items.map(i => i.day))].length
  const totalCost = items.reduce((s, i) => s + i.estimatedCost, 0)
  const summaries = trip.dailySummaries || {}

  // Client-side PDF: capture the exact rendered A4 paper element
  const handleDownloadPDF = async () => {
    if (!pageRef.current) return
    setExporting(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const filename = `roamly-${trip.name.replace(/\s+/g, '-').toLowerCase()}-summary.pdf`
      await html2pdf()
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          pagebreak: { mode: ['avoid-all', 'css'] },
        })
        .from(pageRef.current)
        .save()
      addToast('Summary PDF downloaded! 📄', 'success')
    } catch (err) {
      console.error(err)
      addToast('Failed to export PDF', 'error')
    } finally {
      setExporting(false)
    }
  }

  // Client-side Share: Share generated PDF file or fallback to link
  const handleShare = async () => {
    if (!pageRef.current) return
    setSharing(true)
    try {
      const shareUrl = `${window.location.origin}/join/${trip.shareToken}`
      const filename = `roamly-${trip.name.replace(/\s+/g, '-').toLowerCase()}-summary.pdf`

      // Try to share as actual PDF file using Web Share API
      if (navigator.share) {
        const html2pdf = (await import('html2pdf.js')).default
        const worker = html2pdf()
          .set({
            margin: 0,
            filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              letterRendering: true,
              scrollY: 0,
            },
            jsPDF: {
              unit: 'mm',
              format: 'a4',
              orientation: 'portrait',
            },
            pagebreak: { mode: ['avoid-all', 'css'] },
          })
          .from(pageRef.current)

        const pdfBlob = await worker.output('blob')
        const file = new File([pdfBlob], filename, { type: 'application/pdf' })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `${trip.name} - Summary PDF`,
            text: `Here is the trip summary PDF for ${trip.name}!`,
          })
          addToast('PDF shared successfully! 📤', 'success')
          return
        }
      }

      // Fallback: Share URL
      if (navigator.share) {
        await navigator.share({
          title: `${trip.name} Summary`,
          text: `Check out the trip summary for ${trip.name} to ${trip.destination}!`,
          url: shareUrl,
        })
        addToast('Link shared successfully! 🔗', 'success')
      } else {
        await navigator.clipboard.writeText(shareUrl)
        addToast('Shareable link copied to clipboard! 🔗', 'success')
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err)
        addToast('Failed to share summary', 'error')
      }
    } finally {
      setSharing(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  // Group items by day
  const byDay = {}
  for (const item of items) {
    if (!byDay[item.day]) byDay[item.day] = []
    byDay[item.day].push(item)
  }
  const sortedDays = Object.keys(byDay).map(Number).sort((a, b) => a - b)

  return (
    <div className="summary-print-wrapper">
      {/* Toolbar — hidden on print */}
      <div className="summary-toolbar no-print">
        <div className="summary-toolbar-left">
          <span className="summary-toolbar-label">Trip Summary</span>
          <span className="summary-toolbar-hint">Printable A4 view</span>
        </div>
        <div className="summary-toolbar-actions">
          <button className="btn btn-ghost btn-sm" onClick={handlePrint} disabled={items.length === 0}>
            <Printer size={15} /> Print
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDownloadPDF}
            disabled={exporting || items.length === 0}
          >
            {exporting ? <LoadingSpinner /> : <Download size={15} />}
            {exporting ? 'Exporting...' : 'Download PDF'}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleShare}
            disabled={sharing || items.length === 0}
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            {sharing ? <LoadingSpinner white={false} /> : <Share2 size={15} />}
            {sharing ? 'Sharing...' : 'Share PDF'}
          </button>
        </div>
      </div>



      {/* A4 Paper */}
      <div className="a4-stage">
        <div className="a4-paper" ref={pageRef}>

          {/* Document Header */}
          <div className="doc-header">
            <div className="doc-brand">✈ roamly</div>
            <div className="doc-title-block">
              <h1 className="doc-trip-name">{trip.name}</h1>
              <p className="doc-destination">
                <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                {trip.destination}
              </p>
            </div>
            <div className="doc-meta-row">
              <span className="doc-meta-item">
                <Calendar size={12} />
                {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
              </span>
              <span className="doc-meta-item">
                <Users size={12} />
                {trip.travelers} Traveler{trip.travelers !== 1 ? 's' : ''}
              </span>
              <span className="doc-meta-item">
                <Plane size={12} />
                From {trip.originCity} · {trip.transportMode}
              </span>
            </div>
            <div className="doc-header-rule" />
          </div>

          {/* Quick Stats */}
          <div className="doc-stats-row">
            <div className="doc-stat">
              <div className="doc-stat-value">{daysCount}</div>
              <div className="doc-stat-label">Days</div>
            </div>
            <div className="doc-stat-divider" />
            <div className="doc-stat">
              <div className="doc-stat-value">{items.length}</div>
              <div className="doc-stat-label">Activities</div>
            </div>
            <div className="doc-stat-divider" />
            <div className="doc-stat">
              <div className="doc-stat-value">₹{Number(totalCost).toLocaleString('en-IN')}</div>
              <div className="doc-stat-label">Est. Cost / Person</div>
            </div>
            <div className="doc-stat-divider" />
            <div className="doc-stat">
              <div className="doc-stat-value">₹{Number(totalCost * trip.travelers).toLocaleString('en-IN')}</div>
              <div className="doc-stat-label">Total ({trip.travelers} pax)</div>
            </div>
            <div className="doc-stat-divider" />
            <div className="doc-stat">
              <div className="doc-stat-value">{trip.collaborators?.length || 1}</div>
              <div className="doc-stat-label">Collaborators</div>
            </div>
          </div>

          {/* Daily Itinerary */}
          {sortedDays.length === 0 ? (
            <div className="doc-empty">
              <p>No activities yet. Generate an itinerary first to see the summary here.</p>
            </div>
          ) : (
            <div className="doc-body">
              {sortedDays.map((day, dayIdx) => {
                const dayItems = byDay[day].sort((a, b) => {
                  const [ah, am] = a.time.split(':').map(Number)
                  const [bh, bm] = b.time.split(':').map(Number)
                  return ah * 60 + am - (bh * 60 + bm)
                })
                const summaryText = summaries[day] || `A packed day with ${dayItems.length} activities.`
                const dayCost = dayItems.reduce((s, i) => s + i.estimatedCost, 0)

                return (
                  <div key={day} className="doc-day" style={{ marginBottom: '8mm' }}>
                    {/* Day heading */}
                    <div className="doc-day-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3mm' }}>
                      <div className="doc-day-label" style={{ fontFamily: 'var(--font-family)', fontSize: '11pt', fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Day {day}</div>
                      <div className="doc-day-cost" style={{ fontFamily: 'var(--font-family)', fontSize: '8.5pt', color: '#666' }}>
                        Est. ₹{Number(dayCost).toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* AI summary */}
                    <p className="doc-day-summary" style={{ fontFamily: 'Georgia, serif', fontSize: '10pt', color: '#333', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '3mm', paddingLeft: '3mm', borderLeft: '2px solid var(--color-primary)' }}>
                      {summaryText}
                    </p>

                    {/* Short highlights list */}
                    <div className="doc-day-highlights" style={{ fontFamily: 'var(--font-family)', fontSize: '8.5pt', color: '#555', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', lineHeight: 1.4, paddingLeft: '3mm' }}>
                      <strong style={{ color: '#444' }}>Route:</strong>
                      {dayItems.map((item, idx) => (
                        <span key={item.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <span>{CATEGORY_ICONS[item.category] || '📍'}</span>
                          <span style={{ fontWeight: 500, color: '#222' }}>{item.activity}</span>
                          {idx < dayItems.length - 1 && <span style={{ color: '#aaa', margin: '0 4px' }}>→</span>}
                        </span>
                      ))}
                    </div>

                    {dayIdx < sortedDays.length - 1 && <div className="doc-day-rule" />}
                  </div>
                )
              })}
            </div>
          )}

          {/* Footer */}
          <div className="doc-footer">
            <div className="doc-footer-left">Generated by Roamly · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div className="doc-footer-right">roamly.app</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripSummaryView
