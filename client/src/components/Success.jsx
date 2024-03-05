import React from 'react';
import { useNavigate } from 'react-router-dom';
import GetStartedBtn from './GetStartedBtn';

const Success = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/Menu')
    }

    return (
      <div className="success-container">
      <h1>Spotify Authentication Successful!</h1>
      <p>You have successfully authenticated with Spotify.</p>
      <GetStartedBtn onClick={handleGetStarted} />
    </div>
  );
};

export default Success;