import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 animate-modalFadeIn"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative shadow-2xl border border-gray-200 dark:border-gray-700">
        <button 
          className="absolute right-4 top-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 bg-transparent border-none transition-colors"
          onClick={onClose}
        >
          &times;
        </button>
        {title && (
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pr-8">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};