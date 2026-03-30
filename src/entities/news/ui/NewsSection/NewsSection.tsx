import React from 'react';
import { NewsCard } from '../NewsCard/NewsCard';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  title?: string;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ 
  news, 
  title = "Новости клуба" 
}) => {
  const handleReadMore = (newsId: number) => {
    console.log('Opening news:', newsId);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zenit-blue dark:text-blue-400 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(item => (
            <NewsCard
              key={item.id}
              news={item}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};