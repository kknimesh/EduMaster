import React, { useState, useEffect, createContext, useContext } from 'react';
import { Icons } from '../../assets/icons';

// Dark Mode Context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (darkMode: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Dark Mode Provider
interface DarkModeProviderProps {
  children: React.ReactNode;
  defaultDarkMode?: boolean;
  storageKey?: string;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
  defaultDarkMode = false,
  storageKey = 'edu-master-dark-mode'
}) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultDarkMode);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem(storageKey);
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      // Check system preference
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDarkMode);
    }
  }, [storageKey]);

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem(storageKey, isDarkMode.toString());
  }, [isDarkMode, storageKey]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setDarkMode = (darkMode: boolean) => {
    setIsDarkMode(darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Hook to use dark mode
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Dark Mode Toggle Component
interface DarkModeToggleProps {
  variant?: 'switch' | 'button' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  variant = 'switch',
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      button: 'p-1.5 text-sm',
      icon: 'p-1.5',
      iconSize: 'h-4 w-4',
      text: 'text-sm'
    },
    md: {
      switch: 'w-11 h-6',
      button: 'p-2 text-base',
      icon: 'p-2',
      iconSize: 'h-5 w-5',
      text: 'text-base'
    },
    lg: {
      switch: 'w-14 h-7',
      button: 'p-3 text-lg',
      icon: 'p-3',
      iconSize: 'h-6 w-6',
      text: 'text-lg'
    }
  };

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className={`font-medium text-gray-900 dark:text-white ${sizeClasses[size].text}`}>
            Dark Mode
          </span>
        )}
        <button
          onClick={toggleDarkMode}
          className={`
            ${sizeClasses[size].switch} relative inline-flex items-center rounded-full
            transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={isDarkMode}
          aria-label="Toggle dark mode"
        >
          <span
            className={`
              inline-block rounded-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
              ${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}
              ${isDarkMode 
                ? (size === 'sm' ? 'translate-x-4' : size === 'md' ? 'translate-x-5' : 'translate-x-7')
                : 'translate-x-0.5'
              }
            `}
          >
            {isDarkMode ? (
              <Icons.Moon className={`${sizeClasses[size].iconSize} text-blue-600 m-auto mt-0.5`} />
            ) : (
              <Icons.Sun className={`${sizeClasses[size].iconSize} text-yellow-500 m-auto mt-0.5`} />
            )}
          </span>
        </button>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggleDarkMode}
        className={`
          ${sizeClasses[size].button} flex items-center space-x-2 rounded-lg font-medium
          bg-gray-100 hover:bg-gray-200 text-gray-900 
          dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white
          transition-colors duration-200 ${className}
        `}
      >
        {isDarkMode ? (
          <Icons.Sun className={sizeClasses[size].iconSize} />
        ) : (
          <Icons.Moon className={sizeClasses[size].iconSize} />
        )}
        {showLabel && (
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        )}
      </button>
    );
  }

  // Icon variant
  return (
    <button
      onClick={toggleDarkMode}
      className={`
        ${sizeClasses[size].icon} rounded-full
        text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Icons.Sun className={sizeClasses[size].iconSize} />
      ) : (
        <Icons.Moon className={sizeClasses[size].iconSize} />
      )}
    </button>
  );
};

// Dark Mode Aware Component HOC
export const withDarkMode = <P extends object>(
  Component: React.ComponentType<P & { isDarkMode: boolean }>
) => {
  return (props: P) => {
    const { isDarkMode } = useDarkMode();
    return <Component {...props} isDarkMode={isDarkMode} />;
  };
};

// Theme-aware CSS classes utility
export const themeClasses = {
  // Backgrounds
  bg: {
    primary: 'bg-white dark:bg-gray-900',
    secondary: 'bg-gray-50 dark:bg-gray-800',
    card: 'bg-white dark:bg-gray-800',
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-700'
  },
  // Text
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400'
  },
  // Borders
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600'
  },
  // Inputs
  input: {
    primary: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white',
    focus: 'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400'
  }
};

// System Theme Detector
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return systemTheme;
};

export default DarkModeToggle;