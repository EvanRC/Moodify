// Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations' // Import LOGIN mutation from mutations.js
import Layout from './Layout'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const [loginUser, { loading, error }] = useMutation(LOGIN) // Use LOGIN mutation

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
      // Perform the login operation
      const { data } = await loginUser({
        variables: { ...formData },
      })
      // If login is successful, navigate to /spotify
      navigate('/spotify')
    } catch (error) {
      // If login fails, log the error
      console.error('Login failed', error)

      // Throw an error to handle it elsewhere in the component or application
      throw new Error('Login failed: ' + error.message)
    }
  }
  //   TO BE ADDED
  //   const handleSubmit = async (e) => {
  //     e.preventDefault()
  //     try {
  //       const { data } = await loginUser({
  //         variables: { ...formData },
  //       })
  //       localStorage.setItem('token', data.login.token)
  //       const redirectUrl = data.login.redirectUrl
  //       if (redirectUrl) {
  //         navigate(redirectUrl)
  //       }
  //     } catch (error) {
  //       console.error('Login failed', error)
  //     }
  //   }

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
