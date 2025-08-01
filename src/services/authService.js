import api from './api';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      console.log('Registering user with data:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response);
      if (error.response?.data) {
        throw error.response.data;
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: 'Registration failed. Please try again.' };
      }
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // User logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.patch('/auth/update-me', userData);
      // Update stored user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Update password
  async updatePassword(passwordData) {
    try {
      const response = await api.patch('/auth/update-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Request password reset
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await api.patch('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get current user from localStorage
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