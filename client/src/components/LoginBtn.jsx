
import React from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/auth';

const LoginBtn = () => {
  // Spotify auth logic
  const handleLoginClick = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scope = 'user-read-private user-read-email';
    
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    
    sessionStorage.setItem('spotify_verifier', verifier);

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&code_challenge_method=S256&code_challenge=${challenge}`;
    
    window.location.href = authUrl; // Redirects user directly to Spotify's authorization page
  };

  return (
    <div className='button-container'>
      <button className="neon-button" onClick={handleLoginClick}>Login with Spotify</button>
    </div>
  );
};

export default LoginBtn;