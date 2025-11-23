import React, { useState } from 'react';
import '../styles/VerifyCredential.css';

const VerifyCredential = () => {
  const [credentialInput, setCredentialInput] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('url');

  const handleVerify = () => {
    console.log('Verifying credential:', credentialInput);
    // Add your verification logic here
  };

  const handleQRVerify = () => {
    console.log('Verifying with QR Code');
    // Add QR code verification logic here
  };

  return (
    <section className="verify-credential" id="verify">
      <div className="section-container">
        <h2 className="section-title">Access and Verify Your Achievements</h2>
        
        <div className="verify-content">
          <div className="verify-form">
            <h3 className="verify-subtitle">Verify a Credential</h3>
            <label htmlFor="credentialInput">Credential URL or Transaction ID</label>
            <input
              type="text"
              id="credentialInput"
              placeholder="Paste URL or transaction hash"
              value={credentialInput}
              onChange={(e) => setCredentialInput(e.target.value)}
            />
            <button className="verify-btn" onClick={handleVerify}>
              Verify Now
            </button>
            
            <div className="divider">
              <span>OR</span>
            </div>
            
            <button className="qr-verify-btn" onClick={handleQRVerify}>
              <span className="qr-icon">📷</span>
              Verify with QR Code
            </button>
          </div>
          
          <div className="credentials-list">
            <h3 className="credentials-title">My Credentials</h3>
            
            <div className="credential-card">
              <div className="credential-icon">🎓</div>
              <div className="credential-info">
                <h4 className="credential-name">Bachelor in Computer Science</h4>
                <p className="credential-issuer">Issued by: XYZ University on 2023-09-20</p>
              </div>
            </div>
            
            <div className="credential-card">
              <div className="credential-icon">🎓</div>
              <div className="credential-info">
                <h4 className="credential-name">Certified Blockchain Developer</h4>
                <p className="credential-issuer">Issued by: Crypto Academy on 2024-11-10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyCredential;
