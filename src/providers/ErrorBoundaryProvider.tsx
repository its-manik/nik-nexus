import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { monitor } from '../lib/monitoring';

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
}

function ErrorBoundaryProvider({ children }: ErrorBoundaryProviderProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    monitor.reportError(error, {
      componentStack: errorInfo.componentStack,
      ...errorInfo,
    });
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryProvider;