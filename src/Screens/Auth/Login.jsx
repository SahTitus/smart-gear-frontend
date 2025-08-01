import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import google from '../../assets/signin/google.svg';
import apple from '../../assets/signin/Frame 5.svg';
import AuthSplash from '../../components/Auth/AuthSplash';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
    if (authError) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log(formData);
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side */}
      <AuthSplash />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-8 md:px-16 lg:px-24 mt-12">
        <div className='w-[320px] flex flex-col justify-center'>
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800">WELCOME BACK TO</h2>
            <h1 className="text-4xl font-bold">
              SMART<span className="text-green-500">GEAR</span>
            </h1>
            <p className="mt-4 text-lg text-gray-800 font-medium">Sign In</p>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-2 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
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
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-green-500 hover:text-green-600 underline">
                Forgot Password?
              </Link>
            </div>

            {/* Or Sign In With */}
            <div className="mt-6">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-gray-500 text-sm">or Sign In With</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="flex items-center w-full justify-center gap-3">
                <button type="button" className='cursor-pointer'>
                  <img src={apple} alt="apple logo" className='w-7 h-7'/>
                </button>
                <button type="button" className='cursor-pointer'>
                  <img src={google} alt="google logo" className='w-7 h-7' />
                </button>
              </div>
              <Link to="/signup">
                <p className='text-sm underline-offset-2 decoration-green-700 hover:underline text-gray-500 mt-4 text-center'>
                  Don't have an account? <span className='text-green-700'>Sign Up</span>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 