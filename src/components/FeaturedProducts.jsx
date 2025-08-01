import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // Mock product data - in a real app, this would come from an API
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max - 256GB",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      discount: 8,
      isNew: true
    },
    {
      id: 2,
      name: "MacBook Air M2 - 13 inch",
      price: 999,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 892,
      discount: 9,
      isHot: true
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 349,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 1563,
      discount: 13
    },
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 987,
      discount: 8,
      isNew: true
    },
    {
      id: 5,
      name: "iPad Pro 12.9 inch M2",
      price: 1099,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 743,
      discount: 8
    },
    {
      id: 6,
      name: "Apple Watch Series 9",
      price: 399,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 1123,
      discount: 11,
      isHot: true
    },
    {
      id: 7,
      name: "DJI Mini 3 Pro Drone",
      price: 759,
      originalPrice: 859,
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 456,
      discount: 12
    },
    {
      id: 8,
      name: "Nintendo Switch OLED",
      price: 349,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 2341,
      discount: 13
    },
    {
      id: 9,
      name: "PlayStation 5 Digital Edition",
      price: 499,
      originalPrice: 499,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 2156,
      isOutOfStock: true
    },
    {
      id: 10,
      name: "Microsoft Surface Laptop 5",
      price: 1299,
      originalPrice: 1499,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 892,
      discount: 13,
      isNew: true
    },
    {
      id: 11,
      name: "Google Pixel 8 Pro",
      price: 899,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 567,
      discount: 10
    },
    {
      id: 12,
      name: "AirPods Pro 2nd Generation",
      price: 249,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 1892,
      discount: 17,
      isHot: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-green-600">Featured Products</h2>
          <a href="#" className="text-green-600 hover:text-green-700 font-medium flex items-center">
            View all products
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 