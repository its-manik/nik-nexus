import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';
import { getErrorMessage } from '../types/errors';

interface ErrorFallbackProps {
  error: Error;
  errorInfo?: React.ErrorInfo | null;
  resetErrorBoundary?: () => void;
}

function ErrorFallback({ error, errorInfo, resetErrorBoundary }: ErrorFallbackProps) {
  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-status-error-light dark:bg-status-error-dark/20 rounded-full p-3 mb-4">
        <AlertCircle className="w-8 h-8 text-status-error-DEFAULT dark:text-status-error-light" />
      </div>
      
      <h3 className="text-lg font-medium text-text-primary dark:text-text-dark mb-2">Something went wrong</h3>
      <p className="text-sm text-text-light dark:text-text-dark-secondary text-center max-w-md mb-4">{errorMessage}</p>

      {errorInfo && process.env.NODE_ENV === 'development' && (
        <pre className="mt-4 p-4 bg-background-light dark:bg-background-darker rounded-lg text-xs text-text-primary dark:text-text-dark overflow-auto max-w-full max-h-48 mb-4">
          {errorInfo.componentStack}
        </pre>
      )}

      {resetErrorBoundary && (
        <Button
          onClick={resetErrorBoundary}
          variant="outline"
          className="border-status-error-light dark:border-status-error-dark text-status-error-DEFAULT dark:text-status-error-light hover:bg-status-error-light/10 dark:hover:bg-status-error-dark/10"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorFallback;