import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const {
    type = 'all', // 'all', 'featured', 'category', 'search', 'brand', 'priceRange'
    categoryId = null,
    searchQuery = '',
    brand = null,
    minPrice = null,
    maxPrice = null,
    limit = 10,
    page = 1,
    sort = '-createdAt',
    filters = {}
  } = options;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const params = {
        limit,
        page,
        sort,
        isActive: true, // Always fetch active products
        ...filters
      };

      // Add specific filters based on type
      switch (type) {
        case 'featured':
          response = await productService.getProducts(limit);
          break;
        case 'category':
          if (!categoryId) {
            throw new Error('Category ID is required for category products');
          }
          response = await productService.getProducts(categoryId, params);
          break;
        case 'search':
          if (!searchQuery) {
            throw new Error('Search query is required for search products');
          }
          response = await productService.getProducts(searchQuery, params);
          break;
        case 'brand':
          if (!brand) {
            throw new Error('Brand is required for brand products');
          }
          response = await productService.getProducts(brand, params);
          break;
        case 'priceRange':
          if (minPrice === null || maxPrice === null) {
            throw new Error('Min and max price are required for price range products');
          }
          response = await productService.getProducts(minPrice, maxPrice, params);
          break;
        default:
          // Add specific filters if provided
          if (categoryId) params.category = categoryId;
          if (searchQuery) params.search = searchQuery;
          if (brand) params.brand = brand;
          if (minPrice !== null) params.minPrice = minPrice;
          if (maxPrice !== null) params.maxPrice = maxPrice;
          
          response = await productService.getProducts(params);
      }

      // Handle different response formats
      const fetchedProducts = response.data || response.products || response;
      const paginationData = response.pagination || response.meta;

      if (fetchedProducts && Array.isArray(fetchedProducts)) {
        setProducts(fetchedProducts);
        if (paginationData) {
          setPagination(paginationData);
        }
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [type, categoryId, searchQuery, brand, minPrice, maxPrice, limit, page, sort, JSON.stringify(filters)]);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    pagination,
    refetch
  };
};

export default useProducts; 