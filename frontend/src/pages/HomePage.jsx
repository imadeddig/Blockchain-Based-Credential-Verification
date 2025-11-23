import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IssueCredential from '../components/IssueCredential';
import VerifyCredential from '../components/VerifyCredential';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <IssueCredential />
      <VerifyCredential />
    </div>
  );
};

export default HomePage;