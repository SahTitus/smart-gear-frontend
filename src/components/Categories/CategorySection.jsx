import CategoryCard from './CategoryCard';
import Laptop from '@/assets/categories/laptop.png';
import Gaming from '@/assets/categories/gaming.svg';
import Phone from '@/assets/categories/phone.svg';
import Headphones from '@/assets/categories/headphones.svg';
import { ChevronRight } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      name: 'Laptops & Computers',
      image: Laptop,
      gradient: 'from-blue-400 to-blue-600',
      productCount: 156,
      rating: 4.8,
      isTrending: true,
      isNew: false,
      discount: 0,
      description: 'High-performance laptops, desktops, and accessories'
    },
    {
      name: 'Gaming & Entertainment',
      image: Gaming,
      gradient: 'from-purple-400 to-purple-600',
      productCount: 89,
      rating: 4.9,
      isTrending: true,
      isNew: true,
      discount: 15,
      description: 'Gaming consoles, accessories, and entertainment systems'
    },
    {
      name: 'Smartphones & Mobile',
      image: Phone,
      gradient: 'from-green-400 to-green-600',
      productCount: 234,
      rating: 4.7,
      isTrending: false,
      isNew: false,
      discount: 10,
      description: 'Latest smartphones, tablets, and mobile accessories'
    },
    {
      name: 'Audio & Headphones',
      image: Headphones,
      gradient: 'from-red-400 to-red-600',
      productCount: 67,
      rating: 4.6,
      isTrending: false,
      isNew: true,
      discount: 20,
      description: 'Premium headphones, speakers, and audio equipment'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop By Category</h2>
            <p className="text-gray-600">Discover our curated collection of tech products</p>
          </div>
          <a href="/categories" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium group">
            <span>View all categories</span>
            <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              name={category.name} 
              image={category.image}
              gradient={category.gradient}
              productCount={category.productCount}
              rating={category.rating}
              isTrending={category.isTrending}
              isNew={category.isNew}
              discount={category.discount}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 