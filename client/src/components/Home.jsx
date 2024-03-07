import React from 'react';
import LoginBtn from './LoginBtn'; 
import Layout from './layout';
import Menu from './Menu'

const Home = () => {
  return (
    
    <div className="home-container">
      <h1 className='button-header'>Login with spotify to get Started!</h1>
      <LoginBtn />
    </div>
  );
};

export default Home;