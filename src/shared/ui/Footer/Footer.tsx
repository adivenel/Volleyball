import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-custom py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container max-w-6xl mx-auto px-5 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; 2025 Зенит-Казань. Все права защищены.
        </p>
      </div>
    </footer>
  );
};