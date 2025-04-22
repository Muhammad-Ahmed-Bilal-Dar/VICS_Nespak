import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeMode } from './types';
import { createThemeOptions } from './theme';

/**
 * Hook to manage theme mode (light/dark)
 * Handles storage, toggling, and system preferences
 */
export const useThemeMode = () => {
  const [mode, setMode] = useState<ThemeMode>('light');

  // Check for system preference on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Create the MUI theme based on the current mode
  const theme = useMemo(() => {
    const themeOptions = createThemeOptions(mode);
    return createTheme(themeOptions);
  }, [mode]);

  return { theme, mode, toggleTheme };
};

// Define ThemeWrapper props interface
interface ThemeWrapperProps {
  children: React.ReactNode;
}

/**
 * Theme wrapper component for the application
 * Uses the useThemeMode hook to manage theme state
 */
export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}; 