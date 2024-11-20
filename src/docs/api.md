# API Documentation

## Blocks API

### Get Blocks
Retrieve a paginated list of blocks.

```typescript
GET /api/blocks
```

Query Parameters:
- `page` (number, optional): Page number (default: 0)
- `limit` (number, optional): Items per page (default: 10)

Response:
```typescript
{
  blocks: Array<{
    id: string;
    height: number;
    datetime_added: string;
    hash: string;
    miner: string;
    tx_count: number;
  }>;
  total: number;
}
```

### Get Block Details
Retrieve details for a specific block.

```typescript
GET /api/blocks/:id
```

Response:
```typescript
{
  id: string;
  height: number;
  datetime_added: string;
  hash: string;
  parent_hash: string;
  state_root: string;
  transactions: Array<{
    id: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    gas_used: number;
  }>;
}
```

## Algorithms API

### Get Algorithms
Retrieve a paginated list of algorithms.

```typescript
GET /api/algorithms
```

Query Parameters:
- `page` (number, optional): Page number (default: 0)
- `limit` (number, optional): Items per page (default: 10)

Response:
```typescript
{
  algorithms: Array<{
    id: string;
    name: string;
    datetime_added: string;
    player_id: string;
    challenge_id: string;
    tx_hash: string;
  }>;
  total: number;
}
```

### Get Algorithm Details
Retrieve details for a specific algorithm.

```typescript
GET /api/algorithms/:id
```

Response:
```typescript
{
  algorithm: {
    id: string;
    name: string;
    datetime_added: string;
    player_id: string;
    challenge_id: string;
    tx_hash: string;
  };
  state: {
    block_confirmed: string;
    round_submitted: string;
    round_pushed: string;
    round_merged: string | null;
    banned: boolean | null;
  };
  block_data: {
    adoption: string;
    merge_points: string;
    reward: string;
    num_qualifiers_by_player: Record<string, number>;
  };
}
```

## Benchmarks API

### Get Benchmarks
Retrieve a paginated list of benchmarks.

```typescript
GET /api/benchmarks
```

Query Parameters:
- `page` (number, optional): Page number (default: 0)
- `limit` (number, optional): Items per page (default: 10)

Response:
```typescript
{
  benchmarks: Array<{
    id: string;
    datetime_added: string;
    merkle_root: string | null;
    num_solutions: number;
    block_confirmed: number;
  }>;
  total: number;
}
```

### Get Benchmark Details
Retrieve details for a specific benchmark.

```typescript
GET /api/benchmarks/:id
```

Response:
```typescript
{
  id: string;
  datetime_added: string;
  merkle_root: string | null;
  num_solutions: number;
  block_confirmed: number;
  sampled_nonces: number[];
  solution_nonces: number[];
  performance_metrics: {
    avg_solution_time: number;
    success_rate: number;
    memory_usage: string;
  };
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```typescript
{
  error: string;           // Error message
  code?: string;          // Error code (optional)
  details?: unknown;      // Additional error details (optional)
}
```

Common HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Authentication

Currently, the API does not require authentication. Future versions may implement authentication using JWT tokens.

## Rate Limiting

The API implements rate limiting based on IP address:
- 100 requests per minute for general endpoints
- 1000 requests per minute for read-only endpoints

## Caching

Responses include standard cache control headers. Clients should respect these headers to optimize performance.