import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Newsletter
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Stay Updated with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  SmartGear
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Get exclusive access to the latest tech deals, product launches, and insider tips. 
                Join our community of tech enthusiasts! 🚀
              </p>
            </div>

            {/* Subscribe Form */}
            <div className="space-y-4">
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        className={`w-full px-6 py-4 pr-32 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 ${
                          error 
                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:border-green-500 bg-white hover:border-green-300'
                        }`}
                        disabled={isLoading || isSubscribed}
                      />
                      <button
                        type="submit"
                        disabled={isLoading || isSubscribed}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          isLoading || isSubscribed
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transform hover:scale-105 shadow-lg'
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Subscribing...
                          </div>
                        ) : isSubscribed ? (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Subscribed!
                          </div>
                        ) : (
                          'Subscribe'
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  )}
                  
                  {isSubscribed && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-800 font-medium">Successfully subscribed! Welcome to the SmartGear family! 🎉</span>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Exclusive deals & discounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Early access to new products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Tech tips & tutorials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main circle with gradient */}
              <div className="w-80 h-80 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/30 rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/30 rounded-full animate-bounce delay-1000"></div>
                
                {/* Email icon */}
                <div className="relative z-10">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center animate-bounce delay-500">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Join over 50,000+ tech enthusiasts</p>
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm text-gray-600">+47k subscribers</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 