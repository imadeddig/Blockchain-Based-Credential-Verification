import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🔗</span>
          <span className="logo-text">VeriChain</span>
        </div>
        
        <div className="navbar-links">
          <a href="#verify" className="nav-link">Verify</a>
          <a href="#my-credentials" className="nav-link">My Credentials</a>
          <a href="#institutions" className="nav-link">For Institutions</a>
          <a href="#students" className="nav-link">For Students</a>
        </div>
        
        <button className="connect-wallet-btn">Connect Wallet</button>
      </div>
    </nav>
  );
};

export default Navbar;
