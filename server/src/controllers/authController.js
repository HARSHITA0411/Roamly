const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')


const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const register = async (req, res) => {
  try {
    const { name, email, password, travelStyle, pace, budgetRange } = req.body

    if (!name) return res.status(400).json({ error: 'name is required' })
    if (!email) return res.status(400).json({ error: 'email is required' })
    if (!password) return res.status(400).json({ error: 'password is required' })
    if (!travelStyle) return res.status(400).json({ error: 'travelStyle is required' })
    if (!pace) return res.status(400).json({ error: 'pace is required' })
    if (!budgetRange) return res.status(400).json({ error: 'budgetRange is required' })

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already in use' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, travelStyle, pace, budgetRange }
    })

    const token = signToken(user.id)
    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json({ token, user: userWithoutPassword })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ error: 'email is required' })
    if (!password) return res.status(400).json({ error: 'password is required' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = signToken(user.id)
    const { password: _, ...userWithoutPassword } = user

    return res.json({ token, user: userWithoutPassword })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, travelStyle: true, pace: true, budgetRange: true, currency: true, distanceUnit: true, theme: true, emailAlerts: true, createdAt: true }
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    return res.json({ user })
  } catch (err) {
    console.error('Me error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, travelStyle, pace, budgetRange, currency, distanceUnit, theme, emailAlerts, password } = req.body
    
    const updateData = {}
    if (name) updateData.name = name
    if (travelStyle) updateData.travelStyle = travelStyle
    if (pace) updateData.pace = pace
    if (budgetRange) updateData.budgetRange = budgetRange
    if (currency !== undefined) updateData.currency = currency
    if (distanceUnit !== undefined) updateData.distanceUnit = distanceUnit
    if (theme !== undefined) updateData.theme = theme
    if (emailAlerts !== undefined) updateData.emailAlerts = emailAlerts
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: { id: true, email: true, name: true, travelStyle: true, pace: true, budgetRange: true, currency: true, distanceUnit: true, theme: true, emailAlerts: true, createdAt: true }
    })
    
    return res.json({ user })
  } catch (err) {
    console.error('Update profile error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = { register, login, me, updateProfile }
