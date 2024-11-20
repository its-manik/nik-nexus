import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  /** The error to display. Can be an Error object, string, or unknown type */
  error: Error | string | unknown;
  /** Optional callback function to retry the failed operation */
  onRetry?: () => void;
  /** Additional CSS classes to apply to the container */
  className?: string;
}

/**
 * ErrorState component displays error messages with optional retry functionality.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorState error={new Error('Failed to load data')} />
 * 
 * // With retry functionality
 * <ErrorState 
 *   error="Network error occurred" 
 *   onRetry={() => refetchData()} 
 * />
 * ```
 */
function ErrorState({ error, onRetry, className = '' }: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : 
    typeof error === 'string' ? error : 
    'An unexpected error occurred';

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="rounded-full bg-status-error-light dark:bg-status-error-dark/20 p-3">
        <AlertTriangle className="h-6 w-6 text-status-error-DEFAULT dark:text-status-error-light" />
      </div>
      <p className="mt-4 text-sm text-text-light dark:text-text-dark-secondary">
        {errorMessage}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm text-brand-primary dark:text-brand-primary/80 hover:text-brand-primary/80 dark:hover:text-brand-primary"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;