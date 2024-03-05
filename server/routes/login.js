const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

// POST /login - User login endpoint
router.post('/login', async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    // If password does not match, return error
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    })

    // Return token and user data
    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email /* Add other user data here if needed */,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
