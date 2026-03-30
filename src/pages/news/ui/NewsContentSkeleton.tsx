import React from 'react';

export const NewsContentSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 animate-pulse">
      <div className="container max-w-6xl mx-auto px-5">
        {/* Заголовок секции (точно как в NewsSection) */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto"></div>
        </div>

        {/* Сетка новостей (3 колонки на больших экранах) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700"
            >
              {/* Место для изображения (если используется) */}
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
              
              {/* Заголовок новости */}
              <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mb-3"></div>
              
              {/* Дата (italic как в NewsCard) */}
              <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-32 mb-4"></div>
              
              {/* Краткое описание */}
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
              
              {/* Кнопка "Читать далее" */}
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsContentSkeleton;