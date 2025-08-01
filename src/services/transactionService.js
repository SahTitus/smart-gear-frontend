import api from './api';

const transactionService = {
  initializePayment: async (data) => {
    try {
      const response = await api.post('/transactions/initialize', data);
      return response.data;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  },

  verifyPayment: async (reference) => {
    try {
      const response = await api.get(`/transactions/verify/${reference}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },
};

export default transactionService;