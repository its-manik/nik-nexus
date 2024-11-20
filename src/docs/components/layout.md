# Layout Components

## PageContainer
Main content container with responsive padding.

```typescript
interface PageContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

Features:
- Responsive max-width
- Optional padding
- Center alignment
- Background options

## SplitPane
Resizable split view container.

```typescript
interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplit?: number;
  minSize?: number;
  maxSize?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
```

Features:
- Draggable divider
- Min/max size constraints
- Orientation options
- Collapse/expand controls