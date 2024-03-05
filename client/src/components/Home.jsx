import React from 'react'
import LoginBtn from './LoginBtn'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Moodify!</h1>
      <p>
        Moodify is a fantastic app that helps you discover music based on your
        mood. Login now to start exploring!
      </p>
      <LoginBtn />
    </div>
  )
}

export default Home
