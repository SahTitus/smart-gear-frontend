import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, TrendingUp, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/Categories/CategoryCard';
import Laptop from '../../assets/Categories/laptop.png';
import Gaming from '../../assets/Categories/gaming.svg';
import Phone from '../../assets/Categories/phone.svg';
import Headphones from '../../assets/Categories/headphones.svg';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Laptops & Computers',
      image: Laptop,
      description: 'High-performance laptops, desktops, and accessories',
      productCount: 156,
      rating: 4.8,
      isTrending: true,
      isNew: false,
      discount: 0,
      tag: 'computing'
    },
    {
      id: 2,
      name: 'Gaming & Entertainment',
      image: Gaming,
      description: 'Gaming consoles, accessories, and entertainment systems',
      productCount: 89,
      rating: 4.9,
      isTrending: true,
      isNew: true,
      discount: 15,
      tag: 'gaming'
    },
    {
      id: 3,
      name: 'Smartphones & Mobile',
      image: Phone,
      description: 'Latest smartphones, tablets, and mobile accessories',
      productCount: 234,
      rating: 4.7,
      isTrending: false,
      isNew: false,
      discount: 10,
      tag: 'mobile'
    },
    {
      id: 4,
      name: 'Audio & Headphones',
      image: Headphones,
      description: 'Premium headphones, speakers, and audio equipment',
      productCount: 67,
      rating: 4.6,
      isTrending: false,
      isNew: true,
      discount: 20,
      tag: 'audio'
    },
    {
      id: 5,
      name: 'Smart Home & IoT',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      description: 'Smart home devices, security systems, and IoT products',
      productCount: 123,
      rating: 4.5,
      isTrending: true,
      isNew: false,
      discount: 5,
      tag: 'smart-home'
    },
    {
      id: 6,
      name: 'Cameras & Photography',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
      description: 'Professional cameras, lenses, and photography gear',
      productCount: 78,
      rating: 4.8,
      isTrending: false,
      isNew: false,
      discount: 12,
      tag: 'photography'
    },
    {
      id: 7,
      name: 'Wearables & Fitness',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
      description: 'Smartwatches, fitness trackers, and health devices',
      productCount: 95,
      rating: 4.4,
      isTrending: true,
      isNew: true,
      discount: 8,
      tag: 'wearables'
    },
    {
      id: 8,
      name: 'Accessories & Peripherals',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      description: 'Keyboards, mice, cables, and computer accessories',
      productCount: 312,
      rating: 4.3,
      isTrending: false,
      isNew: false,
      discount: 0,
      tag: 'accessories'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Categories', icon: Grid },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new', label: 'New Arrivals', icon: Zap },
    { id: 'discount', label: 'On Sale', icon: Star }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'products', label: 'Most Products' },
    { value: 'discount', label: 'Best Deals' }
  ];

  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      if (selectedFilter === 'trending') matchesFilter = category.isTrending;
      if (selectedFilter === 'new') matchesFilter = category.isNew;
      if (selectedFilter === 'discount') matchesFilter = category.discount > 0;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.productCount - a.productCount;
        case 'discount':
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleCategoryClick = (category) => {
    // Navigate to category-specific page or search results
    navigate(`/search?category=${category.tag}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Categories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect tech products across our carefully curated categories. 
              From cutting-edge gadgets to essential accessories, find everything you need.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      selectedFilter === filter.id
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode and Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:text-green-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCategories.length}</span> categories
            {searchTerm && ` for "${searchTerm}"`}
          </p>
          
          {selectedFilter !== 'all' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtered by:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {filters.find(f => f.id === selectedFilter)?.label}
              </span>
            </div>
          )}
        </div>

        {/* Categories Display */}
        {filteredCategories.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-2">
                        {category.isTrending && (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">
                            Trending
                          </span>
                        )}
                        {category.isNew && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium">
                            New
                          </span>
                        )}
                        {category.discount > 0 && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                            {category.discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{category.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{category.productCount} products</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex items-center space-x-6 w-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                          {category.name}
                        </h3>
                        {category.isTrending && (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">
                            Trending
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{category.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.productCount} products</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // No Results
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">{categories.length}</div>
              <div className="text-gray-600">Total Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.filter(cat => cat.isTrending).length}
              </div>
              <div className="text-gray-600">Trending Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.filter(cat => cat.discount > 0).length}
              </div>
              <div className="text-gray-600">On Sale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage; 