import React, { useState } from 'react';
import '../styles/IssueCredential.css';

const IssueCredential = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    credentialType: '',
    credentialTitle: '',
    issuingDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Issuing credential:', formData);
    // Add your credential issuance logic here
  };

  return (
    <section className="issue-credential" id="issue">
      <div className="section-container">
        <h2 className="section-title">Issue Verifiable Credentials</h2>
        
        <form className="credential-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="studentName">Student Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                placeholder="Enter student's full name"
                value={formData.studentName}
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
                <option value="">Select type</option>
                <option value="degree">Degree</option>
                <option value="certificate">Certificate</option>
                <option value="diploma">Diploma</option>
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
              <label htmlFor="issuingDate">Issuing Date</label>
              <input
                type="text"
                id="issuingDate"
                name="issuingDate"
                placeholder="mm/dd/yyyy"
                value={formData.issuingDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            Generate & Issue Credential
          </button>
        </form>
      </div>
    </section>
  );
};

export default IssueCredential;
