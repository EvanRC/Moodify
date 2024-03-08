import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client' // Import ApolloClient and InMemoryCache
import Layout from './components/Layout'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Spotify from './components/Spotify'
import Callback from './components/Callback'
import './assets/styles.css'

// Set up Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      {' '}
      {/* Wrap your entire app with ApolloProvider */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/spotify" element={<Spotify />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider>
  )
}

export default App
