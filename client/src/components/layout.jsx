import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import ParticlesComponent from './ParticlesComponent'
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-container">
        {children}
        {<ParticlesComponent />}
      </main>
      <Footer />
    </>
  )
}

export default Layout
