import React from 'react';
import { useTheme } from '../../../shared/lib/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button 
      className="w-10 h-10 flex items-center justify-center bg-transparent border-none text-2xl cursor-pointer rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
      onClick={handleClick}
      aria-label="Переключить тему"
      title={darkMode ? 'Светлая тема' : 'Темная тема'}
      style={{ background: 'transparent', border: 'none', outline: 'none' }}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};