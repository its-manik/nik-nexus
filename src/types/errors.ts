import { z } from 'zod';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }

  static isAPIError(error: unknown): error is APIError {
    return error instanceof APIError;
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError
  ) {
    super(message);
    this.name = 'ValidationError';
  }

  static isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }

  static isNetworkError(error: unknown): error is NetworkError {
    return error instanceof NetworkError;
  }
}

export function getErrorMessage(error: unknown): string {
  if (APIError.isAPIError(error)) {
    return `API Error: ${error.message} (${error.status})`;
  }

  if (ValidationError.isValidationError(error)) {
    return `Validation Error: ${error.message}`;
  }

  if (NetworkError.isNetworkError(error)) {
    return `Network Error: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}