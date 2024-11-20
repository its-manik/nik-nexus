import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InfiniteListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loadMoreRef: (node?: Element | null) => void;
  isFetching: boolean;
  className?: string;
}

export function InfiniteList<T>({
  items,
  renderItem,
  loadMoreRef,
  isFetching,
  className = '',
}: InfiniteListProps<T>) {
  return (
    <div className={`bg-background-white dark:bg-background-dark ${className}`}>
      {items.map(renderItem)}
      <div 
        ref={loadMoreRef} 
        className="h-20 flex items-center justify-center text-text-light dark:text-text-dark-secondary"
      >
        {isFetching && <LoadingSpinner size="sm" />}
      </div>
    </div>
  );
}