# Pagination Hook

## usePagination
Manage pagination state and logic.

```typescript
interface UsePaginationProps {
  totalItems: number;             // Total number of items
  pageSize?: number;             // Items per page (default: 10)
  initialPage?: number;          // Starting page (default: 1)
}

interface UsePaginationResult {
  currentPage: number;           // Current page number
  itemsPerPage: number;         // Current page size
  totalPages: number;           // Total number of pages
  nextPage: () => void;         // Go to next page
  previousPage: () => void;     // Go to previous page
  goToPage: (page: number) => void; // Go to specific page
  changePageSize: (size: number) => void; // Change page size
}
```

Example usage:
```typescript
const {
  currentPage,
  itemsPerPage,
  totalPages,
  nextPage,
  previousPage,
  goToPage,
  changePageSize,
} = usePagination({
  totalItems: 100,
  pageSize: 10,
  initialPage: 1,
});

// Use with API calls
useEffect(() => {
  fetchData({
    page: currentPage,
    limit: itemsPerPage,
  });
}, [currentPage, itemsPerPage]);
```