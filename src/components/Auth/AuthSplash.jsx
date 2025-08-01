import React from 'react'
import logo from '@/assets/logo.png';
import ellipse3 from '@/assets/signin/Ellipse 3.svg';
import ellipse2 from '@/assets/signin/Ellipse 2.svg';
import ellipse5 from '@/assets/signin/Ellipse 5.svg';
import ellipse7 from '@/assets/signin/Ellipse 7.svg';
import ellipse4 from '@/assets/signin/Ellipse 4.svg';

const AuthSplash = () => {
  return (
    <div className="bg-gray-100 relative overflow-hidden hidden flex-col items-center justify-center w-full md:w-[45%] p-6 flex-none md:flex">
        <div className="absolute top-0 right-0">
          <img src={ellipse3} alt="" className='w-44 z-10 right-[60px] absolute'/>
          <img src={ellipse2} alt="" className='w-28' />
        </div>

        <div className=" absolute left-0">
          <img src={ellipse4} alt="" className='w-20'/>
        </div>

        <img src={logo} alt="smarter logo" className='w-52 h-52'/>
        
        <div className="text-4xl font-bold tracking-wide ">
          SMART<span className="text-green-500">GEAR</span>
        </div>

        <div className="absolute bottom-0 right-2 w-full">
          <img src={ellipse7} alt="" className='w-42 z-10 -right-[24px] absolute bottom-0'/>
          <img src={ellipse5} alt="" className='w-[80px] absolute right-18 bottom-5 ' />
        </div>
      </div>
  )
}

export default AuthSplash;