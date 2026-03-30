// src/pages/achievements/ui/AchievementsContent.tsx
import React from 'react';
import { useAchievements } from '@/shared/api/hooks';

export const AchievementsContent: React.FC = () => {
  const { achievements, loading, error } = useAchievements();

  if (loading) {
    return <AchievementsContentSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 dark:text-red-400">Ошибка загрузки достижений: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zenit-blue dark:text-blue-400 mb-12">
          Достижения клуба
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                {achievement.title}
              </h3>
              <p className="text-2xl font-bold text-zenit-blue dark:text-blue-400 mb-2">
                {achievement.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { AchievementsContentSkeleton } from './AchievementsContentSkeleton';

export default AchievementsContent;