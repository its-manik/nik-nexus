# Data Visualization Components

## PriceChart
Interactive price chart with real-time updates.

```typescript
interface PriceChartProps {
  data: {
    date: string;
    price: number;
    volume: number;
  }[];
  currentPrice: number;
  priceChange: number;
  timeRange?: '1D' | '1W' | '1M' | '1Y';
  onTimeRangeChange?: (range: string) => void;
  className?: string;
}
```

Features:
- Area chart with gradient fill
- Price and volume visualization
- Customizable time ranges
- Tooltips with detailed information
- Responsive design

## StatsPanel
Network statistics display panel.

```typescript
interface StatsPanelProps {
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
  className?: string;
}
```

Features:
- Network information display
- Real-time metrics updates
- Collapsible sections
- Copy-to-clipboard functionality

## BlocksTable
Interactive table for displaying block information.

```typescript
interface BlocksTableProps {
  blocks: Block[];
  loading?: boolean;
  error?: Error | null;
  onBlockClick?: (blockId: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

interface Block {
  number: number;
  hash: string;
  timestamp: string;
  miner: string;
  txCount: number;
}
```

Features:
- Sortable columns
- Search functionality
- Pagination controls
- Loading states
- Error handling