import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Landing from './components/Landing'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Callback from './components/Callback'
import Menu from './components/Menu'
import Layout from './components/Layout'
import './assets/styles.css'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider>
  )
}

export default App
