# Proofs API

## Get Proofs
Retrieve a paginated list of proofs.

```typescript
GET /api/proofs
```

Query Parameters:
- `page` (number, optional): Page number (default: 0)
- `limit` (number, optional): Items per page (default: 10)

Response:
```typescript
{
  proofs: Array<{
    benchmark_id: string;
    datetime_added: string;
    block_confirmed: string;
    submission_delay: string;
    num_merkle_proofs: number;
    total_fuel_consumed: number;
  }>;
  total: number;
}
```

## Get Proof Details
Retrieve details for a specific proof.

```typescript
GET /api/proofs/:id
```

Response:
```typescript
{
  benchmark_id: string;
  datetime_added: string;
  block_confirmed: string;
  submission_delay: string;
  proof_data: {
    merkle_proofs: Array<{
      leaf: {
        nonce: number;
        solution: Record<string, any>;
        fuel_consumed: number;
        runtime_signature: number;
      };
      branch: string;
    }>;
  };
}
```