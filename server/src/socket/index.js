const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')

// Key: tripId, Value: Map of userId → { userName, socketId, color }
const presenceMap = new Map()

const COLORS = ['#E85A1E', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899']

const getPresenceColor = (tripId, userId) => {
  if (!presenceMap.has(tripId)) return COLORS[0]
  const tripUsers = presenceMap.get(tripId)
  if (tripUsers.has(userId)) return tripUsers.get(userId).color
  // Assign next color in cycle
  const idx = tripUsers.size % COLORS.length
  return COLORS[idx]
}

const getPresenceList = (tripId) => {
  if (!presenceMap.has(tripId)) return []
  const tripUsers = presenceMap.get(tripId)
  return Array.from(tripUsers.values()).map(u => ({
    userId: u.userId,
    userName: u.userName,
    color: u.color
  }))
}

const setupSocket = (io) => {
  // Middleware: authenticate every socket connection
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) return next(new Error('Unauthorized'))
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // V1 JWT only has { id } — look up name from DB
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true }
      })
      if (!user) return next(new Error('Unauthorized'))
      socket.userId = user.id
      socket.userName = user.name
      next()
    } catch {
      next(new Error('Unauthorized'))
    }
  })

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.userName} (${socket.id})`)

    // ── join_trip ──────────────────────────────────────────────────────────
    socket.on('join_trip', async ({ tripId }) => {
      try {
        // Verify user is a collaborator
        const collab = await prisma.collaborator.findUnique({
          where: { tripId_userId: { tripId, userId: socket.userId } }
        })
        if (!collab) {
          socket.emit('error', { message: 'Access denied' })
          socket.disconnect()
          return
        }

        socket.join(`trip:${tripId}`)
        socket.currentTripId = tripId

        // Add to presence map
        if (!presenceMap.has(tripId)) presenceMap.set(tripId, new Map())
        const tripUsers = presenceMap.get(tripId)
        const color = getPresenceColor(tripId, socket.userId)
        tripUsers.set(socket.userId, {
          userId: socket.userId,
          userName: socket.userName,
          socketId: socket.id,
          color
        })

        // Broadcast presence update to everyone in room
        io.to(`trip:${tripId}`).emit('presence_update', {
          users: getPresenceList(tripId)
        })

        // Send state snapshot only to this socket
        const trip = await prisma.trip.findUnique({
          where: { id: tripId },
          include: { items: { orderBy: [{ day: 'asc' }, { position: 'asc' }] } }
        })
        if (trip) {
          socket.emit('state_snapshot', { items: trip.items })
        }
      } catch (err) {
        console.error('join_trip error:', err)
      }
    })

    // ── leave_trip ─────────────────────────────────────────────────────────
    socket.on('leave_trip', ({ tripId }) => {
      try {
        socket.leave(`trip:${tripId}`)
        if (presenceMap.has(tripId)) {
          presenceMap.get(tripId).delete(socket.userId)
          if (presenceMap.get(tripId).size === 0) presenceMap.delete(tripId)
        }
        io.to(`trip:${tripId}`).emit('presence_update', {
          users: getPresenceList(tripId)
        })
      } catch (err) {
        console.error('leave_trip error:', err)
      }
    })

    // ── card_updated ───────────────────────────────────────────────────────
    socket.on('card_updated', async ({ tripId, itemId, changes, updatedAt }) => {
      try {
        const allowedFields = ['time', 'activity', 'location', 'durationMinutes', 'estimatedCost', 'category', 'notes']
        const updateData = {}
        for (const field of allowedFields) {
          if (changes[field] !== undefined) updateData[field] = changes[field]
        }
        if (Object.keys(updateData).length > 0) {
          await prisma.itineraryItem.update({ where: { id: itemId }, data: updateData })
        }
        socket.to(`trip:${tripId}`).emit('card_updated', {
          itemId, changes, updatedAt, updatedBy: socket.userName
        })
      } catch (err) {
        console.error('card_updated error:', err)
      }
    })

    // ── card_deleted ───────────────────────────────────────────────────────
    socket.on('card_deleted', async ({ tripId, itemId }) => {
      try {
        await prisma.itineraryItem.delete({ where: { id: itemId } })
        socket.to(`trip:${tripId}`).emit('card_deleted', { itemId })
      } catch (err) {
        console.error('card_deleted error:', err)
      }
    })

    // ── card_reordered ─────────────────────────────────────────────────────
    socket.on('card_reordered', async ({ tripId, itemId, newPosition, newDay }) => {
      try {
        await prisma.itineraryItem.update({
          where: { id: itemId },
          data: { position: newPosition, day: parseInt(newDay) }
        })
        socket.to(`trip:${tripId}`).emit('card_reordered', { itemId, newPosition, newDay })
      } catch (err) {
        console.error('card_reordered error:', err)
      }
    })

    // ── card_added ─────────────────────────────────────────────────────────
    socket.on('card_added', ({ tripId, item }) => {
      try {
        // Item already saved via REST — just sync to other clients
        socket.to(`trip:${tripId}`).emit('card_added', { item })
      } catch (err) {
        console.error('card_added error:', err)
      }
    })

    // ── editing_start ──────────────────────────────────────────────────────
    socket.on('editing_start', ({ tripId, itemId }) => {
      try {
        socket.to(`trip:${tripId}`).emit('editing_start', {
          itemId,
          userName: socket.userName,
          userId: socket.userId
        })
      } catch (err) {
        console.error('editing_start error:', err)
      }
    })

    // ── editing_end ────────────────────────────────────────────────────────
    socket.on('editing_end', ({ tripId, itemId }) => {
      try {
        socket.to(`trip:${tripId}`).emit('editing_end', { itemId })
      } catch (err) {
        console.error('editing_end error:', err)
      }
    })

    // ── cursor_move ────────────────────────────────────────────────────────
    socket.on('cursor_move', ({ tripId, x, y }) => {
      try {
        socket.to(`trip:${tripId}`).emit('cursor_move', {
          userId: socket.userId,
          userName: socket.userName,
          x,
          y
        })
      } catch (err) {
        console.error('cursor_move error:', err)
      }
    })

    // ── disconnect ─────────────────────────────────────────────────────────
    socket.on('disconnect', () => {
      try {
        const tripId = socket.currentTripId
        if (tripId && presenceMap.has(tripId)) {
          presenceMap.get(tripId).delete(socket.userId)
          if (presenceMap.get(tripId).size === 0) presenceMap.delete(tripId)
          io.to(`trip:${tripId}`).emit('presence_update', {
            users: getPresenceList(tripId)
          })
        }
        console.log(`Socket disconnected: ${socket.userName} (${socket.id})`)
      } catch (err) {
        console.error('disconnect error:', err)
      }
    })
  })
}

module.exports = { setupSocket }
