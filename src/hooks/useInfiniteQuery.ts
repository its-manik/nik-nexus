import { useInfiniteQuery as useReactQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import type { PaginatedData } from '../lib/api/client';

interface UseInfiniteQueryProps<T> {
  queryKey: string[];
  queryFn: (page: number) => Promise<PaginatedData<T>>;
  pageSize?: number;
  enabled?: boolean;
}

interface UseInfiniteQueryResult<T> {
  items: T[];
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  loadMoreRef: (node?: Element | null) => void;
}

export function useInfiniteQuery<T>({
  queryKey,
  queryFn,
  pageSize = 10,
  enabled = true,
}: UseInfiniteQueryProps<T>): UseInfiniteQueryResult<T> {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
    error,
    isLoading,
  } = useReactQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / pageSize);
      const nextPage = allPages.length;
      return nextPage < totalPages ? nextPage : undefined;
    },
    enabled,
  });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  });

  const items = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  return {
    items,
    total,
    isLoading,
    isFetching,
    isError,
    error: error as Error | null,
    loadMoreRef: ref,
  };
}