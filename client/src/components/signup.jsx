// Signup.jsx
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const history = useHistory()

  const handleSignup = async () => {
    // Perform signup logic
    // On successful signup, obtain JWT token
    const token = 'your_jwt_token_here' // Replace with actual token
    login(token)
    history.push('/home')
  }

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Signup
