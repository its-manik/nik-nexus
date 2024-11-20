# Getting Started Guide

This guide will help you get up and running with the Block Explorer Interface.

## Prerequisites

- Node.js 18+
- npm or yarn
- Basic understanding of React and TypeScript

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/block-explorer.git
cd block-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── api/            # API integration
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## Basic Usage

### Fetching Data

```typescript
import { useApi } from '../hooks/useApi';
import { getBlocks } from '../lib/api';

function BlocksList() {
  const { data, loading, error } = useApi(() => getBlocks(0, 10));

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  
  return <DataTable data={data.blocks} />;
}
```

### Using Components

```typescript
import { Card, DataTable, Button } from '../components';

function MyComponent() {
  return (
    <Card title="My Data">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
      />
      <Button variant="primary">Action</Button>
    </Card>
  );
}
```

## Common Use Cases

### 1. Displaying Block Information

```typescript
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getBlock } from '../lib/api';

function BlockDetails() {
  const { blockId } = useParams();
  const { data: block } = useApi(() => getBlock(blockId));

  return (
    <Card title={`Block #${blockId}`}>
      <div>Hash: {block.hash}</div>
      <div>Transactions: {block.tx_count}</div>
    </Card>
  );
}
```

### 2. Implementing Infinite Scroll

```typescript
import { useInfiniteQuery } from '../hooks/useInfiniteQuery';

function InfiniteList() {
  const {
    items,
    loadMoreRef,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    pageSize: 25,
  });

  return (
    <div>
      {items.map(renderItem)}
      <div ref={loadMoreRef}>
        {isFetching && <LoadingSpinner />}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Error Handling**
   - Always use ErrorBoundary components
   - Provide meaningful error messages
   - Implement retry mechanisms

```typescript
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

2. **Performance**
   - Use pagination or infinite scroll for large lists
   - Implement proper caching strategies
   - Optimize component re-renders

3. **Type Safety**
   - Define proper TypeScript interfaces
   - Use Zod for runtime validation
   - Maintain strict type checking

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check API URL configuration
   - Verify network connectivity
   - Check CORS settings

2. **Performance Issues**
   - Implement pagination
   - Use React.memo for expensive components
   - Profile with React DevTools

3. **Type Errors**
   - Update type definitions
   - Check for null/undefined values
   - Use proper type guards

### Debug Tools

1. React Query DevTools
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <AppContent />
      <ReactQueryDevtools />
    </>
  );
}
```

2. Error Monitoring
```typescript
import { monitor } from '../lib/monitoring';

try {
  await operation();
} catch (error) {
  monitor.reportError(error);
}
```