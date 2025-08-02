import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistPage = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-green-600 font-bold mb-4">${item.price}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-gray-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Start adding items to your wishlist to see them here.</p>
              <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage; 