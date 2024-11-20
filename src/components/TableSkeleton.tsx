import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

function TableSkeleton({ rows = 5, columns = 4, className = '' }: TableSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-10 bg-background-light dark:bg-background-darker rounded-t-lg mb-2" />
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-ui-border dark:border-ui-dark-border"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-6 bg-background-light dark:bg-background-darker rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;