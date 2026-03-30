import React from 'react';

export const TeamContentSkeleton: React.FC = () => {
  return (
    <div className="py-12 animate-pulse">
      <div className="container max-w-6xl mx-auto px-5">
        {/* Заголовок страницы */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-6"></div>
        </div>

        {/* Сетка игроков */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-custom border border-gray-200 dark:border-gray-700">
              {/* Фото игрока (скелетон) */}
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
              
              {/* Информация об игроке */}
              <div className="space-y-3">
                {/* Имя и фамилия */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
                
                {/* Номер и позиция */}
                <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
                
                {/* Рост и возраст */}
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Показываем еще игроков при необходимости */}
        <div className="mt-8 text-center">
          <div className="inline-block h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamContentSkeleton;