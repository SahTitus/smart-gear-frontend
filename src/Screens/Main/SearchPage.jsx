import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  // Mock search functionality
  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        { id: 1, name: 'Smartphone', price: 299.99, image: '/phone.jpg' },
        { id: 2, name: 'Laptop', price: 899.99, image: '/laptop.jpg' },
        { id: 3, name: 'Headphones', price: 99.99, image: '/headphones.jpg' },
      ].filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  React.useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Search Results for "{query}"
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-green-600 font-bold">${item.price}</p>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{query}"</p>
              <p className="text-gray-400 mt-2">Try different keywords or browse our categories</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage; 