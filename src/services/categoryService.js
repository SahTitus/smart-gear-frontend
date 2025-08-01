import api from './api';

// Category service for handling all category-related API calls
export const categoryService = {
  // Get all categories
  getAllCategories: async (params = {}) => {
    try {
      const response = await api.get('/categories', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get a single category by ID
  getCategoryById: async (categoryId) => {
    try {
      const response = await api.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // Get products by category
  getProducts: async (categoryId, params = {}) => {
    try {
      const response = await api.get(`/categories/${categoryId}/products`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
};

export default categoryService; 