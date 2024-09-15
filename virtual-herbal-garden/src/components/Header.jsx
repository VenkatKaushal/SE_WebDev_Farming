import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const isLoggedIn = false; // Placeholder, replace with actual authentication logic

  return (
    <header className="header">
      <h1>Virtual Herbal Garden</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/research">Research</Link>
        {isLoggedIn ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
