import React from 'react'

const COLORS = ['#E85A1E', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899']

const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const getCollaboratorColor = (userId, name, presenceUsers) => {
  const onlineUser = presenceUsers.find(pu => pu.userId === userId)
  if (onlineUser && onlineUser.color) return onlineUser.color
  const str = userId || name || ''
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % COLORS.length
  return COLORS[index]
}

const CollaboratorsList = ({ collaborators = [], presenceUsers = [], currentUserId }) => {
  if (!collaborators || collaborators.length === 0) return null

  const MAX_SHOWN = 5
  // Sort collaborators: online first, then current user, then others
  const sortedCollaborators = [...collaborators].sort((a, b) => {
    const aOnline = presenceUsers.some(pu => pu.userId === a.userId)
    const bOnline = presenceUsers.some(pu => pu.userId === b.userId)
    
    if (aOnline && !bOnline) return -1
    if (!aOnline && bOnline) return 1
    
    const aIsSelf = a.userId === currentUserId
    const bIsSelf = b.userId === currentUserId
    if (aIsSelf && !bIsSelf) return -1
    if (!aIsSelf && bIsSelf) return 1
    
    return a.name.localeCompare(b.name)
  })

  const shown = sortedCollaborators.length > MAX_SHOWN 
    ? sortedCollaborators.slice(0, MAX_SHOWN - 1) 
    : sortedCollaborators
  const overflowCount = sortedCollaborators.length - shown.length

  return (
    <div className="collaborators-list">
      {shown.map(collab => {
        const isOnline = presenceUsers.some(pu => pu.userId === collab.userId)
        const isSelf = collab.userId === currentUserId
        const color = getCollaboratorColor(collab.userId, collab.name, presenceUsers)
        const initials = getInitials(collab.name)
        const roleStr = collab.role ? collab.role.charAt(0).toUpperCase() + collab.role.slice(1) : ''
        
        let titleStr = collab.name
        if (isSelf) titleStr += ' (you)'
        if (roleStr) titleStr += ` • ${roleStr}`
        titleStr += isOnline ? ' • Online' : ' • Offline'

        return (
          <div 
            key={collab.userId || collab.email || collab.id} 
            className="collaborator-avatar-wrapper"
            title={titleStr}
          >
            <div 
              className={`collaborator-avatar ${isOnline ? 'online' : 'offline'}`}
              style={{
                backgroundColor: color,
                borderWidth: isSelf ? '2.5px' : '2px',
                boxShadow: isSelf && isOnline ? `0 0 0 2px ${color}` : 'none'
              }}
            >
              {initials}
            </div>
            <span className={`collaborator-status-dot ${isOnline ? 'online' : 'offline'}`} />
          </div>
        )
      })}
      {overflowCount > 0 && (
        <div className="collaborator-avatar-wrapper" title={`${overflowCount} more collaborator${overflowCount > 1 ? 's' : ''}`}>
          <div className="collaborator-avatar collaborators-overflow">
            +{overflowCount}
          </div>
        </div>
      )}
    </div>
  )
}

export default CollaboratorsList
