import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser.user || currentUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.updateProfile(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update password function
  const updatePassword = async (passwordData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.updatePassword(passwordData);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (resetData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.resetPassword(resetData);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword,
    isAuthenticated,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 