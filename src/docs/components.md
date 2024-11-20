# Component Documentation

## Layout Components

### PageLayout
A wrapper component that provides consistent page structure with navigation and error handling.

```tsx
interface PageLayoutProps {
  title: string;                    // Main page title
  subtitle?: string;                // Optional subtitle
  icon: LucideIcon;                // Page icon from lucide-react
  backLink?: string;               // Optional back navigation link
  backLabel?: string;              // Custom back button label
  loading?: boolean;               // Show loading state
  error?: Error | null;            // Show error state
  empty?: boolean;                 // Show empty state
  emptyMessage?: string;           // Custom empty state message
  onRetry?: () => void;           // Error retry callback
  children: React.ReactNode;       // Page content
  actions?: React.ReactNode;       // Optional action buttons
}
```

### Card
A flexible container component for content sections.

```tsx
interface CardProps {
  title?: string;                  // Card title
  description?: string;            // Card description
  icon?: LucideIcon;              // Optional icon
  children: React.ReactNode;       // Card content
  className?: string;             // Additional CSS classes
  actions?: React.ReactNode;       // Optional action buttons
  footer?: React.ReactNode;        // Optional footer content
  noPadding?: boolean;            // Disable default padding
}
```

## Data Display Components

### DataTable
A reusable table component with sorting and custom cell rendering.

```tsx
interface Column<T> {
  header: string;                  // Column header text
  accessor: keyof T | ((item: T) => React.ReactNode); // Data accessor
  className?: string;             // Column-specific styling
}

interface DataTableProps<T> {
  columns: Column<T>[];           // Table column definitions
  data: T[];                      // Table data
  keyExtractor: (item: T) => string | number; // Unique key function
}
```

### StatsCard
Display multiple statistics in a grid layout.

```tsx
interface StatItem {
  label: string;                  // Stat label
  value: string | number;         // Stat value
  icon?: LucideIcon;             // Optional icon
  change?: {                     // Optional trend indicator
    value: number;
    trend: 'up' | 'down';
  };
}

interface StatsCardProps {
  title?: string;                // Card title
  stats: StatItem[];            // Array of statistics
  columns?: 2 | 3 | 4;          // Grid column count
  className?: string;           // Additional CSS classes
}
```

## Feedback Components

### ErrorState
Display error messages with retry option.

```tsx
interface ErrorStateProps {
  error: Error | string | unknown;  // Error object or message
  onRetry?: () => void;            // Retry callback
  className?: string;              // Additional CSS classes
}
```

### LoadingState
Show loading indicator with optional message.

```tsx
interface LoadingStateProps {
  message?: string;               // Loading message
  className?: string;            // Additional CSS classes
}
```

### EmptyState
Display when no data is available.

```tsx
interface EmptyStateProps {
  title?: string;                // Empty state title
  message: string;              // Empty state message
  icon?: LucideIcon;           // Optional icon
  action?: {                   // Optional action button
    label: string;
    onClick: () => void;
  };
  className?: string;         // Additional CSS classes
}
```

## Form Components

### Button
Customizable button component with variants and states.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
}
```

### Select
Dropdown selection component with custom styling.

```tsx
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}
```