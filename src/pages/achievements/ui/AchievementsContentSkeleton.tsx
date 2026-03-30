import React from 'react';

export const AchievementsContentSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="container max-w-6xl mx-auto px-5">
        {/* Заголовок страницы */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-6"></div>
        </div>

        {/* Карточки достижений */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700 text-center">
              {/* Название достижения */}
              <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mx-auto mb-4"></div>
              
              {/* Значение достижения */}
              <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded w-32 mx-auto mb-3"></div>
              
              {/* Описание */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsContentSkeleton;