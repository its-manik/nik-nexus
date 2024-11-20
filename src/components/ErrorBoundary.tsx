import React, { Component, ErrorInfo } from 'react';
import { monitor } from '../lib/monitoring';
import { getErrorMessage } from '../types/errors';
import ErrorFallback from './ErrorFallback';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error to monitoring system
    monitor.reportError(error, {
      componentStack: errorInfo.componentStack,
      ...errorInfo,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.state.error && this.props.resetKeys) {
      // Check if any reset keys changed
      if (this.props.resetKeys.some((key, idx) => key !== prevProps.resetKeys?.[idx])) {
        this.reset();
      }
    }
  }

  private reset = () => {
    this.setState({ error: null, errorInfo: null });
  };

  public render() {
    const { error, errorInfo } = this.state;

    if (error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-background-white dark:bg-background-dark min-h-screen">
          <ErrorFallback
            error={error}
            errorInfo={errorInfo}
            resetErrorBoundary={this.reset}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;