// src/shared/ui/Button/Button.tsx
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'close';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  // Для совместимости со старыми stories
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  // Совместимость
  primary,
  size,
  label
}) => {
  // Определяем variant на основе primary
  const actualVariant = primary ? 'primary' : variant;
  
  const getButtonClass = () => {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
    
    // Обработка size если нужно
    const sizeClass = size === 'small' ? 'px-4 py-2 text-sm' : 
                     size === 'large' ? 'px-8 py-4 text-lg' : '';
    
    switch (actualVariant) {
      case 'success':
        return `${baseClasses} ${sizeClass} bg-green-600 hover:bg-green-700 text-white`;
      case 'close':
        return `${baseClasses} ${sizeClass} bg-gray-600 hover:bg-gray-700 text-white`;
      default:
        return `${baseClasses} ${sizeClass} bg-zenit-blue hover:bg-zenit-dark text-white`;
    }
  };

  // Используем label если передан, иначе children
  const buttonContent = label || children;

  return (
    <button
      type={type}
      className={`${getButtonClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};