# Feedback Components

## LoadingOverlay
Full-screen loading overlay with spinner.

```typescript
interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  transparent?: boolean;
  className?: string;
}
```

Features:
- Customizable spinner
- Optional message display
- Transparent background option
- Fade in/out animation

## Toast
Notification toast system.

```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: () => void;
}
```

Features:
- Multiple toast types
- Auto-dismiss
- Custom duration
- Position options
- Progress indicator