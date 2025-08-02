import api from './api';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Registration failed.' };
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Login failed.' };
    }
  }

  // User logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Backend logout error (if applicable):', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Get current user data from backend
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Failed to fetch current user.' };
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.patch('/auth/update-me', userData);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Profile update failed.' };
    }
  }

  // Update password
  async updatePassword(passwordData) {
    try {
      const response = await api.patch('/auth/update-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Password update failed.' };
    }
  }

  // Request password reset email
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Forgot password request failed.' };
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await api.patch('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Password reset failed.' };
    }
  }

  // Check if token exists in localStorage
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get user data from localStorage
  getCurrentUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();