import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green-600 font-medium mb-2">Discover SmartGear</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SUBSCRIBE TO THE NEWS</h2>
            <p className="text-lg text-gray-600 mb-8">
              Be aware of all promos, discounts and bargains! Don't miss your benefits 😉
            </p>
            <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-64 h-64 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center">
              <svg className="w-32 h-32 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 