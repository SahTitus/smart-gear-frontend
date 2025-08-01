import React from 'react'
import LoadingSpinner from './LoadingSpinner'

export const LoadingComponent = () => {
  return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-green-600">Featured Products</h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </section>
  )
}
