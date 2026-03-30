import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('zenit-theme');
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zenit-theme', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    console.log('🔄 Toggle theme called, current:', darkMode, 'new:', !darkMode);
    setDarkMode(prev => !prev);
  };

  console.log('🎨 ThemeProvider rendered, darkMode:', darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};