import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useInfiniteQuery', () => {
  it('handles successful data fetching', async () => {
    const mockFn = async (page: number) => ({
      data: [{ id: page, name: `Item ${page}` }],
      total: 10,
    });

    const { result } = renderHook(
      () =>
        useInfiniteQuery({
          queryKey: ['test'],
          queryFn: mockFn,
          pageSize: 1,
        }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.total).toBe(10);
  });

  it('handles error states', async () => {
    const mockFn = async () => {
      throw new Error('Test error');
    };

    const { result } = renderHook(
      () =>
        useInfiniteQuery({
          queryKey: ['test-error'],
          queryFn: mockFn,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});