import api from './api';

// Product service for handling all product-related API calls
export const productService = {
  // Get all products with optional filtering, sorting, and pagination
  getProducts: async (params = {}) => {
    try {   
      const response = await api.get('/products', { params: params });
      
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get a single product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

};

export default productService; 