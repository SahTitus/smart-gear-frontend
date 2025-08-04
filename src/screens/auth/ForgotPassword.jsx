import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthSplash from '../../components/auth/AuthSplash';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { forgotPassword, error: authError, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
    if (authError) clearError();
  };

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
              Password reset email sent! Please check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-2 outline-none hover:border-green-500 transition-all"
            />

            {/* Submit Button */}
            <div className="">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-background text-white font-semibold py-2 px-6 rounded-full transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword; 