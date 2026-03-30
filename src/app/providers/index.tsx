import React from 'react';
import { ThemeProvider } from '../../shared/lib/context/ThemeContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};