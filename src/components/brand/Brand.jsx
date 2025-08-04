import React from 'react'
import BrandSection from './BrandSection'

const Brand = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-5'>
            <BrandSection />
            {/* <BrandSection />
            <BrandSection /> */}
        </div>
    </div>
  )
}

export default Brand