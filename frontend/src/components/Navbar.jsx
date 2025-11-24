import React, { useState, useEffect } from 'react';
import { connectWallet, getWalletAddress, onAccountsChanged } from '../utils/web3';
import '../styles/Navbar.css';

const Navbar = ({ onWalletConnect }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Listen for account changes
    onAccountsChanged((address) => {
      setWalletAddress(address);
      if (onWalletConnect) {
        onWalletConnect(address);
      }
    });
  }, [onWalletConnect]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const { address, network, chainId } = await connectWallet();
      setWalletAddress(address);
      if (onWalletConnect) {
        onWalletConnect(address, network, chainId);
      }
      alert(`✅ Wallet connected successfully!\nNetwork: ${network} (${chainId})`);
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  };

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
          <a href="#issue" className="nav-link">For Institutions</a>
          <a href="#students" className="nav-link">For Students</a>
        </div>
        
        <button 
          className="connect-wallet-btn" 
          onClick={handleConnectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : walletAddress ? formatAddress(walletAddress) : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
