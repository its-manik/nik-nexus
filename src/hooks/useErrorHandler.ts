import { useCallback } from 'react';
import { APIClientError } from '../lib/api/types';

export function useErrorHandler() {
  return useCallback((error: unknown) => {
    if (error instanceof APIClientError) {
      console.error('API Error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      return error.message;
    }

    if (error instanceof Error) {
      console.error('Application Error:', error);
      return error.message;
    }

    console.error('Unknown Error:', error);
    return 'An unexpected error occurred';
  }, []);
}