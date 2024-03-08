import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link id='main-header' to="/" className="navbar-logo">
                Moodify
            </Link>
        </nav>
    );
};

export default Navbar; 