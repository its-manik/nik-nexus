# Network API

## Get Network Stats
Retrieve current network statistics.

```typescript
GET /api/network/stats
```

Response:
```typescript
{
  network: {
    tokenAddress: string;
    rpcUrl: string;
    chainId: string;
  };
  metrics: {
    totalWallets: number;
    activeBenchmarks: number;
    blockHeight: number;
    gasPrice: string;
  };
}
```