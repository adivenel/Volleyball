import { useEffect } from 'react';

export const usePreload = (tab: 'news' | 'achievements' | 'team') => {
  useEffect(() => {
    let preloadModule: Promise<any>;

    switch (tab) {
      case 'news':
        preloadModule = import('@/pages/news/ui/NewsContent');
        break;
      case 'achievements':
        preloadModule = import('@/pages/achievements/ui/AchievementsContent');
        break;
      case 'team':
        preloadModule = import('@/pages/team/ui/TeamContent');
        break;
      default:
        return;
    }

    preloadModule.catch(() => {
      // Обработка ошибок предзагрузки
      console.warn(`Failed to preload ${tab} module`);
    });
  }, [tab]);
};