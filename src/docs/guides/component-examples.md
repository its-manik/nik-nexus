# Component Examples

## Basic Components

### Card Component

```typescript
import { Card } from '../components';

// Basic usage
<Card title="User Profile">
  <UserDetails user={user} />
</Card>

// With actions
<Card
  title="Settings"
  actions={<Button>Save</Button>}
  footer={<StatusMessage>Last saved 5m ago</StatusMessage>}
>
  <SettingsForm />
</Card>
```

### DataTable Component

```typescript
import { DataTable } from '../components';

const columns = [
  {
    header: 'ID',
    accessor: 'id',
  },
  {
    header: 'Name',
    accessor: (user) => (
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    ),
  },
];

<DataTable
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
/>
```

## Integration Examples

### Block Explorer Page

```typescript
import { useApi } from '../hooks/useApi';
import { getBlocks } from '../lib/api';
import { Card, DataTable, LoadingState } from '../components';

function BlockExplorer() {
  const { data, loading, error } = useApi(() => getBlocks(0, 10));

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <Card title="Latest Blocks">
      <DataTable
        columns={[
          {
            header: 'Block',
            accessor: (block) => (
              <Link to={`/block/${block.id}`}>
                {block.height}
              </Link>
            ),
          },
          {
            header: 'Time',
            accessor: (block) => formatDate(block.timestamp),
          },
          {
            header: 'Transactions',
            accessor: 'tx_count',
          },
        ]}
        data={data.blocks}
        keyExtractor={(block) => block.id}
      />
    </Card>
  );
}
```

### Real-time Updates

```typescript
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function BlockUpdates() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket('ws://api.example.com');

    ws.onmessage = (event) => {
      const block = JSON.parse(event.data);
      queryClient.setQueryData(['blocks'], (old) => ({
        ...old,
        blocks: [block, ...old.blocks],
      }));
    };

    return () => ws.close();
  }, [queryClient]);

  return null;
}
```

### Error Handling

```typescript
import { ErrorBoundary, ErrorState } from '../components';
import { monitor } from '../lib/monitoring';

function MyComponent() {
  const { error, clearError } = useErrorHandler();

  const handleError = (error) => {
    monitor.reportError(error);
    showNotification({
      type: 'error',
      message: error.message,
    });
  };

  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorState
          error={error}
          onRetry={clearError}
        />
      )}
      onError={handleError}
    >
      <Content />
    </ErrorBoundary>
  );
}
```

### Form Handling

```typescript
import { useState } from 'react';
import { Card, Button, Select } from '../components';

function FilterForm() {
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'transaction',
  });

  return (
    <Card title="Filters">
      <form onSubmit={handleSubmit}>
        <Select
          label="Status"
          value={filters.status}
          onChange={(value) => setFilters({
            ...filters,
            status: value,
          })}
          options={[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'completed', label: 'Completed' },
          ]}
        />

        <Button type="submit">
          Apply Filters
        </Button>
      </form>
    </Card>
  );
}
```