import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  threshold = 0.5,
}: UseInfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold,
  });

  useEffect(() => {
    if (inView && !loading && hasNextPage) {
      onLoadMore();
    }
  }, [inView, loading, hasNextPage, onLoadMore]);

  return { ref };
}