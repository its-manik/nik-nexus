import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useApi } from '../useApi';

describe('useApi', () => {
  it('handles successful API calls', async () => {
    const mockData = { test: 'data' };
    const mockFetcher = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    const { result } = renderHook(() =>
      useApi(mockFetcher, [], { onSuccess })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it('handles API errors', async () => {
    const mockError = new Error('API Error');
    const mockFetcher = vi.fn().mockRejectedValue(mockError);
    const onError = vi.fn();

    const { result } = renderHook(() =>
      useApi(mockFetcher, [], { onError })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
    expect(onError).toHaveBeenCalledWith(mockError);
  });

  it('refetches data when dependencies change', async () => {
    const mockFetcher = vi.fn().mockResolvedValue({ test: 'data' });
    const { rerender } = renderHook(
      ({ dep }) => useApi(mockFetcher, [dep]),
      { initialProps: { dep: 1 } }
    );

    await waitFor(() => {
      expect(mockFetcher).toHaveBeenCalledTimes(1);
    });

    rerender({ dep: 2 });

    await waitFor(() => {
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });
  });
});