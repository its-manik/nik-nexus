# Error Handling Hook

## useErrorHandler
Consistent error handling across the application.

```typescript
function useErrorHandler(): (error: unknown) => string

interface APIError {
  message: string;
  code?: string;
  details?: unknown;
}
```

Features:
- Handles different error types (API errors, standard errors, unknown errors)
- Provides consistent error messages
- Logs errors appropriately
- Supports error tracking integration

Example usage:
```typescript
const handleError = useErrorHandler();

try {
  await fetchData();
} catch (error) {
  const message = handleError(error);
  showErrorNotification(message);
}

// With useApi hook
const { data, error } = useApi(fetchData, [], {
  onError: (error) => {
    const message = handleError(error);
    showErrorNotification(message);
  },
});
```