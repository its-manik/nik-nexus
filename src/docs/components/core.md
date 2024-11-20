# Core Components

## ErrorBoundary
React error boundary component for graceful error handling.

```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

Features:
- Catches JavaScript errors in child components
- Displays fallback UI
- Error reporting integration
- Reset capability

## PageLayout
Standard page layout with consistent structure.

```typescript
interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  backLink?: string;
  backLabel?: string;
  loading?: boolean;
  error?: Error | null;
  empty?: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
```

Features:
- Consistent header structure
- Loading/error/empty states
- Navigation integration
- Action buttons support

## LoadingSpinner
Customizable loading indicator.

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

Features:
- Multiple sizes
- Custom styling
- Smooth animation
- Accessible

## Badge
Status and label indicator.

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}
```

Features:
- Multiple variants
- Custom styling
- Icon support
- Accessible colors