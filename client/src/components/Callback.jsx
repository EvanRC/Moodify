import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Callback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    const codeVerifier = localStorage.getItem('spotifyCodeVerifier')

    if (code) {
      fetch('/api/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          code_verifier: codeVerifier,
        }).toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data received:', data)
          if (data.access_token) {
            console.log('Spotify Access Token:', data.access_token) // Log the token
            localStorage.setItem('spotifyAccessToken', data.access_token)
            navigate('/menu')
          } else {
            console.error('No access token returned from Spotify')
          }
        })
        .catch((error) => {
          console.error('Error during token exchange:', error)
        })
      console.log(code)
    }
  }, [navigate])

  return <div>Loading...</div>
}

export default Callback
