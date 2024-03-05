const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./User')

// Function to generate JWT token
const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, 'your-secret-key')
  user.tokens = user.tokens.concat(token)
  await user.save()
  return token
}

// Register user with hashed password
const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 8)
  const user = new User({ username, email, password: hashedPassword })
  await user.save()
  const token = generateAuthToken(user)
  return token
}

// Login user and generate JWT token
const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid login credentials')
  }
  const token = generateAuthToken(user)
  return token
}

module.exports = { registerUser, loginUser }
