import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizes: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`${sizes[size]} ${className}`} role="status">
      <div 
        className={`
          animate-spin rounded-full h-full w-full 
          border-4 border-brand-primary dark:border-brand-primary/80 
          border-t-transparent
          transition-colors
        `} 
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;