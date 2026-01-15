import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import LoadingSpinner from '../components/LoadingSpinner'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ email: '', password: '' })

  const redirect = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    if (isAuthenticated) navigate(redirect, { replace: true })
  }, [isAuthenticated])

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    if (!form.password) errs.password = 'Password is required'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await authAPI.login(form)
      login(res.data.token, res.data.user)
      addToast('Welcome back! 👋', 'success')
      navigate(redirect, { replace: true })
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed'
      addToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-logo">Roamly</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">Email address</label>
            <input
              id="login-email"
              type="email"
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="alex@example.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              id="login-password"
              type="password"
              className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder="Your password"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button
            id="login-submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 8 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Sign In'}
          </button>
        </div>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
