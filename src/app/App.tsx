import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider } from '../shared/lib/context/ThemeContext';
import { BaseLayout } from '../widgets/layout/ui/BaseLayout/BaseLayout';
import { ErrorBoundary } from '../shared/ui/ErrorBoundary/ErrorBoundary';
import { HomeContentSkeleton } from '../pages/home/ui/HomeContentSkeleton';
import { NewsContentSkeleton } from '../pages/news/ui/NewsContentSkeleton';
import { AchievementsContentSkeleton } from '../pages/achievements/ui/AchievementsContentSkeleton';
import { TeamContentSkeleton } from '../pages/team/ui/TeamContentSkeleton';
import { AuthProvider } from '../features/auth/model/AuthProvider';
import './styles/temp.css';

type TabType = 'home' | 'news' | 'achievements' | 'team';

// ИСПРАВЛЕННЫЕ импорты для ленивой загрузки
const HomeContent = lazy(() => import('../pages/home/ui/HomeContent').then(module => ({ default: module.HomeContent })));
const NewsContentPage = lazy(() => import('../pages/news/ui/NewsContent').then(module => ({ default: module.NewsContentPage })));
const AchievementsContent = lazy(() => import('../pages/achievements/ui/AchievementsContent').then(module => ({ default: module.AchievementsContent })));
const TeamContent = lazy(() => import('../pages/team/ui/TeamContent').then(module => ({ default: module.TeamContent })));

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'news':
        return (
          <ErrorBoundary
            fallback={
              <div className="container max-w-6xl mx-auto px-5 py-12 text-center">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Ошибка загрузки новостей
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Не удалось загрузить новости. Пожалуйста, попробуйте позже.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-zenit-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Обновить страницу
                </button>
              </div>
            }
          >
            <Suspense fallback={<NewsContentSkeleton />}>
              <NewsContentPage />
            </Suspense>
          </ErrorBoundary>
        );
      case 'achievements':
        return (
          <ErrorBoundary
            fallback={
              <div className="container max-w-6xl mx-auto px-5 py-16 text-center">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Ошибка загрузки достижений
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Не удалось загрузить список достижений.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-6 py-2 bg-zenit-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Вернуться на главную
                </button>
              </div>
            }
          >
            <Suspense fallback={<AchievementsContentSkeleton />}>
              <AchievementsContent />
            </Suspense>
          </ErrorBoundary>
        );
      case 'team':
        return (
          <ErrorBoundary
            fallback={
              <div className="container max-w-6xl mx-auto px-5 py-12 text-center">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Ошибка загрузки состава команды
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Не удалось загрузить информацию об игроках.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-zenit-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Обновить страницу
                </button>
              </div>
            }
          >
            <Suspense fallback={<TeamContentSkeleton />}>
              <TeamContent />
            </Suspense>
          </ErrorBoundary>
        );
      default:
        return (
          <ErrorBoundary
            fallback={
              <div className="container mx-auto px-4 py-8 text-center">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Ошибка загрузки главной страницы
                </h3>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-zenit-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Перезагрузить страницу
                </button>
              </div>
            }
          >
            <Suspense fallback={<HomeContentSkeleton />}>
              <HomeContent />
            </Suspense>
          </ErrorBoundary>
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <BaseLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </BaseLayout>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;