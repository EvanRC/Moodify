// Import necessary modules
const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path')

// Import your schemas, database connection, and authentication middleware
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')
const authMiddleware = require('./middleware/auth')

// Define the port number
const PORT = process.env.PORT || 3006

// Create an Express app
const app = express()

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Function to redirect to the login page
const redirectToLogin = (req, res) => {
  res.redirect('/login.html')
}

// Function to handle signup logic
const handleSignup = async (req, res) => {
  try {
    // Extract signup form data from the request body
    const { username, email, password } = req.body

    // Perform signup logic here (e.g., create a new user in the database)

    // After successful signup, redirect to the login page
    redirectToLogin(req, res)
  } catch (error) {
    // Handle errors (e.g., if signup fails)
    console.error('Signup failed:', error)
    res.status(500).send('Signup failed. Please try again later.')
  }
}

// Start the Apollo Server
const startApolloServer = async () => {
  await server.start()

  // Configure Express middleware
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/graphql', expressMiddleware(server))

  // Serve static files from the client directory
  app.use(express.static(path.join(__dirname, '../client')))

  // Route all requests to index.html if user is authenticated
  app.get('*', (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      // Redirect to the signup page if not logged in
      return res.redirect('/signup.html')
    }
    // User is authenticated, proceed to the next middleware
    next()
  })

  // Route for handling signup form submission
  app.post('/signup', handleSignup)

  // Start the Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    })
  })
}

// Start the Apollo Server and Express server
startApolloServer()
