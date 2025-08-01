import React from 'react';
import { Link } from 'react-router-dom';
import google from '@/assets/signin/google.svg';
import apple from '@/assets/signin/Frame 5.svg';
import AuthSplash from '../../components/Auth/AuthSplash';

const SignUp = () => {
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
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Username / E-mail"
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-2 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border-b-2 border-gray-300 text-sm text-gray-700 pb-1 outline-none hover:border-green-500 transition-all"
            />
            <div className="flex gap-2 whitespace-break-spaces text-[12px]">
              <input type="checkbox" className="mt-1 accent-teal-500 border-xl w-4 h-4 " />
              <p className="text-sm text-gray-700">
                I agree to the <span className="text-green-500 underline hover:text-green-600 cursor-pointer pr-1">term of service</span>
                 and 
                <span className="text-green-500  underline hover:text-green-600 cursor-pointer pl-1">privacy policy</span>
              </p>
            </div>
            {/* Submit Button */}
            <div className="">
              <button className=" btn-background text-white font-semibold py-2 px-6 rounded-full transition-all w-full">
                Create Account
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
