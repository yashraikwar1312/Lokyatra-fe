import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to get theme from localStorage on initialization
    try {
      const storedTheme = localStorage.getItem('nirdeshak-theme') as Theme;
      return storedTheme || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      let shouldBeDark = false;
      
      if (theme === 'system') {
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        shouldBeDark = theme === 'dark';
      }
      
      setIsDark(shouldBeDark);
      
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    };

    updateTheme();

    // Listen for system theme changes when theme is 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem('nirdeshak-theme', newTheme);
    } catch {
      // Handle localStorage errors gracefully
      console.warn('Failed to save theme preference to localStorage');
    }
    setThemeState(newTheme);
  };

  const value: ThemeProviderContextValue = {
    theme,
    setTheme,
    isDark,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}