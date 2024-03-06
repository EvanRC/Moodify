import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    
    if (code) {
      fetch('/api/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ code }).toString()
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('spotifyAccessToken', data.access_token);
          navigate('/menu');
        } else {
          console.error('No access token returned from Spotify');
          alert('An error occurred while logging in to Spotify. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error during token exchange:', error);
        alert('An error occurred while logging in to Spotify. Please try again.');
      });
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;