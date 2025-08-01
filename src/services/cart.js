import api from './api';

export const cartService = {
  addToCart: async (cartData) => {
    try {
      const response = await api.post('/cart/add', cartData);
      return response.data;
    } catch (error) {
      console.error('Error fetching acrt:', error);
      throw error;
    }
  },
};

export default cartService; 