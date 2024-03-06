import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      <h2>Welcome Home</h2>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in or sign up.</p>
      )}
    </div>
  )
}

export default Home
