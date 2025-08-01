import React from 'react';
import { ArrowRight } from 'lucide-react';
import controllerImage from '@/assets/categories/gaming.svg'; // Update path as needed

const DealCard = () => {
  return (
    <div className="relative flex items-center overflow-hidden w-1/2 h-[350px] bg-[#f8fcfb] rounded-xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Text Content */}
        <div className="flex-1 md:pr-8">
          <h1 className="text-3xl font-bold text-[#333333] font-inter">
            SmartGear Flash Deals
          </h1>
          <p className=" leading-[1.75rem] font-normal text-[#333333] mt-3 mb-8 font-inter">
            Shop Today's Deals, Lightning Deals, and limited time discounts
          </p>
          <div className="flex items-center">
            <a
              href="#"
              className="text-sm font-medium text-[#333333] no-underline font-inter"
            >
              See more
            </a>
            <ArrowRight size={15} className="ml-2 text-[#333333]" />
          </div>
        </div>

        {/* Image Content */}
        <div className="absolute -bottom-3 -right-15  h-[95%] mt-8 md:mt-0 overflow-visible">
          <img
            src={controllerImage}
            alt="Black PlayStation 5 controller"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default DealCard;
