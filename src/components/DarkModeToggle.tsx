import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className={`
        p-2 rounded-lg 
        text-text-light hover:text-text-primary
        dark:text-text-dark-secondary dark:hover:text-text-dark
        hover:bg-background-light dark:hover:bg-background-darker 
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
        dark:focus:ring-offset-background-dark
        transition-colors
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

export default DarkModeToggle; 