import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import useProducts from '../../hooks/useProducts';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { products, loading, error, refetch } = useProducts({
    type: 'search',
    searchQuery: query,
    limit: 20
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Search Results for "{query}"
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : products.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-6">
                Found {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{query}"</p>
              <p className="text-gray-400 mt-2">Try different keywords or browse our categories</p>
              <div className="mt-6">
                <a
                  href="/categories"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Categories
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage; 