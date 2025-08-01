import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthSplash from '../../components/Auth/AuthSplash';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { resetPassword, error: authError, clearError } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
    if (authError) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await resetPassword({
        token,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen w-full">
        <AuthSplash />
        <div className="w-full md:w-1/2 flex justify-center items-center px-8 md:px-16 lg:px-24 mt-12">
          <div className='w-[320px] flex flex-col justify-center'>
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-800">INVALID</h2>
              <h1 className="text-4xl font-bold">
                SMART<span className="text-green-500">GEAR</span>
              </h1>
              <p className="mt-4 text-lg text-gray-800 font-medium">Reset Link</p>
            </div>
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Invalid or expired reset link. Please request a new password reset.
            </div>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-green-500 hover:text-green-600 underline">
                Request New Reset Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side */}
      <AuthSplash />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-8 md:px-16 lg:px-24 mt-12">
        <div className='w-[320px] flex flex-col justify-center'>
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800">RESET YOUR</h2>
            <h1 className="text-4xl font-bold">
              SMART<span className="text-green-500">GEAR</span>
            </h1>
            <p className="mt-4 text-lg text-gray-800 font-medium">Password</p>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error || authError}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Password reset successfully! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-2 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
            />
            
            {/* Submit Button */}
            <div className="">
              <button 
                type="submit"
                disabled={isLoading}
                className="btn-background text-white font-semibold py-2 px-6 rounded-full transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link to="/login" className="text-sm text-green-500 hover:text-green-600 underline">
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 