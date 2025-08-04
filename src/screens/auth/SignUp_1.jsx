import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Column - Branding */}
      <div className="flex-1 w-1/2 bg-gray-50 relative flex items-center justify-center overflow-hidden">
        <div className="text-center z-10 relative">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-30 h-20 bg-green-800 rounded-2xl relative mx-auto flex items-center justify-center">
              <div className="w-2 h-10 bg-white rounded mr-4"></div>
              <div className="w-8 h-6 bg-green-400 rounded-full rounded-br-none transform -rotate-45"></div>
            </div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-4xl font-bold tracking-wider uppercase">
            <span className="text-gray-800">SMART</span>
            <span className="text-green-400">GEAR</span>
          </h1>
        </div>

        {/* Background Circles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-50 h-50 bg-yellow-400 rounded-full top-10 -right-12 opacity-30"></div>
          <div className="absolute w-40 h-40 bg-green-400 rounded-full top-15 -right-8 opacity-40"></div>
          <div className="absolute w-45 h-45 bg-green-400 rounded-full bottom-20 -left-15 opacity-30"></div>
          <div className="absolute w-25 h-25 bg-yellow-400 rounded-full bottom-10 right-20 opacity-40"></div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-2 bg-white flex items-center justify-center px-8 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-sm font-normal text-gray-800 tracking-wider uppercase mb-2">
              WELCOME TO
            </h2>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gray-800">SMART</span>
              <span className="text-green-400">GEAR</span>
            </h1>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full py-3 border-b border-gray-300 text-base font-inter bg-transparent outline-none focus:border-green-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full py-3 border-b border-gray-300 text-base font-inter bg-transparent outline-none focus:border-green-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full py-3 border-b border-gray-300 text-base font-inter bg-transparent outline-none focus:border-green-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full py-3 border-b border-gray-300 text-base font-inter bg-transparent outline-none focus:border-green-400 transition-colors duration-300"
                required
              />
            </div>

            {/* Terms and Policy Checkbox */}
            <div className="mb-8">
              <label className="flex items-start cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="absolute opacity-0 cursor-pointer h-0 w-0"
                />
                <span className={`h-5 w-5 border-2 rounded mr-3 mt-0.5 flex-shrink-0 relative ${
                  agreeToTerms ? 'bg-green-400 border-green-400' : 'bg-white border-gray-300'
                }`}>
                  {agreeToTerms && (
                    <span className="absolute left-1.5 top-0.5 w-1.5 h-2.5 border-r-2 border-b-2 border-white transform rotate-45"></span>
                  )}
                </span>
                <span className="text-sm text-gray-800 leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-blue-500 underline font-medium hover:text-blue-700">
                    TERMS OF SERVICES
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-500 underline font-medium hover:text-blue-700">
                    PRIVACY POLICY
                  </a>
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button 
              type="submit" 
              className="w-full py-3 px-8 bg-green-400 text-white border-none rounded-lg text-lg font-bold font-inter cursor-pointer transition-all duration-300 shadow-md hover:bg-green-500 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 mb-8"
            >
              Sign Up
            </button>

            {/* Social Sign Up Separator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gray-300 max-w-40"></div>
              <span className="mx-4 text-gray-500 text-sm">or Sign Up With</span>
              <div className="flex-1 h-px bg-gray-300 max-w-40"></div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">
              <button 
                type="button" 
                className="w-12 h-12 border-2 border-gray-300 rounded-full bg-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-green-400 hover:-translate-y-0.5 hover:shadow-md p-0"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button 
                type="button" 
                className="w-12 h-12 border-2 border-gray-300 rounded-full bg-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-green-400 hover:-translate-y-0.5 hover:shadow-md p-0"
              >
                <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;