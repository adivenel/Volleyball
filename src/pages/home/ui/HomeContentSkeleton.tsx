import React from 'react';

export const HomeContentSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-24">
        <div className="container max-w-4xl mx-auto px-5">
          <div className="text-center">
            {/* Main Title */}
            <div className="h-14 bg-gray-400 dark:bg-gray-700 rounded-xl w-80 mx-auto mb-8"></div>
            
            {/* Description lines */}
            <div className="space-y-4 mb-12 max-w-3xl mx-auto">
              <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-11/12 mx-auto"></div>
              <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-10/12 mx-auto"></div>
            </div>
            
            {/* Buy Tickets Button */}
            <div className="inline-block h-14 w-56 bg-gray-400 dark:bg-gray-700 rounded-xl shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Matches Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto px-5">
          {/* Section Title */}
          <div className="mb-16">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-80 mx-auto"></div>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                {/* Match Header */}
                <div className="mb-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-48 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-32"></div>
                    <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-24"></div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>

                {/* Location Info */}
                <div className="space-y-3 mb-8">
                  <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-40"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>

                {/* Action Button */}
                <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContentSkeleton;