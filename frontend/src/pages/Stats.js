// src/pages/Stats/Stats.js
import React from 'react';
import useBookStats from '../hooks/useBookStats';
import { useAuth } from '../auth/AuthContext'; 


const Stats = () => {
  const { total, owned, reading, wishlist } = useBookStats();
  const { user } = useAuth();
  
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        📈 Book Collection Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Stat Card - Total */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-base font-medium text-gray-500 mb-2">Total Books</h3>
          <p className="text-4xl font-bold text-indigo-600">{total}</p>
        </div>

        {/* Stat Card - Dimiliki */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-base font-medium text-gray-500 mb-2">Book Owned</h3>
          <p className="text-4xl font-bold text-green-600">{owned}</p>
        </div>

        {/* Stat Card - Dibaca */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-base font-medium text-gray-500 mb-2">Currently Reading</h3>
          <p className="text-4xl font-bold text-orange-600">{reading}</p>
        </div>

        {/* Stat Card - Wishlist */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-base font-medium text-gray-500 mb-2">Want to Buy</h3>
          <p className="text-4xl font-bold text-red-600">{wishlist}</p>
        </div>
      </div>

      {/* Progress Section */}
      {total > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              Ownership Progress:
            </span>
            
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-[width] duration-500 ease-out" 
                style={{ width: `${(owned / total) * 100}%` }}
              />
            </div>
            
            <span className="text-sm font-semibold text-gray-700 min-w-[70px] text-right">
              {((owned / total) * 100).toFixed(1)}%
            </span>
          </div>
          
          <p className="text-sm text-gray-500 mt-3 text-center">
            {owned} Of {total} Books Has Become {user?.username}'s Personal Collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default Stats;