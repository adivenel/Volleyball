export interface BaseEntity {
  id: number;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}