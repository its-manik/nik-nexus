# Integration Guide

## API Integration

### Setting Up API Client

```typescript
import { fetchAPI } from '../lib/api/client';

// Basic GET request
const data = await fetchAPI('/endpoint');

// With query parameters
const data = await fetchAPI('/endpoint?page=1&limit=10');

// POST request with body
const data = await fetchAPI('/endpoint', {
  method: 'POST',
  body: JSON.stringify(payload),
});
```

### Error Handling

```typescript
try {
  const data = await fetchAPI('/endpoint');
} catch (error) {
  if (error instanceof APIError) {
    // Handle API-specific errors
    console.error(error.code, error.message);
  } else {
    // Handle other errors
    console.error('Unknown error:', error);
  }
}
```

### Data Validation

```typescript
import { z } from 'zod';

const ResponseSchema = z.object({
  id: z.string(),
  value: z.number(),
});

const data = await validateResponse(ResponseSchema, rawData);
```

## State Management

### Using React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetching data
function useBlocks() {
  return useQuery({
    queryKey: ['blocks'],
    queryFn: () => getBlocks(0, 10),
  });
}

// Mutations
function useUpdateBlock() {
  return useMutation({
    mutationFn: updateBlock,
    onSuccess: () => {
      queryClient.invalidateQueries(['blocks']);
    },
  });
}
```

### Caching Strategy

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});
```

## Real-time Updates

### WebSocket Integration

```typescript
function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'NEW_BLOCK':
          queryClient.invalidateQueries(['blocks']);
          break;
        case 'UPDATE':
          queryClient.setQueryData(['blocks'], (old) => ({
            ...old,
            blocks: old.blocks.map((b) =>
              b.id === data.id ? { ...b, ...data } : b
            ),
          }));
          break;
      }
    };

    return () => ws.close();
  }, [queryClient]);
}
```

## Performance Optimization

### Component Optimization

```typescript
import { memo } from 'react';

const MemoizedComponent = memo(function Component({ data }) {
  return <div>{data.value}</div>;
}, (prevProps, nextProps) => {
  return prevProps.data.value === nextProps.data.value;
});
```

### Data Fetching Optimization

```typescript
function useOptimizedQuery(id: string) {
  return useQuery({
    queryKey: ['data', id],
    queryFn: () => fetchData(id),
    select: (data) => transformData(data),
    enabled: Boolean(id),
  });
}
```

## Testing Integration

### API Mocking

```typescript
import { setupServer } from 'msw/node';
import { http } from 'msw';

const server = setupServer(
  http.get('/api/endpoint', () => {
    return HttpResponse.json({
      data: 'mocked',
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

test('component integration', async () => {
  render(<Component />, { wrapper });
  
  expect(await screen.findByText('Loading')).toBeInTheDocument();
  expect(await screen.findByText('Data')).toBeInTheDocument();
});
```