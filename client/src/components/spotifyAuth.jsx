import React from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/auth';

const SpotifyAuth = () => {
  const handleLogin = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const scope = 'user-read-private user-read-email';
    
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    
    sessionStorage.setItem('spotify_verifier', verifier);

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&code_challenge_method=S256&code_challenge=${challenge}`;
    
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyAuth;