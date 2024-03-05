// client/src/components/Login.jsx
import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username, password })
      const { token } = response.data
      // Store token in local storage
      localStorage.setItem('token', token)
      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
