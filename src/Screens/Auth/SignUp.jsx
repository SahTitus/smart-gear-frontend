import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import google from '../../assets/signin/google.svg';
import apple from '../../assets/signin/Frame 5.svg';
import AuthSplash from '../../components/Auth/AuthSplash';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { register, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

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
    
    if (!agreeToTerms) {
      setError('Please agree to the terms of service and privacy policy');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      console.error('SignUp error:', err);
      if (err.message) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else if (err.error) {
        setError(err.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">

      {/* Left Side */}
      <AuthSplash />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-8 md:px-16 lg:px-24 mt-12 *">
        <div className='w-[320px] flex flex-col justify-center '>
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800">WELCOME TO</h2>
            <h1 className="text-4xl font-bold">
              SMART<span className="text-green-500">GEAR</span>
            </h1>
            <p className="mt-4 text-lg text-gray-800 font-medium">Sign Up</p>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-2 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Second Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-2 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
            />
            <div className="flex gap-2 whitespace-break-spaces text-[12px]">
              <input 
                type="checkbox" 
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 accent-teal-500 border-xl w-4 h-4 " 
              />
              <p className="text-sm text-gray-700">
                I agree to the <span className="text-green-500 underline hover:text-green-600 cursor-pointer pr-1">term of service</span>
                 and 
                <span className="text-green-500  underline hover:text-green-600 cursor-pointer pl-1">privacy policy</span>
              </p>
            </div>
            {/* Submit Button */}
            <div className="">
              <button 
                type="submit"
                disabled={isLoading}
                className="btn-background text-white font-semibold py-2 px-6 rounded-full transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
            {/* Or Sign Up With */}
            <div className="mt-6">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-gray-500 text-sm">or Sign Up With</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="flex items-center w-full justify-center gap-3">
                <button className='cursor-pointer'>
                  <img src={apple} alt="apple logo" className='w-7 h-7'/>
                </button>
                <button className='cursor-pointer'>
                  <img src={google} alt="google logo" className='w-7 h-7' />
                </button>
              </div>
              <Link to="/login">
                <p className='text-sm underline-offset-2 decoration-green-700 hover:underline text-gray-500 mt-4 text-center'>
                  Already have an account? <span className='text-green-700'>Sign In</span>
                </p>
              </Link>
            </div>
          </form>
                </div>
        </div>
    </div>
  );
};

export default SignUp;
