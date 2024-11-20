# Custom Hooks Documentation

## useApi
A hook for handling API requests with loading and error states.

```typescript
interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  initialData?: T;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useApi<T>(
  fetcher: () => Promise<T>,
  deps: any[] = [],
  options: UseApiOptions<T> = {}
): UseApiResult<T>;
```

Example usage:
```typescript
const { data, loading, error, refetch } = useApi(
  () => fetchBlocks(),
  [],
  {
    onSuccess: (data) => console.log('Data loaded:', data),
    onError: (error) => console.error('Error:', error),
  }
);
```

## usePagination
A hook for handling pagination state and logic.

```typescript
interface UsePaginationProps {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

interface UsePaginationResult {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  changePageSize: (size: number) => void;
}

function usePagination(props: UsePaginationProps): UsePaginationResult;
```

Example usage:
```typescript
const pagination = usePagination({
  totalItems: 100,
  pageSize: 10,
  initialPage: 1,
});
```

## useErrorHandler
A hook for consistent error handling across the application.

```typescript
function useErrorHandler(): (error: unknown) => string;
```

Example usage:
```typescript
const handleError = useErrorHandler();

try {
  await someOperation();
} catch (error) {
  const message = handleError(error);
  // Display error message to user
}
```