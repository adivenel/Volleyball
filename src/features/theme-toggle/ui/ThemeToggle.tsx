import React from 'react';
import { useTheme } from '../../../shared/lib/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  console.log('ThemeToggle rendered, darkMode:', darkMode);

  const handleClick = () => {
    console.log('ThemeToggle clicked');
    toggleTheme();
  };

  return (
    <button 
      className="bg-transparent border-none text-xl cursor-pointer text-current p-2 rounded-full transition-colors duration-300 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10"
      onClick={handleClick}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};