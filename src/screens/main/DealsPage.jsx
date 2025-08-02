import React from 'react';
import Footer from '../../components/footer/Footer';
import DealsSection from '../../components/DealsSection';
import Navbar from '../../components/navbar/Navbar';

const DealsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Today's Deals</h1>
          <DealsSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DealsPage; 