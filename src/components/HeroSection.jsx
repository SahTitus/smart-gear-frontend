import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Shield, Truck, Clock, X, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroPhone from '../assets/hero phone.png';
import ellipse1 from '../assets/Ellipse1.png';
import ellipse2 from '../assets/Ellipse2.png';

const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  const features = [
    { icon: Shield, text: "Secure Shopping", color: "text-blue-500", description: "SSL encrypted payments and secure checkout" },
    { icon: Truck, text: "Free Shipping", color: "text-green-500", description: "Free shipping on orders over $50" },
    { icon: Clock, text: "24/7 Support", color: "text-purple-500", description: "Round-the-clock customer support" },
    { icon: Star, text: "Premium Quality", color: "text-yellow-500", description: "Curated selection of top-tier products" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    navigate('/categories');
  };

  const handleWatchDemo = () => {
    setShowVideoModal(true);
    setIsVideoPlaying(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
  };

  const handleFeatureClick = (index) => {
    setCurrentFeature(index);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={ellipse1} 
            alt="" 
            className={`absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 opacity-20 transition-all duration-1000 ${
              isVisible ? 'animate-pulse' : ''
            }`} 
          />
          <img 
            src={ellipse2} 
            alt="" 
            className={`absolute bottom-10 right-10 w-32 h-32 md:w-48 md:h-48 opacity-20 transition-all duration-1000 delay-500 ${
              isVisible ? 'animate-pulse' : ''
            }`} 
          />
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`relative z-10 transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'
            }`}>
              {/* Badge */}
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 cursor-pointer hover:bg-green-200 transition-colors">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 10,000+ customers
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover the Latest in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Tech Innovation
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                Explore cutting-edge electronics and smart gadgets that transform your digital lifestyle. 
                From smartphones to smart home devices, we've got everything you need.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleShopNow}
                  className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleWatchDemo}
                  className="group bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-green-500 hover:text-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div 
                      key={index}
                      onClick={() => handleFeatureClick(index)}
                      className={`flex items-center space-x-2 transition-all duration-500 cursor-pointer hover:scale-105 ${
                        currentFeature === index ? 'scale-110' : 'scale-100'
                      }`}
                      title={feature.description}
                    >
                      <IconComponent className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-sm font-medium text-gray-600">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Feature Description */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 italic">
                  {features[currentFeature].description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-green-600 group-hover:text-green-700">50K+</div>
                  <div className="text-sm text-gray-500">Happy Customers</div>
                </div>
                <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-green-600 group-hover:text-green-700">1000+</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
                <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-green-600 group-hover:text-green-700">24/7</div>
                  <div className="text-sm text-gray-500">Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[50px] opacity-0'
            }`}>
              <div className="relative group cursor-pointer" onClick={handleWatchDemo}>
                {/* Main Image */}
                <img 
                  src={heroPhone} 
                  alt="Latest Smartphones" 
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <Play className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                {/* Floating Elements around the phone */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-bounce delay-1000">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-3xl -z-10 transform scale-110 blur-xl opacity-50"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl -z-20 transform scale-125 blur-3xl opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={handleScrollDown}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-green-500 transition-colors">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Product Demo</h3>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Video Container */}
            <div className="relative">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Demo Video</p>
                  <p className="text-sm text-gray-400 mt-2">Experience our products in action</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Learn more about our products and features</p>
                <button 
                  onClick={handleShopNow}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Explore Products
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection; 