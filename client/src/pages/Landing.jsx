import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Users, ShieldCheck, MapPin } from 'lucide-react'

const Landing = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-logo">Roamly</span>
        <div className="navbar-right">
          <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={14} />
            AI-Powered Trip Planning
          </div>
          <h1 className="hero-headline">
            Plan smarter.<br />
            <span>Travel better.</span>
          </h1>
          <p className="hero-subheadline">
            Describe your dream trip in plain text. Roamly's AI generates a structured day-wise itinerary, validates travel times, and keeps your budget on track — all in real time.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started — it's free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="features-heading">Everything you need to plan the perfect trip</h2>
        <div className="features-grid">
          <div className="card feature-card">
            <div className="feature-icon">
              <Sparkles size={22} />
            </div>
            <div className="feature-title">AI Itinerary</div>
            <p className="feature-desc">
              Describe your trip in plain text. Roamly's AI (Gemini 2.0 Flash) generates a complete, day-by-day itinerary tailored to your travel style, budget, and preferences.
            </p>
          </div>

          <div className="card feature-card">
            <div className="feature-icon">
              <Users size={22} />
            </div>
            <div className="feature-title">Live Collaboration</div>
            <p className="feature-desc">
              Share a link with your travel companions. Everyone can view and edit the itinerary together. No sign-up required to preview — just click and join.
            </p>
          </div>

          <div className="card feature-card">
            <div className="feature-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="feature-title">Smart Validation</div>
            <p className="feature-desc">
              Roamly automatically validates travel times between each stop using Google's Distance Matrix API and flags timing conflicts in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Roamly — Plan smarter. Travel better. © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default Landing
