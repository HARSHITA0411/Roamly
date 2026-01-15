import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">Roamly</Link>
      {user && (
        <div className="navbar-right">
          <span style={{ fontSize: 14, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            {user.name}
          </span>
          <Link to="/settings" className="avatar" title="Profile & Settings">
            {getInitials(user.name)}
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
