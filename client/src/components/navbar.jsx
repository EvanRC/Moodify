import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* {Will add logo soon} */}
            <Link to="/" className="navbar-logo">
                Moodify
            </Link>
            {/* {will add more links as needed} */}
            <div className="navbar-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar; 