import React from 'react';
import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';
import logoImage from '../../../../public/images/logo.png';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-custom py-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage}
                alt="Логотип Зенит-Казань"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-zenit-blue dark:text-blue-400">
                  ВК "Зенит-Казань"
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Волейбольный клуб
                </p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};