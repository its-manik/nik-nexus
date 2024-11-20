# Data Display Components

## TableActions
Controls for table filtering, searching, and pagination.

```typescript
interface TableActionsProps {
  searchValue: string;              // Current search input value
  onSearchChange: (value: string) => void; // Search input handler
  onSearch: () => void;            // Search submit handler
  pageSize: number;                // Current page size
  onPageSizeChange: (size: number) => void; // Page size change handler
  onRefresh?: () => void;         // Optional refresh handler
  className?: string;             // Additional CSS classes
}
```

## TableSkeleton
Loading placeholder for tables.

```typescript
interface TableSkeletonProps {
  rows?: number;                   // Number of skeleton rows
  columns?: number;                // Number of skeleton columns
  className?: string;             // Additional CSS classes
}
```

## StatusBadge
Visual indicator for status states.

```typescript
interface StatusBadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}
```

## NoData
Empty state display component.

```typescript
interface NoDataProps {
  icon?: LucideIcon;              // Optional icon
  title?: string;                 // Optional title
  message: string;                // Main message
  action?: {                      // Optional action button
    label: string;
    onClick: () => void;
  };
  className?: string;
}
```