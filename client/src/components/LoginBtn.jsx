import React from 'react';

function LoginBtn() {
  const handleLoginClick = () => {
    window.location.href = '/spotify-auth'; // This will change the URL and trigger a page load
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login with Spotify</button>
    </div>
  );
}

export default LoginBtn;