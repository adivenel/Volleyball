// src/pages/news/ui/NewsContent.tsx
import React from 'react';
import { NewsSection } from '@/entities/news/ui/NewsSection/NewsSection';
import { useNews } from '@/shared/api/hooks';

export const NewsContentPage: React.FC = () => {
  const { news, loading, error } = useNews();

  if (loading) {
    return <NewsContentSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 dark:text-red-400">Ошибка загрузки новостей: {error}</p>
      </div>
    );
  }

  // Форматируем дату для отображения
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Преобразуем API новости в формат, ожидаемый NewsSection
  const formattedNews = news.map(item => ({
    id: item.id,
    title: item.title,
    date: formatDate(item.date),
    excerpt: item.excerpt,
    imageUrl: item.image_url,
  }));

  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-5">
        <NewsSection news={formattedNews} />
      </div>
    </div>
  );
};

export default NewsContentPage;

import { NewsContentSkeleton } from './NewsContentSkeleton';