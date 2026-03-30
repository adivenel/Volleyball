import React from 'react';

interface LoadingFallbackProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = 'Загрузка контента...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full border-4 border-gray-300 border-t-zenit-blue dark:border-gray-700 dark:border-t-blue-400 ${sizeClasses[size]}`}></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{message}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Волейбольный клуб "Зенит-Казань"
        </p>
      </div>
    </div>
  );
};