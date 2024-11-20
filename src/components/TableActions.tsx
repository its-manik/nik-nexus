import React from 'react';
import { Search } from 'lucide-react';
import Select from './Select';
import Button from './Button';

interface TableActionsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onRefresh?: () => void;
  className?: string;
}

function TableActions({
  searchValue,
  onSearchChange,
  onSearch,
  pageSize,
  onPageSizeChange,
  onRefresh,
  className = '',
}: TableActionsProps) {
  const pageSizeOptions = [
    { value: '10', label: '10 per page' },
    { value: '25', label: '25 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className={`
              w-full pl-10 pr-4 py-2 
              border border-ui-border dark:border-ui-dark-border rounded-lg 
              bg-background-white dark:bg-background-dark
              text-text-primary dark:text-text-dark
              placeholder-text-light dark:placeholder-text-dark-secondary
              focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
              transition-colors
            `}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-text-light dark:text-text-dark-secondary" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select
          options={pageSizeOptions}
          value={pageSize.toString()}
          onChange={(value) => onPageSizeChange(Number(value))}
          className="w-40"
        />

        {onRefresh && (
          <Button
            variant="secondary"
            onClick={onRefresh}
            className="whitespace-nowrap"
          >
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}

export default TableActions;