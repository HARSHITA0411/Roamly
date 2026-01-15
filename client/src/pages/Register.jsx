import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const TRAVEL_STYLES = [
  { value: 'adventure', label: '🏔️ Adventure' },
  { value: 'relaxed', label: '🌴 Relaxed' },
  { value: 'cultural', label: '🏛️ Cultural' },
]

const PACE_OPTIONS = [
  { value: 'packed', label: '⚡ Packed days' },
  { value: 'light', label: '☁️ Light days' },
]

const BUDGET_OPTIONS = [
  { value: 'budget', label: '💰 Budget' },
  { value: 'mid-range', label: '💳 Mid-range' },
  { value: 'premium', label: '✨ Premium' },
]

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addToast } = useToast()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: '', email: '', password: '',
    travelStyle: '', pace: '', budgetRange: ''
  })

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateStep1 = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs = {}
    if (!form.travelStyle) errs.travelStyle = 'Please select a travel style'
    if (!form.pace) errs.pace = 'Please select a pace'
    if (!form.budgetRange) errs.budgetRange = 'Please select a budget'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return
    setLoading(true)
    try {
      const res = await authAPI.register(form)
      login(res.data.token, res.data.user)
      addToast('Welcome to Roamly! 🎉', 'success')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed'
      addToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-logo">Roamly</div>

        <div className="step-indicator">
          <div className={`step-dot ${step === 1 ? 'active' : ''}`} />
          <div className={`step-dot ${step === 2 ? 'active' : ''}`} />
        </div>

        {step === 1 ? (
          <>
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">Start planning your next adventure</p>

            <div className="auth-form">
              <div className="input-group">
                <label className="input-label">Full name</label>
                <input
                  id="register-name"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  placeholder="Alex Kumar"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNext()}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Email address</label>
                <input
                  id="register-email"
                  type="email"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNext()}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  id="register-password"
                  type="password"
                  className={`input ${errors.password ? 'input-error' : ''}`}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNext()}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={handleNext}>
                Next <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="auth-title">Your travel preferences</h1>
            <p className="auth-subtitle">Help us personalize your itineraries</p>

            <div className="auth-form">
              <div className="input-group">
                <label className="input-label">Travel style</label>
                <div className="option-group">
                  {TRAVEL_STYLES.map(opt => (
                    <button
                      key={opt.value}
                      className={`option-btn ${form.travelStyle === opt.value ? 'selected' : ''}`}
                      onClick={() => set('travelStyle', opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.travelStyle && <span className="field-error">{errors.travelStyle}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Pace preference</label>
                <div className="option-group">
                  {PACE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`option-btn ${form.pace === opt.value ? 'selected' : ''}`}
                      onClick={() => set('pace', opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.pace && <span className="field-error">{errors.pace}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Budget range</label>
                <div className="option-group">
                  {BUDGET_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`option-btn ${form.budgetRange === opt.value ? 'selected' : ''}`}
                      onClick={() => set('budgetRange', opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.budgetRange && <span className="field-error">{errors.budgetRange}</span>}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  id="register-submit"
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : 'Create Account'}
                </button>
              </div>
            </div>
          </>
        )}

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
