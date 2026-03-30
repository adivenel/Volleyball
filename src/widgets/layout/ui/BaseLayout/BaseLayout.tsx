import React from 'react';
import { Header } from '@/shared/ui/Header/Header'; // Убедитесь, что путь правильный
import { Footer } from '@/shared/ui/Footer/Footer';
import { NavigationTabs } from '@/shared/ui/NavigationTabs/NavigationTabs';
import { useTheme } from '@/shared/lib/context/ThemeContext';

interface BaseLayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'news' | 'achievements' | 'team';
  onTabChange: (tab: 'home' | 'news' | 'achievements' | 'team') => void;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : 'light'}`}>
      <Header />
      <NavigationTabs activeTab={activeTab} onTabChange={onTabChange} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};