const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path')

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')
const authMiddleware = require('./middleware/auth') // Import authentication middleware

const PORT = process.env.PORT || 3006
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startApolloServer = async () => {
  await server.start()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use('/graphql', expressMiddleware(server))

  // Apply authentication middleware to routes that require authentication
  app.get('/protected-route', authMiddleware, (req, res) => {
    // Route logic for authenticated users
  })

  // Serve static files from the client/dist directory
  app.use(express.static(path.join(__dirname, '../client/dist')))

  // Serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    })
  })
}

startApolloServer()
