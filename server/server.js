const express = require('express')
const btoa = (str) => Buffer.from(str).toString('base64')
const path = require('path')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./schemas/User')

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }
`

const resolvers = {
  Query: {
    me: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new Error('You are not authenticated!')
      }
      return currentUser
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password })
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      return { token, user }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username })
        if (!user) {
          throw new Error('No user with that username')
        }
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
          throw new Error('Incorrect password')
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        })
        const redirectUrl = '/spotify'
        console.log('redirurl: ' + redirectUrl)
        return { token, user, redirectUrl }
      } catch (error) {
        throw new Error('Login failed: ' + error.message)
      }
    },
  },
}

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moodify',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB database')
})

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.create({ username, email, password })
    res.status(201).json({ success: true, user })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.post('/login', async (req, res) => {
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

app.post('/api/exchange-token', async (req, res) => {
  const code = req.body.code
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI
  const codeVerifier = req.body.code_verifier

  console.log('spotClientID ' + clientId)
  console.log('spotcode ' + code)
  console.log('spotclientsecret ' + clientSecret)
  console.log('spotRedirURI ' + redirectUri)
  console.log('spotcodeverifier ' + codeVerifier)

  const formData = new URLSearchParams()
  formData.append('grant_type', 'authorization_code')
  formData.append('code', code)
  formData.append('redirect_uri', redirectUri)
  formData.append('code_verifier', codeVerifier)

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      formData.toString(),
      {
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    const data = response.data

    if (data.access_token) {
      res.json({ access_token: data.access_token })
    } else {
      res.status(400).json({ error: 'Failed to exchange token', details: data })
    }
  } catch (error) {
    console.error('Error during token exchange:', error)
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
})

app.post('/api/start-playback', async (req, res) => {
  const accessToken = req.headers.authorization
  const deviceId = req.body.device_id
  const trackUri = req.body.uris

  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        uris: [trackUri],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.status(200).send('Playback started')
  } catch (error) {
    console.error('Error starting playback:', error)
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      console.log('Request Headers:', req.headers) //test
      const token = req.headers.authorization || ''
      try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET)
        return { currentUser }
      } catch (error) {
        return {}
      }
    },
  })

  await server.start()
  server.applyMiddleware({ app })

  const PORT = process.env.PORT || 3005
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startApolloServer()
