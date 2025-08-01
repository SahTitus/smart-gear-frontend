import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, StarHalf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import cartService from '../services/cart';

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    images,
    rating,
    reviewCount,
    discount,
    isNew = false,
    isHot = false,
    isOutOfStock = false
  } = product;

  const [isHovered, setIsHovered] = useState(false);
  
  // Use global cart and wishlist state
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      cartService.addToCart({productId: id, quantity:5});
      addToCart(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality would go here
    console.log('Quick view:', product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={14} className="fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
    }

    return stars;
  };

  const calculateDiscountPercentage = () => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative border border-gray-100 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {isHot && (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            HOT
          </span>
        )}
        {discount > 0 && (
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {isOutOfStock && (
          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleWishlistToggle}
          className={`p-2 rounded-full shadow-md transition-all duration-200 ${
            isInWishlist(id)
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart size={16} className={isInWishlist(id) ? 'fill-current' : ''} />
        </button>
        <button
          onClick={handleQuickView}
          className="p-2 rounded-full bg-white text-gray-600 hover:bg-green-500 hover:text-white shadow-md transition-all duration-200"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative bg-gray-50 h-64 flex items-center justify-center p-4">
        <img
          src={images[0]?.url}
          alt={name}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Quick Add to Cart Overlay */}
        {!isOutOfStock && (
          <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${price.toLocaleString()}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              GHS{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock ? (
          <div className="text-red-500 text-sm font-medium">Out of Stock</div>
        ) : (
          <div className="text-green-500 text-sm font-medium">In Stock</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;