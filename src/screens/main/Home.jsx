import React from 'react';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import CategorySection from '../../components/categories/CategorySection';
import FeaturedProducts from '../../components/FeaturedProducts';
import NewsletterSection from '../../components/NewsletterSection';
import DealsSection from '../../components/DealsSection';
import Footer from '../../components/footer/Footer';
import Brand from '../../components/Brand/Brand';
import Navbar from '../../components/Navbar/Navbar';
import DealCard from '../../components/dDealCard/DealCard';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* <Header /> */}
      <HeroSection />
      <CategorySection />
      <Brand />
      <FeaturedProducts />
      <NewsletterSection />
      <DealsSection />
      <DealCard />
      <Footer />
    </div>
  );
};

export default Home; 