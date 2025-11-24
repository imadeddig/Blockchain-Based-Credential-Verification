import React, { useState, useEffect } from 'react';
import { verifyCredential, getContract, getTotalCredentials } from '../utils/web3';
import '../styles/VerifyCredential.css';

const VerifyCredential = () => {
  const [credentialInput, setCredentialInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [myCredentials, setMyCredentials] = useState([
    {
      id: 0,
      title: 'Bachelor in Computer Science',
      issuer: 'XYZ University',
      date: '2023-09-20'
    },
    {
      id: 1,
      title: 'Certified Blockchain Developer',
      issuer: 'Crypto Academy',
      date: '2024-11-10'
    }
  ]);

  const handleVerify = async () => {
    if (!credentialInput) {
      alert('Please enter a credential Token ID');
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      if (!getContract()) {
        throw new Error('Please connect your wallet and set contract address first!');
      }

      const result = await verifyCredential(credentialInput);
      setVerificationResult(result);
    } catch (error) {
      setVerificationResult({
        error: error.message
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleQRVerify = () => {
    alert('QR Code verification coming soon!');
  };

  const formatDate = (date) => {
    if (!date) return 'Never expires';
    return new Date(date).toLocaleDateString();
  };

  return (
    <section className="verify-credential" id="verify">
      <div className="section-container">
        <h2 className="section-title">Access and Verify Your Achievements</h2>
        
        <div className="verify-content">
          <div className="verify-form">
            <h3 className="verify-subtitle">Verify a Credential</h3>
            <label htmlFor="credentialInput">Credential Token ID</label>
            <input
              type="text"
              id="credentialInput"
              placeholder="Enter Token ID (e.g., 0, 1, 2...)"
              value={credentialInput}
              onChange={(e) => setCredentialInput(e.target.value)}
            />
            <button 
              className="verify-btn" 
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify Now'}
            </button>

            {verificationResult && (
              <div className={`verification-result ${verificationResult.error ? 'error' : 'success'}`}>
                {verificationResult.error ? (
                  <p>❌ Error: {verificationResult.error}</p>
                ) : (
                  <>
                    <p className="result-status">
                      {verificationResult.isValid && !verificationResult.data.revoked ? '✅ Valid Credential' : '⚠️ Invalid/Revoked Credential'}
                    </p>
                    <div className="result-details">
                      <p><strong>Title:</strong> {verificationResult.data.title}</p>
                      <p><strong>Institution:</strong> {verificationResult.data.institution}</p>
                      <p><strong>Type:</strong> {verificationResult.data.type}</p>
                      <p><strong>Recipient:</strong> {verificationResult.data.recipient}</p>
                      <p><strong>Issuer:</strong> {verificationResult.data.issuer}</p>
                      <p><strong>Issue Date:</strong> {formatDate(verificationResult.data.issueDate)}</p>
                      <p><strong>Expiry:</strong> {formatDate(verificationResult.data.expiryDate)}</p>
                      <p><strong>Revoked:</strong> {verificationResult.data.revoked ? 'Yes ⚠️' : 'No ✅'}</p>
                      <p><strong>IPFS:</strong> {verificationResult.data.ipfsURI}</p>
                    </div>
                  </>
                )}
              </div>
            )}
            
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
            
            {myCredentials.map((cred) => (
              <div key={cred.id} className="credential-card" onClick={() => setCredentialInput(cred.id.toString())}>
                <div className="credential-icon">🎓</div>
                <div className="credential-info">
                  <h4 className="credential-name">{cred.title}</h4>
                  <p className="credential-issuer">Issued by: {cred.issuer} on {cred.date}</p>
                  <p className="credential-token">Token ID: {cred.id}</p>
                </div>
              </div>
            ))}

            <p className="credentials-note">💡 Click on a credential to verify it</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyCredential;
