import React, { useState } from 'react';
import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';
import { AuthModal, useAuth } from '@/features/auth';
import logoImage from '../../../../public/images/logo.png';

export const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-custom py-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between">
            {/* Левая часть - логотип и название */}
            <div className="flex items-center gap-3 flex-shrink-0">
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
            
            {/* Правая часть - кнопки */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {/* Исправлен цвет текста для темной темы */}
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {user?.email}
                    </span>
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                        <div className="py-1">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            Выйти
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-5 py-2 rounded-lg font-semibold transition-all duration-300 bg-zenit-blue hover:bg-zenit-dark text-white whitespace-nowrap text-sm"
                >
                  Войти
                </button>
              )}
              
              {/* Кнопка темы */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};