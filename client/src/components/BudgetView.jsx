import React from 'react'
import {
  PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts'

const CATEGORY_ORDER = ['outdoor', 'food', 'transport', 'culture', 'accommodation']
const CATEGORY_COLORS = {
  outdoor: '#22C55E',
  food: '#F59E0B',
  transport: '#3B82F6',
  culture: '#8B5CF6',
  accommodation: '#EC4899'
}

const formatINR = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: '1px solid #EEEEEE', borderRadius: 8,
      padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <div style={{ fontWeight: 600, textTransform: 'capitalize', marginBottom: 4 }}>{payload[0].name}</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{formatINR(payload[0].value)}</div>
    </div>
  )
}

const BudgetView = ({ items, trip }) => {
  const totalCost = items.reduce((sum, i) => sum + i.estimatedCost, 0)
  const costPerPerson = totalCost
  const travelers = trip?.travelers || 1

  // Build category data
  const categoryData = CATEGORY_ORDER.map(cat => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: items.filter(i => i.category === cat).reduce((s, i) => s + i.estimatedCost, 0),
    color: CATEGORY_COLORS[cat] || '#FF6B2C'
  })).filter(d => d.value > 0)

  return (
    <div className="budget-container">
      {/* Totals */}
      <div className="budget-totals">
        <div className="card budget-total-card">
          <div className="budget-total-label">Total estimated cost (per person)</div>
          <div className="budget-total-value">{formatINR(totalCost)}</div>
        </div>
        <div className="card budget-total-card">
          <div className="budget-total-label">Total for {travelers} traveler{travelers > 1 ? 's' : ''}</div>
          <div className="budget-total-value">{formatINR(totalCost * travelers)}</div>
        </div>
      </div>

      <div className="budget-landscape-layout">
        {/* Chart */}
        {categoryData.length > 0 && (
          <div className="card budget-chart">
            <div className="budget-chart-title">Spend by Category</div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table */}
        {items.length > 0 && (
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Day</th>
                  <th>Category</th>
                  <th style={{ textAlign: 'right' }}>Cost/person</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORY_ORDER.map(category => {
                  const categoryItems = items
                    .filter(item => item.category === category)
                    .sort((a, b) => a.day - b.day || a.position - b.position)
                  
                  if (categoryItems.length === 0) return null

                  return (
                    <React.Fragment key={category}>
                      <tr style={{ backgroundColor: 'var(--color-hero-tint)' }}>
                        <td colSpan={4} style={{ padding: '12px 14px', fontWeight: 700 }}>
                          <span className={`badge badge-${category}`} style={{ fontSize: '12px' }}>
                            {category} Section
                          </span>
                        </td>
                      </tr>
                      {categoryItems.map(item => (
                        <tr key={item.id}>
                          <td style={{ paddingLeft: '24px' }}>{item.activity}</td>
                          <td>Day {item.day}</td>
                          <td>
                            <span className={`badge badge-${item.category}`}>{item.category}</span>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 500 }}>{formatINR(item.estimatedCost)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                })}
                <tr className="total-row">
                  <td colSpan={3} style={{ fontWeight: 700 }}>Total</td>
                  <td style={{ textAlign: 'right', color: 'var(--color-primary)', fontSize: 16 }}>{formatINR(totalCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--color-text-secondary)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💰</div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8 }}>No budget data yet</div>
          <div style={{ fontSize: 14 }}>Generate an itinerary to see budget breakdown</div>
        </div>
      )}
    </div>
  )
}

export default BudgetView
