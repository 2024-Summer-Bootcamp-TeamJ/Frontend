import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { themes, Theme } from './theme';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.oh,
  setTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
  initialTheme?: Theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = themes.oh }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    console.log('Theme updated:', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
