// client/src/components/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <h1 className="button-header">Welcome to Moodify!</h1>
        <div className="button-container">
          <Link to="/signup" className="neon-button">
            Sign Up
          </Link>
          <Link to="/login" className="neon-button">
            Login
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
