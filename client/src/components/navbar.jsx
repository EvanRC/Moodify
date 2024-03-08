import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* {Will add logo soon} */}
      <Link id="main-header" to="/" className="navbar-logo">
        Moodify
      </Link>
      {/* {will add more links as needed} */}
    </nav>
  )
}

export default Navbar
