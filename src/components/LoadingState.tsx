import React from 'react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-primary dark:border-brand-primary/80 border-t-transparent" />
      <p className="mt-4 text-sm text-text-light dark:text-text-dark-secondary">
        {message}
      </p>
    </div>
  );
}

export default LoadingState;