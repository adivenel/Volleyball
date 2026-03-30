import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'close';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
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
  primary,
  size,
  label
}) => {
  const actualVariant = primary ? 'primary' : variant;
  
  const getButtonClass = () => {
    const baseClasses = "rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";
    
    const sizeClass = size === 'small' ? 'px-3 py-1.5 text-sm' : 
                     size === 'large' ? 'px-8 py-4 text-lg' : 
                     'px-5 py-2 text-base';
    
    switch (actualVariant) {
      case 'success':
        return `${baseClasses} ${sizeClass} bg-green-600 hover:bg-green-700 text-white`;
      case 'close':
        return `${baseClasses} ${sizeClass} bg-gray-600 hover:bg-gray-700 text-white`;
      default:
        return `${baseClasses} ${sizeClass} bg-zenit-blue hover:bg-zenit-dark text-white`;
    }
  };

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