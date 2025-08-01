import React from 'react';
import AppleLogo from '../../assets/Ellipse1.png'; // Assuming your Apple logo image is here
import iPhone from '../../assets/Ellipse2.png'; // Assuming your Apple logo image is here

const BrandSection = () => {
  return (
    <div className="relative min-w-[400px] h-[250px] bg-gray-800 rounded-3xl overflow-hidden shadow-xl font-sans text-white flex items-center">
      {/* Background Shapes and Gradients */}
      {/* Large subtle circular/curved shape on the right */}
      <div className="absolute right-0 top-0 w-[300px] h-[300px] flex justify-center items-center bg-transparent border-2 border-gray-200 rounded-full translate-x-1/5 -translate-y-2/5 opacity-40">
        <div className='w-[90%] h-[90%] bg-gray-200 rounded-full opacity-40'></div>
      </div>
      
      {/* Dark gradient/shadow at the bottom under the phones */}
      {/* This creates the effect of the phones sitting on a dark surface and slightly bleeding off */}
      {/* <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-black via-gray-800/10 to-transparent"></div> */}


      {/* Left Section: Content */}
      <div className="z-10 pl-8 flex flex-col justify-center ">
        {/* IPHONE Badge */}
        <div className="bg-gray-700 px-4 py-1 rounded-full text-sm mb-4 inline-block">
          IPHONE
        </div>

        {/* Apple Logo */}
        <div className="w-20 h-20 bg-white rounded-lg flex justify-center items-center mb-6">
          <img src={AppleLogo} alt="Apple Logo" className="w-12 h-12" />
        </div>

        <div className="text-3xl font-semibold leading-tight">
          UP to 80% OFF
        </div>
      </div>

      {/* Right Section: Product Image */}
      {/* The image is positioned absolutely to allow it to extend beyond the card boundaries */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center pr-4">
        <img
          src="https://via.placeholder.com/250x250/333333/FFFFFF?text=iPhones" // Placeholder for iPhone image
          alt="iPhones"
          className="h-[110%] w-auto object-contain drop-shadow-xl" // Increased height to bleed off, drop-shadow for effect
        />
      </div>
    </div>
  );
};

export default BrandSection;