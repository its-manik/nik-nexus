# Type Definitions

## Data Models

```typescript
// Block related types
interface Block {
  id: string;
  height: number;
  timestamp: string;
  hash: string;
  parent_hash: string;
  state_root: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  hash: string;
  block_id: string;
  from: string;
  to: string;
  value: string;
  gas_used: number;
}

// Algorithm related types
interface Algorithm {
  id: string;
  name: string;
  version: string;
  player_id: string;
  challenge_id: string;
  datetime_added: string;
  code: string;
  status: 'active' | 'inactive' | 'banned';
}

// Benchmark related types
interface Benchmark {
  id: string;
  algorithm_id: string;
  block_id: string;
  datetime_added: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: BenchmarkResult[];
}

interface BenchmarkResult {
  nonce: number;
  runtime: number;
  memory_used: number;
  success: boolean;
}

// Challenge related types
interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  reward: string;
  datetime_added: string;
  status: 'active' | 'completed' | 'cancelled';
}

// Account related types
interface Account {
  id: string;
  name: string;
  balance: string;
  datetime_added: string;
  is_contract: boolean;
  code_hash?: string;
}

// Proof related types
interface Proof {
  id: string;
  benchmark_id: string;
  block_id: string;
  datetime_added: string;
  merkle_root: string;
  status: 'pending' | 'verified' | 'rejected';
}
```

## API Response Types

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

interface APIError {
  message: string;
  code?: string;
  details?: unknown;
}

interface APIResponse<T> {
  data: T;
  error?: APIError;
}
```

## Common Utility Types

```typescript
type Status = 'success' | 'warning' | 'error' | 'info';
type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ActionItem {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
  className?: string;
}
```