import React from 'react'
import { useAuth } from '../context/AuthContext'

const PresenceBar = ({ presenceUsers, currentUserId }) => {
  if (!presenceUsers || presenceUsers.length === 0) return null

  const MAX_SHOWN = 5
  const shown = presenceUsers.slice(0, MAX_SHOWN - 1)
  const overflow = presenceUsers.length - shown.length

  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return (
    <div className="presence-bar">
      <span className="presence-label">Online now:</span>
      <div className="presence-avatars">
        {shown.map(u => (
          <div
            key={u.userId}
            className="presence-avatar"
            style={{
              backgroundColor: u.color,
              border: u.userId === currentUserId ? '2.5px solid white' : '2px solid #EEEEEE',
              boxShadow: u.userId === currentUserId ? `0 0 0 2px ${u.color}` : 'none'
            }}
            title={u.userId === currentUserId ? `${u.userName} (you)` : u.userName}
          >
            {getInitials(u.userName)}
          </div>
        ))}
        {overflow > 0 && (
          <div
            className="presence-avatar presence-avatar-overflow"
            title={`${overflow} more collaborator${overflow > 1 ? 's' : ''}`}
          >
            +{overflow}
          </div>
        )}
      </div>
    </div>
  )
}

export default PresenceBar
