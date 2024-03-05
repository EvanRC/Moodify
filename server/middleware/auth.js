const jwt = require('jsonwebtoken')
const User = require('../models/User') // Adjusted path to User.js

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'your-secret-key')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = authMiddleware
