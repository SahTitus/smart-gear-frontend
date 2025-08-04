import React, { useState } from "react";
import { ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ 
  name, 
  image, 
  gradient = "from-blue-400 to-blue-600",
  productCount = 0,
  rating = 0,
  isTrending = false,
  isNew = false,
  discount = 0,
  description = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to categories page or search with category filter
    navigate('/categories');
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isTrending && (
            <div className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          )}
          {isNew && (
            <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Zap className="w-3 h-3" />
              <span>New</span>
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <ArrowRight className="w-6 h-6 text-gray-800" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
          {rating > 0 && (
            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium text-yellow-700">{rating}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between">
          {productCount > 0 && (
            <span className="text-sm text-gray-500 font-medium">
              {productCount} products
            </span>
          )}
          
          <div className="flex items-center gap-1 text-green-600 group-hover:text-green-700 transition-colors duration-300">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-200"></div>
    </div>
  );
};

export default CategoryCard;
