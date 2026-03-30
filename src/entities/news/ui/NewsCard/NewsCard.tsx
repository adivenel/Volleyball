import React from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
}

interface NewsCardProps {
  news: NewsItem;
  onReadMore?: (id: number) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ 
  news, 
  onReadMore 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {news.imageUrl && (
        <img 
          src={news.imageUrl} 
          alt={news.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {news.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 italic mb-3">{news.date}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {news.excerpt}
      </p>
      {onReadMore && (
        <button 
          className="w-full bg-zenit-blue hover:bg-zenit-dark text-white py-3 rounded-lg font-semibold transition-colors duration-300 mt-4"
          onClick={() => onReadMore(news.id)}
        >
          Читать далее
        </button>
      )}
    </div>
  );
};