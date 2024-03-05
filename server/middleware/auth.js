// server/middleware/auth.js
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Using JWT secret key from environment variable
    // Attach user data to request for further processing
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

module.exports = authMiddleware
