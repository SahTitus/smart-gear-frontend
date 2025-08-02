import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  // Load user data on app initialization
  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      if (authService.isAuthenticated()) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser?.user || currentUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      setUser(null);
      setError(err.message || 'Session invalid. Please log in.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Run loadUser on component mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.updateProfile(userData);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Profile update failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.updatePassword(passwordData);
      return response;
    } catch (err) {
      setError(err.message || 'Password update failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.forgotPassword(email);
      return response;
    } catch (err) {
      setError(err.message || 'Forgot password request failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (resetData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.resetPassword(resetData);
      return response;
    } catch (err) {
      setError(err.message || 'Password reset failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
  };

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
    loadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};