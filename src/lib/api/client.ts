import { z } from 'zod';
import { APIError } from '../../types/errors';

export interface PaginatedData<T> {
  data: T[];
  total: number;
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface APIConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

const DEFAULT_CONFIG: APIConfig = {
  // baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  baseURL: '/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  retries: parseInt(import.meta.env.VITE_API_RETRIES) || 3,
  retryDelay: parseInt(import.meta.env.VITE_API_RETRY_DELAY) || 1000,
};

let apiConfig: APIConfig = { ...DEFAULT_CONFIG };

export function configureAPI(config: Partial<APIConfig>) {
  apiConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string, 
  options: RequestInit & { timeout?: number }
): Promise<Response> {
  const { timeout = apiConfig.timeout, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function shouldRetry(error: unknown, attempt: number, maxRetries: number): Promise<boolean> {
  if (attempt >= maxRetries) return false;

  if (error instanceof APIError) {
    // Retry on network errors or specific status codes
    return error.status >= 500 || error.status === 429;
  }

  return true;
}

export async function fetchAPI<T>(
  endpoint: string, 
  options: FetchOptions = {}
): Promise<T> {
  const {
    params,
    timeout = apiConfig.timeout,
    retries = apiConfig.retries ?? DEFAULT_CONFIG.retries,
    retryDelay = apiConfig.retryDelay ?? DEFAULT_CONFIG.retryDelay,
    ...fetchOptions
  } = options;

  let url = `${apiConfig.baseURL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });
    url += `?${searchParams.toString()}`;
  }

  console.log(`Attempting to fetch from: ${url}`);

  let attempt = 0;
  let lastError: unknown;

  while (attempt < (retries ?? 0)) {
    try {
      console.log(`Attempt ${attempt + 1} of ${retries ?? 0}`);
      const response = await fetchWithTimeout(url, {
        ...fetchOptions,
        timeout,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_API_KEY,
          'X-API-Version': import.meta.env.VITE_API_VERSION || 'v1',
          ...fetchOptions.headers,
        },
      });

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new APIError(
          error.message || `HTTP error! status: ${response.status}`,
          response.status,
          error.code,
          error.details
        );
      }

      return response.json();
    } catch (error) {
      console.error(`Error on attempt ${attempt + 1}:`, error);
      lastError = error;

      if (await shouldRetry(error, attempt, retries ?? 0)) {
        const delay = (retryDelay ?? 0) * Math.pow(2, attempt); // Use nullish coalescing
        console.log(`Retrying in ${delay}ms`);
        await wait(delay);
        attempt++;
        continue;
      }

      if (error instanceof APIError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new APIError('Request timeout', 408);
        }
        throw new APIError(error.message, 500);
      }

      throw new APIError('An unexpected error occurred', 500);
    }
  }

  throw lastError;
}

export async function validateResponse<T extends z.ZodType>(
  schema: T,
  data: unknown
): Promise<z.infer<T>> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new APIError('Invalid response data', 500, 'VALIDATION_ERROR', error.errors);
    }
    throw error;
  }
}

export async function fetchPaginatedAPI<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  page = 0,
  count = 10,
  options: FetchOptions = {}
): Promise<PaginatedData<T>> {
  const params = {
    ...options.params,
    page,
    count,
  };

  // FastAPI returns a tuple [items, total]
  const [items, total] = await fetchAPI<[unknown, number]>(endpoint, { ...options, params });
  const validatedItems = await validateResponse(z.array(schema), items);

  return {
    data: validatedItems,
    total,
  };
}
