import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { authAPI } from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import Modal from '../components/Modal'
import { ArrowLeft, Save, Lock, LogOut } from 'lucide-react'

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

const Settings = () => {
  const navigate = useNavigate()
  const { user, setUser, logout } = useAuth()
  const { addToast } = useToast()

  const [saving, setSaving] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    travelStyle: '',
    pace: '',
    budgetRange: '',
    currency: 'INR',
    distanceUnit: 'km',
    theme: 'light',
    emailAlerts: true,
    password: ''
  })
  
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        travelStyle: user.travelStyle || '',
        pace: user.pace || '',
        budgetRange: user.budgetRange || '',
        currency: user.currency || 'INR',
        distanceUnit: user.distanceUnit || 'km',
        theme: user.theme || 'light',
        emailAlerts: user.emailAlerts ?? true,
        password: '' // empty by default
      })
    }
  }, [user])

  useEffect(() => {
    const applyTheme = (themeName) => {
      const root = document.documentElement
      root.classList.remove('light-theme', 'dark-theme')
      
      let resolvedTheme = themeName || 'light'
      if (resolvedTheme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        resolvedTheme = systemPrefersDark ? 'dark' : 'light'
      }
      
      if (resolvedTheme === 'dark') {
        root.classList.add('dark-theme')
      } else {
        root.classList.add('light-theme')
      }
    }

    if (form.theme) {
      applyTheme(form.theme)
    }

    return () => {
      if (user) {
        applyTheme(user.theme || 'light')
      }
    }
  }, [form.theme, user])

  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!form.name.trim()) return addToast('Name is required', 'error')
    
    setSaving(true)
    try {
      const res = await authAPI.updateProfile({
        name: form.name,
        travelStyle: form.travelStyle,
        pace: form.pace,
        budgetRange: form.budgetRange,
        currency: form.currency,
        distanceUnit: form.distanceUnit,
        theme: form.theme,
        emailAlerts: form.emailAlerts,
        ...(form.password ? { password: form.password } : {})
      })
      setUser(res.data.user)
      addToast('Settings saved successfully! ✅', 'success')
      setField('password', '') // clear password field
      setShowPasswordChange(false) // collapse password field on save
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update settings'
      addToast(msg, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="settings-page">
      <Navbar />
      
      <div className="settings-container">
        <div className="settings-header">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ padding: '8px' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="settings-title">Account Settings</h1>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">Personal Details</h2>
          <div className="auth-form" style={{ maxWidth: 400 }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                className="input"
                value={form.name}
                onChange={e => setField('name', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                className="input"
                disabled
                value={form.email}
                style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)', cursor: 'not-allowed' }}
                title="Email cannot be changed"
              />
            </div>

            {!showPasswordChange ? (
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ width: 'fit-content', marginTop: 8 }}
                onClick={() => setShowPasswordChange(true)}
              >
                <Lock size={14} /> Change password
              </button>
            ) : (
              <div className="input-group" style={{ marginTop: 8 }}>
                <label className="input-label">New Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={e => setField('password', e.target.value)}
                />
                <button 
                  className="btn btn-ghost btn-sm" 
                  style={{ width: 'fit-content', marginTop: 4, padding: 0 }}
                  onClick={() => { setShowPasswordChange(false); setField('password', '') }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">Travel Preferences</h2>
          <div className="auth-form">
            <div className="input-group">
              <label className="input-label">Travel style</label>
              <div className="option-group">
                {TRAVEL_STYLES.map(opt => (
                  <button
                    key={opt.value}
                    className={`option-btn ${form.travelStyle === opt.value ? 'selected' : ''}`}
                    onClick={() => setField('travelStyle', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Pace preference</label>
              <div className="option-group">
                {PACE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`option-btn ${form.pace === opt.value ? 'selected' : ''}`}
                    onClick={() => setField('pace', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Budget range</label>
              <div className="option-group">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`option-btn ${form.budgetRange === opt.value ? 'selected' : ''}`}
                    onClick={() => setField('budgetRange', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">App Preferences</h2>
          <div className="auth-form">
            <div className="input-group">
              <label className="input-label">Currency</label>
              <div className="option-group">
                {[{value: 'INR', label: '₹ INR'}, {value: 'USD', label: '$ USD'}, {value: 'EUR', label: '€ EUR'}].map(opt => (
                  <button key={opt.value} className={`option-btn ${form.currency === opt.value ? 'selected' : ''}`} onClick={() => setField('currency', opt.value)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">Distance Unit</label>
              <div className="option-group">
                {[{value: 'km', label: 'Kilometers'}, {value: 'mi', label: 'Miles'}].map(opt => (
                  <button key={opt.value} className={`option-btn ${form.distanceUnit === opt.value ? 'selected' : ''}`} onClick={() => setField('distanceUnit', opt.value)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Theme</label>
              <div className="option-group">
                {[{value: 'light', label: 'Light'}, {value: 'dark', label: 'Dark'}, {value: 'system', label: 'System'}].map(opt => (
                  <button key={opt.value} className={`option-btn ${form.theme === opt.value ? 'selected' : ''}`} onClick={() => setField('theme', opt.value)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <input type="checkbox" id="emailAlerts" checked={form.emailAlerts} onChange={e => setField('emailAlerts', e.target.checked)} style={{ width: 16, height: 16 }} />
              <label htmlFor="emailAlerts" className="input-label" style={{ margin: 0, cursor: 'pointer' }}>Receive email notifications for upcoming trips</label>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button 
            className="btn btn-primary btn-lg" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <LoadingSpinner /> : <><Save size={18} /> Save Settings</>}
          </button>
        </div>

        <div className="settings-section" style={{ borderColor: 'var(--color-error)', backgroundColor: 'var(--color-error-bg)', marginTop: 'var(--space-4)' }}>
          <h2 className="settings-section-title" style={{ color: 'var(--color-error)', borderBottomColor: 'var(--color-error)' }}>Account Actions</h2>
          <button 
            className="btn btn-danger" 
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>

      </div>

      <Modal 
        isOpen={showLogoutConfirm} 
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Log Out"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => { setShowLogoutConfirm(false); logout(); navigate('/') }}>Log Out</button>
          </>
        }
      >
        <div style={{ padding: 'var(--space-2) 0' }}>
          <p>Are you sure you want to log out of your account?</p>
        </div>
      </Modal>
    </div>
  )
}

export default Settings
