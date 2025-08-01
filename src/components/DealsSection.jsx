import React from 'react';

const DealsSection = () => {
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </section>
  );
};

export default DealsSection; 