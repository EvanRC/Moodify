import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations'
import Layout from './Layout'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const [loginUser, { loading, error }] = useMutation(LOGIN)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser({
        variables: { ...formData },
      })
      navigate('/home')
    } catch (error) {
      console.error('Login failed', error)
      throw new Error('Login failed: ' + error.message)
    }
  }

  return (
    <Layout>
      <div className="main-container">
        <h1 className="button-header">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
