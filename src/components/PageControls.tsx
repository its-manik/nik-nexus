import React from 'react';
import Select from './Select';
import Pagination from './Pagination';

interface PageControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
}

const pageSizeOptions = [
  { value: '10', label: '10 per page' },
  { value: '25', label: '25 per page' },
  { value: '50', label: '50 per page' },
  { value: '100', label: '100 per page' },
];

function PageControls({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className = '',
}: PageControlsProps) {
  return (
    <div className={`flex items-center justify-between border-t border-ui-border dark:border-ui-dark-border p-4 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-light dark:text-text-dark-secondary">Show</span>
        <Select
          options={pageSizeOptions}
          value={pageSize.toString()}
          onChange={(value) => onPageSizeChange(Number(value))}
          className="w-40"
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default PageControls;