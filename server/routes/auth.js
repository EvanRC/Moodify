const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../schemas/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.create({ username, email, password })
    res.status(201).json({ success: true, user })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid credentials' })
    }
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
    res.json({ success: true, token })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router
