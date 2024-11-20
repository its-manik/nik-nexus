# Data Entry Components

## FilterPanel
Advanced filtering interface for data tables.

```typescript
interface FilterPanelProps {
  filters: Filter[];
  onFilterChange: (filters: Filter[]) => void;
  presets?: FilterPreset[];
  className?: string;
}

interface Filter {
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'between';
  value: string | number | [number, number];
}

interface FilterPreset {
  name: string;
  filters: Filter[];
}
```

Features:
- Multiple filter conditions
- Date range selection
- Numeric range inputs
- Preset filter combinations
- Clear all functionality

## PageControls
Combined pagination and page size controls.

```typescript
interface PageControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizes?: number[];
  className?: string;
}
```

Features:
- Page navigation
- Page size selection
- Total items display
- Responsive layout
- Keyboard shortcuts