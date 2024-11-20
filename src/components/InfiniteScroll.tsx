import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loadMoreRef: (node?: Element | null) => void;
  isFetching: boolean;
  className?: string;
}

function InfiniteScroll<T>({
  items,
  renderItem,
  loadMoreRef,
  isFetching,
  className = '',
}: InfiniteScrollProps<T>) {
  return (
    <div className={`
      bg-background-white dark:bg-background-dark 
      border border-ui-border dark:border-ui-dark-border 
      rounded-lg shadow-sm
      ${className}
    `}>
      <div className="divide-y divide-ui-border dark:divide-ui-dark-border">
        {items.map(renderItem)}
      </div>
      <div 
        ref={loadMoreRef} 
        className={`
          h-20 flex items-center justify-center 
          border-t border-ui-border dark:border-ui-dark-border
          text-text-light dark:text-text-dark-secondary
          transition-colors
        `}
      >
        {isFetching && <LoadingSpinner size="sm" />}
      </div>
    </div>
  );
}

export default InfiniteScroll;