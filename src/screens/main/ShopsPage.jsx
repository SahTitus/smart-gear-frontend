import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Store, Star, MapPin } from 'lucide-react';

const ShopsPage = () => {
  const shops = [
    {
      id: 1,
      name: 'Tech Haven',
      rating: 4.8,
      reviews: 1247,
      location: 'Downtown Mall',
      category: 'Electronics',
      image: '/shop1.jpg'
    },
    {
      id: 2,
      name: 'Gadget Galaxy',
      rating: 4.6,
      reviews: 892,
      location: 'Shopping Center',
      category: 'Electronics',
      image: '/shop2.jpg'
    },
    {
      id: 3,
      name: 'Smart Solutions',
      rating: 4.9,
      reviews: 1563,
      location: 'Tech Plaza',
      category: 'Electronics',
      image: '/shop3.jpg'
    },
    {
      id: 4,
      name: 'Digital Dreams',
      rating: 4.7,
      reviews: 734,
      location: 'Innovation Hub',
      category: 'Electronics',
      image: '/shop4.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Featured Shops</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.map((shop) => (
              <div key={shop.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center">
                  <Store className="text-gray-400" size={48} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{shop.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{shop.category}</p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(shop.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({shop.reviews})</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin size={16} className="mr-1" />
                  {shop.location}
                </div>
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                  Visit Shop
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopsPage; 