const PDFDocument = require('pdfkit')

const CATEGORY_COLORS = {
  outdoor: '#22C55E',
  food: '#F59E0B',
  transport: '#3B82F6',
  culture: '#8B5CF6',
  accommodation: '#EC4899'
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}

const generatePDF = (trip, items, res, savedHotels = []) => {
  const doc = new PDFDocument({ margin: 48, size: 'A4' })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="roamly-${trip.name.replace(/\s+/g, '-').toLowerCase()}.pdf"`)

  doc.pipe(res)

  // Header
  doc
    .fillColor('#FF6B2C')
    .fontSize(24)
    .font('Helvetica-Bold')
    .text('Roamly', 48, 48)

  doc
    .fillColor('#1A1A1A')
    .fontSize(20)
    .font('Helvetica-Bold')
    .text(trip.name, 48, 84)

  doc
    .fillColor('#666666')
    .fontSize(11)
    .font('Helvetica')
    .text(`${trip.destination}  •  ${formatDate(trip.startDate)} — ${formatDate(trip.endDate)}  •  ${trip.travelers} traveler${trip.travelers > 1 ? 's' : ''}`, 48, 112)

  doc
    .fillColor('#666666')
    .fontSize(10)
    .text(`From ${trip.originCity} by ${trip.transportMode}  •  ~${trip.estimatedTravelHours}h travel`, 48, 130)

  // Divider
  doc.moveTo(48, 148).lineTo(548, 148).strokeColor('#EEEEEE').lineWidth(1).stroke()

  // Group items by day
  const byDay = {}
  for (const item of items) {
    if (!byDay[item.day]) byDay[item.day] = []
    byDay[item.day].push(item)
  }
  const days = Object.keys(byDay).map(Number).sort((a, b) => a - b)

  // Total cost
  const totalCost = items.reduce((sum, i) => sum + i.estimatedCost, 0)
  const costPerPerson = totalCost

  let y = 160

  // Summary box
  doc.rect(48, y, 500, 36).fillColor('#FFF8F5').fill()
  doc
    .fillColor('#FF6B2C')
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(`Total Estimated Cost: ${formatCurrency(totalCost)} per person  •  ${items.length} activities across ${days.length} day${days.length > 1 ? 's' : ''}`, 60, y + 12)

  y += 52

  for (const day of days) {
    const dayItems = byDay[day].sort((a, b) => {
      const [ah, am] = a.time.split(':').map(Number)
      const [bh, bm] = b.time.split(':').map(Number)
      return ah * 60 + am - (bh * 60 + bm)
    })

    // Day header
    if (y > 720) { doc.addPage(); y = 48 }

    doc
      .fillColor('#FF6B2C')
      .fontSize(13)
      .font('Helvetica-Bold')
      .text(`Day ${day}`, 48, y)

    y += 20

    for (const item of dayItems) {
      if (y > 700) { doc.addPage(); y = 48 }

      // Card background
      doc.rect(48, y, 500, item.hasTimingConflict ? 72 : 56).fillColor('#F9F9F9').fill()
      doc.rect(48, y, 3, item.hasTimingConflict ? 72 : 56).fillColor('#FF6B2C').fill()

      // Time
      doc
        .fillColor('#FF6B2C')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text(item.time, 58, y + 8)

      // Activity name
      doc
        .fillColor('#1A1A1A')
        .fontSize(11)
        .font('Helvetica-Bold')
        .text(item.activity, 100, y + 8, { width: 300 })

      // Category badge
      doc
        .fillColor('#666666')
        .fontSize(8)
        .font('Helvetica')
        .text(item.category.toUpperCase(), 440, y + 10)

      // Location
      doc
        .fillColor('#666666')
        .fontSize(9)
        .font('Helvetica')
        .text(`📍 ${item.location}`, 100, y + 26, { width: 340 })

      // Duration + cost
      doc
        .fillColor('#666666')
        .fontSize(9)
        .text(`${item.durationMinutes} min  •  ${formatCurrency(item.estimatedCost)} per person`, 100, y + 40)

      // Conflict warning
      if (item.hasTimingConflict) {
        doc
          .fillColor('#F59E0B')
          .fontSize(8)
          .font('Helvetica-Bold')
          .text(`⚠ Travel from previous stop takes ${item.travelTimeFromPrevious} min — check your timing`, 58, y + 56, { width: 480 })
      }

      y += item.hasTimingConflict ? 80 : 64
    }

    y += 8
  }

  // Accommodation section (saved hotels)
  if (savedHotels && savedHotels.length > 0) {
    if (y > 680) { doc.addPage(); y = 48 }
    doc.moveTo(48, y).lineTo(548, y).strokeColor('#EEEEEE').lineWidth(1).stroke()
    y += 12
    doc
      .fillColor('#FF6B2C')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Accommodation', 48, y)
    y += 20

    for (const hotel of savedHotels) {
      if (y > 700) { doc.addPage(); y = 48 }
      doc.rect(48, y, 500, 70).fillColor('#F9F9F9').fill()
      doc.rect(48, y, 3, 70).fillColor('#3B82F6').fill()

      doc
        .fillColor('#1A1A1A')
        .fontSize(11)
        .font('Helvetica-Bold')
        .text(hotel.name, 58, y + 8, { width: 440 })

      doc
        .fillColor('#666666')
        .fontSize(9)
        .font('Helvetica')
        .text(`📍 ${hotel.address}`, 58, y + 24, { width: 440 })

      const checkin = new Date(hotel.checkinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      const checkout = new Date(hotel.checkoutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      const ratingStr = hotel.rating ? `  ★ ${hotel.rating}` : ''
      const priceStr = hotel.priceRange ? `  •  ${hotel.priceRange}` : ''

      doc
        .fillColor('#666666')
        .fontSize(9)
        .text(`${hotel.zone}  •  Check-in: ${checkin}  →  Check-out: ${checkout}${ratingStr}${priceStr}`, 58, y + 40, { width: 440 })

      y += 78
    }
  }

  // Footer
  if (y > 750) { doc.addPage(); y = 48 }
  doc
    .fillColor('#CCCCCC')
    .fontSize(8)
    .font('Helvetica')
    .text('Generated by Roamly — plan smarter, travel better.', 48, y + 16, { align: 'center', width: 500 })

  doc.end()
}

const generateSummaryPDF = (trip, items, res) => {
  const doc = new PDFDocument({ margin: 48, size: 'A4' })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="roamly-${trip.name.replace(/\s+/g, '-').toLowerCase()}-summary.pdf"`)

  doc.pipe(res)

  // Header
  doc
    .fillColor('#FF6B2C')
    .fontSize(24)
    .font('Helvetica-Bold')
    .text('Roamly Trip Summary', 48, 48)

  doc
    .fillColor('#1A1A1A')
    .fontSize(20)
    .font('Helvetica-Bold')
    .text(trip.name, 48, 84)

  doc
    .fillColor('#666666')
    .fontSize(11)
    .font('Helvetica')
    .text(`${trip.destination}  •  ${formatDate(trip.startDate)} — ${formatDate(trip.endDate)}  •  ${trip.travelers} traveler${trip.travelers > 1 ? 's' : ''}`, 48, 112)

  // Divider
  doc.moveTo(48, 130).lineTo(548, 130).strokeColor('#EEEEEE').lineWidth(1).stroke()

  // Group items by day
  const byDay = {}
  for (const item of items) {
    if (!byDay[item.day]) byDay[item.day] = []
    byDay[item.day].push(item)
  }
  const days = Object.keys(byDay).map(Number).sort((a, b) => a - b)

  const totalCost = items.reduce((sum, i) => sum + i.estimatedCost, 0)

  let y = 148

  // Summary stats
  doc.rect(48, y, 500, 36).fillColor('#FFF8F5').fill()
  doc
    .fillColor('#FF6B2C')
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(`Total Estimated Cost: ${formatCurrency(totalCost)} per person  •  ${items.length} activities across ${days.length} day${days.length > 1 ? 's' : ''}`, 60, y + 12)

  y += 52

  // Summaries
  const aiSummaries = trip.dailySummaries || {}

  for (const day of days) {
    const dayItems = byDay[day].sort((a, b) => {
      const [ah, am] = a.time.split(':').map(Number)
      const [bh, bm] = b.time.split(':').map(Number)
      return ah * 60 + am - (bh * 60 + bm)
    })

    if (y > 700) { doc.addPage(); y = 48 }

    // Day Header
    doc
      .fillColor('#FF6B2C')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(`Day ${day}`, 48, y)
      
    y += 20

    // AI summary
    const summaryText = aiSummaries[day] || `A packed day with ${dayItems.length} activities.`
    doc
      .fillColor('#1A1A1A')
      .fontSize(11)
      .font('Helvetica-Oblique')
      .text(summaryText, 48, y, { width: 500, lineGap: 2 })

    // Measure height taken by summary text
    const textHeight = doc.heightOfString(summaryText, { width: 500 })
    y += textHeight + 10

    // Sequential list of activities
    let activitiesStr = dayItems.map(i => i.activity).join('  →  ')
    doc
      .fillColor('#666666')
      .fontSize(10)
      .font('Helvetica')
      .text(activitiesStr, 48, y, { width: 500, lineGap: 4 })

    const listHeight = doc.heightOfString(activitiesStr, { width: 500 })
    y += listHeight + 24
  }

  // Footer
  if (y > 750) { doc.addPage(); y = 48 }
  doc
    .fillColor('#CCCCCC')
    .fontSize(8)
    .font('Helvetica')
    .text('Generated by Roamly — plan smarter, travel better.', 48, y + 16, { align: 'center', width: 500 })

  doc.end()
}

module.exports = { generatePDF, generateSummaryPDF }
