import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const useSocket = (tripId) => {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!tripId) return

    const token = localStorage.getItem('roamly_token')
    if (!token) return

    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    })

    socketRef.current = socket

    socket.on('connect', () => {
      socket.emit('join_trip', { tripId })
    })

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message)
    })

    return () => {
      if (socket.connected) {
        socket.emit('leave_trip', { tripId })
      }
      socket.disconnect()
      socketRef.current = null
    }
  }, [tripId])

  return socketRef.current
}

export default useSocket
