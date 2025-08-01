import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import useProducts from '../hooks/useProducts';

const DealsSection = () => {
  const { products, loading, error, refetch } = useProducts({
    type: 'all',
    limit: 5,
    sort: '-createdAt', // Sort by newest first
    filters: {
      // Note: The backend should handle discount filtering
      // For now, we'll fetch all active products and filter on frontend if needed
    }
  });

  const deals = [
    {
      title: 'SmartGear Flash Deals',
      description: 'Shop Today\'s Deals, Lightning Deals, and limited time discounts',
      linkText: 'See more',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-blue-50 to-blue-100',
      linkColor: 'text-blue-600 hover:text-blue-700',
      iconBg: 'bg-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Deals and Promotions',
      description: 'Shop Today\'s Deals, Lightning Deals, and limited time discounts',
      linkText: 'See more',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-green-50 to-green-100',
      linkColor: 'text-green-600 hover:text-green-700',
      iconBg: 'bg-green-200',
      iconColor: 'text-green-600'
    }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {deals.map((deal, index) => (
              <div key={index} className={`bg-gradient-to-br ${deal.gradient} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{deal.title}</h3>
                <p className="text-gray-600 mb-6">
                  {deal.description}
                </p>
                <div className="flex items-center justify-between">
                  <a href="#" className={`${deal.linkColor} font-medium flex items-center`}>
                    {deal.linkText}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <div className={`w-16 h-16 ${deal.iconBg} rounded-lg flex items-center justify-center`}>
                    {deal.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {deals.map((deal, index) => (
              <div key={index} className={`bg-gradient-to-br ${deal.gradient} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{deal.title}</h3>
                <p className="text-gray-600 mb-6">
                  {deal.description}
                </p>
                <div className="flex items-center justify-between">
                  <a href="#" className={`${deal.linkColor} font-medium flex items-center`}>
                    {deal.linkText}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <div className={`w-16 h-16 ${deal.iconBg} rounded-lg flex items-center justify-center`}>
                    {deal.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={refetch} 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {deals.map((deal, index) => (
            <div key={index} className={`bg-gradient-to-br ${deal.gradient} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{deal.title}</h3>
              <p className="text-gray-600 mb-6">
                {deal.description}
              </p>
              <div className="flex items-center justify-between">
                <a href="#" className={`${deal.linkColor} font-medium flex items-center`}>
                  {deal.linkText}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <div className={`w-16 h-16 ${deal.iconBg} rounded-lg flex items-center justify-center`}>
                  {deal.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No deals available at the moment.</p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Today's Best Deals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DealsSection; 