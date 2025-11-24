import React, { useState } from 'react';
import { issueCredential, getContract } from '../utils/web3';
import '../styles/IssueCredential.css';

const IssueCredential = ({ contractAddress }) => {
  const [formData, setFormData] = useState({
    recipientAddress: '',
    credentialType: '0',
    credentialTitle: '',
    institution: '',
    expiryDate: '',
    ipfsURI: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateHash = (data) => {
    const ethers = window.ethers;
    if (!ethers) {
      throw new Error('Ethers.js not loaded');
    }
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(data)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');

    try {
      if (!getContract()) {
        throw new Error('Please connect your wallet and set contract address first!');
      }

      // Generate credential hash
      const credentialHash = generateHash({
        title: formData.credentialTitle,
        institution: formData.institution,
        recipient: formData.recipientAddress,
        timestamp: Date.now()
      });

      const credentialData = {
        to: formData.recipientAddress,
        credentialType: parseInt(formData.credentialType),
        title: formData.credentialTitle,
        institution: formData.institution,
        expiryDate: formData.expiryDate ? Math.floor(new Date(formData.expiryDate).getTime() / 1000) : 0,
        credentialHash: credentialHash,
        ipfsURI: formData.ipfsURI || 'ipfs://default'
      };

      const response = await issueCredential(credentialData);
      
      setResult(`✅ Credential Issued Successfully!

Token ID: ${response.tokenId}
Transaction: ${response.transactionHash}
Block: ${response.blockNumber}`);

      // Reset form
      setFormData({
        recipientAddress: '',
        credentialType: '0',
        credentialTitle: '',
        institution: '',
        expiryDate: '',
        ipfsURI: ''
      });
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="issue-credential" id="issue">
      <div className="section-container">
        <h2 className="section-title">Issue Verifiable Credentials</h2>
        
        <form className="credential-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="recipientAddress">Recipient Wallet Address</label>
              <input
                type="text"
                id="recipientAddress"
                name="recipientAddress"
                placeholder="0x..."
                value={formData.recipientAddress}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="credentialType">Credential Type</label>
              <select
                id="credentialType"
                name="credentialType"
                value={formData.credentialType}
                onChange={handleChange}
                required
              >
                <option value="0">Course Completion</option>
                <option value="1">Competition Award</option>
                <option value="2">Project Validation</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="credentialTitle">Credential Title</label>
              <input
                type="text"
                id="credentialTitle"
                name="credentialTitle"
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={formData.credentialTitle}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="institution">Institution</label>
              <input
                type="text"
                id="institution"
                name="institution"
                placeholder="e.g., MIT"
                value={formData.institution}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date (Optional)</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="ipfsURI">IPFS URI (Optional)</label>
              <input
                type="text"
                id="ipfsURI"
                name="ipfsURI"
                placeholder="ipfs://..."
                value={formData.ipfsURI}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Issuing Credential...' : 'Generate & Issue Credential'}
          </button>

          {result && (
            <div className={`result-message ${result.includes('Error') ? 'error' : 'success'}`}>
              <pre>{result}</pre>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default IssueCredential;
