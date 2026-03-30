import React, { useState } from 'react';

type TabType = 'home' | 'news' | 'achievements' | 'team';

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);

  const tabs: { key: TabType; label: string }[] = [
    { key: 'home', label: 'Главная' },
    { key: 'news', label: 'Новости' },
    { key: 'achievements', label: 'Достижения' },
    { key: 'team', label: 'Команда' },
  ];

  const handleMouseEnter = (tab: TabType) => {
    setHoveredTab(tab);
    if (tab !== 'home') {
      switch (tab) {
        case 'news':
          import('@/pages/news/ui/NewsContent');
          break;
        case 'achievements':
          import('@/pages/achievements/ui/AchievementsContent');
          break;
        case 'team':
          import('@/pages/team/ui/TeamContent');
          break;
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
  };

  const handleClick = (tab: TabType) => {
    onTabChange(tab);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container max-w-6xl mx-auto px-5">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleClick(tab.key)}
              onMouseEnter={() => handleMouseEnter(tab.key)}
              onMouseLeave={handleMouseLeave}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-zenit-blue text-zenit-blue dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {hoveredTab === tab.key && tab.key !== 'home' && (
                <span className="ml-2 text-xs text-gray-400">(загружается...)</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};