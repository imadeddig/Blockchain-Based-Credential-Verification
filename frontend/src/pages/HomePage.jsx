import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IssueCredential from '../components/IssueCredential';
import VerifyCredential from '../components/VerifyCredential';
import { initializeContract, checkIsIssuer } from '../utils/web3';
import '../styles/HomePage.css';

const HomePage = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [isContractSet, setIsContractSet] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  const [isIssuer, setIsIssuer] = useState(false);

  const handleWalletConnect = (address, network, chainId) => {
    setWalletInfo({ address, network, chainId });
    
    // If contract address is already set, initialize it
    if (contractAddress) {
      try {
        initializeContract(contractAddress);
        setIsContractSet(true);
        checkIssuerStatus(address);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    }
  };

  const checkIssuerStatus = async (address) => {
    try {
      const issuerStatus = await checkIsIssuer(address);
      setIsIssuer(issuerStatus);
    } catch (error) {
      console.error('Error checking issuer status:', error);
    }
  };

  const handleContractAddressSubmit = (e) => {
    e.preventDefault();
    if (!walletInfo) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!contractAddress) {
      alert('Please enter a contract address!');
      return;
    }

    try {
      initializeContract(contractAddress);
      setIsContractSet(true);
      checkIssuerStatus(walletInfo.address);
      alert('✅ Contract initialized successfully!');
    } catch (error) {
      alert('❌ Error initializing contract: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar onWalletConnect={handleWalletConnect} />
      
      {/* Show Hero only when not connected */}
      {!walletInfo && <Hero />}

      {/* Connection Setup Section - Show when not connected */}
      {!walletInfo && (
        <section className="connection-setup-section">
          <div className="connection-setup-container">
            <div className="setup-card">
              <div className="setup-icon">🔗</div>
              <h2>Connection Setup Required</h2>
              <p>To use VeriChain, you need to:</p>
              <ol className="setup-steps">
                <li>
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <strong>Connect Your Wallet</strong>
                    <p>Click "Connect Wallet" in the navigation bar to connect your MetaMask wallet</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <div className="step-content">
                    <strong>Enter Contract Address</strong>
                    <p>Provide your deployed smart contract address</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <div className="step-content">
                    <strong>Start Using VeriChain</strong>
                    <p>Issue and verify credentials on the blockchain</p>
                  </div>
                </li>
              </ol>
              <div className="setup-info">
                <p>⚠️ Make sure you have MetaMask installed and are connected to the correct network</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contract Address Setup Section - Show when wallet connected but contract not set */}
      {walletInfo && !isContractSet && (
        <section className="contract-setup-section">
          <div className="contract-setup-container">
            <div className="setup-card">
              <div className="setup-icon success">✅</div>
              <h2>Wallet Connected!</h2>
              <div className="wallet-info-display">
                <div className="info-item">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{walletInfo.address}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Network:</span>
                  <span className="info-value">{walletInfo.network} (Chain ID: {walletInfo.chainId})</span>
                </div>
              </div>
              
              <div className="next-step">
                <h3>📝 Step 2: Set Contract Address</h3>
                <p>Enter your deployed smart contract address to continue</p>
                <form onSubmit={handleContractAddressSubmit} className="contract-form">
                  <input
                    type="text"
                    placeholder="0x..."
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="contract-input"
                  />
                  <button type="submit" className="contract-submit-btn">
                    Initialize Contract
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Connection Status Banner - Show when everything is connected */}
      {walletInfo && isContractSet && (
        <>
          <div className="status-banner">
            <div className="status-banner-content">
              <span className="status-indicator">🟢</span>
              <span>Connected: {walletInfo.address.substring(0, 6)}...{walletInfo.address.substring(38)}</span>
              <span className="separator">|</span>
              <span>Network: {walletInfo.network} ({walletInfo.chainId})</span>
              <span className="separator">|</span>
              <span>Contract: {contractAddress.substring(0, 6)}...{contractAddress.substring(38)}</span>
              {isIssuer && (
                <>
                  <span className="separator">|</span>
                  <span className="issuer-badge">✨ Issuer Role</span>
                </>
              )}
            </div>
          </div>

          {/* Main Functionality - Only show when fully connected */}
          <IssueCredential contractAddress={contractAddress} />
          <VerifyCredential />
        </>
      )}
    </div>
  );
};

export default HomePage;