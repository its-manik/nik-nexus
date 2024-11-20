# API Hook

## useApi
Custom hook for handling API requests with loading and error states.

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
// Basic usage
const { data, loading, error } = useApi(() => fetchBlocks());

// With options
const { data, loading, error, refetch } = useApi(
  () => fetchBlocks(),
  [blockId],
  {
    initialData: null,
    onSuccess: (data) => {
      console.log('Blocks loaded:', data);
    },
    onError: (error) => {
      console.error('Failed to load blocks:', error);
    },
  }
);

// With TypeScript
interface Block {
  id: string;
  height: number;
}

const { data, loading, error } = useApi<Block[]>(
  () => fetchBlocks(),
  [],
  {
    initialData: [],
  }
);
```

Features:
- Automatic loading state
- Error handling
- Dependency tracking
- Success/error callbacks
- Manual refetch capability
- TypeScript support