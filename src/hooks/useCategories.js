import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

export const useCategories = (options = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    categoryId = null,
    limit = 20,
    page = 1,
    sort = 'name',
    filters = {}
  } = options;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const params = {
        limit,
        page,
        sort,
        ...filters
      };

      if (categoryId) {
        response = await categoryService.getCategoryById(categoryId);
      } else {
        response = await categoryService.getAllCategories(params);
      }

      // Handle different response formats
      const fetchedCategories = response.data || response.categories || response;
      
      if (fetchedCategories && Array.isArray(fetchedCategories)) {
        setCategories(fetchedCategories);
      } else if (fetchedCategories && !Array.isArray(fetchedCategories)) {
        // Single category
        setCategories([fetchedCategories]);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryId, limit, page, sort, JSON.stringify(filters)]);

  const refetch = () => {
    fetchCategories();
  };

  return {
    categories,
    loading,
    error,
    refetch
  };
};

export default useCategories; 