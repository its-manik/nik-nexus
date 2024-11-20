# Navigation Components

## Navbar
Main navigation component with responsive design.

```typescript
interface NavbarProps {
  items: NavItem[];
  currentPath: string;
  onSearch?: (query: string) => void;
  className?: string;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: number;
}
```

Features:
- Responsive mobile menu
- Active state highlighting
- Search functionality
- Badge notifications
- Icon support

## SearchInput
Enhanced search input with suggestions.

```typescript
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  loading?: boolean;
  className?: string;
}
```

Features:
- Auto-suggestions
- Loading state
- Keyboard navigation
- Search history
- Clear button