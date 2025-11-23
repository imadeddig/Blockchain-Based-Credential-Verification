import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Immutable Academic Credentials on the Blockchain
        </h1>
        <p className="hero-subtitle">
          Securing academic records and empowering students with verifiable, student-owned credentials.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">For Institutions</button>
          <button className="btn-secondary">For Students</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
