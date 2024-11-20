import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  it('renders error message from Error object', () => {
    const error = new Error('Test error message');
    render(<ErrorState error={error} />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders error message from string', () => {
    render(<ErrorState error="String error message" />);
    expect(screen.getByText('String error message')).toBeInTheDocument();
  });

  it('renders default message for unknown error type', () => {
    render(<ErrorState error={{}} />);
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  it('calls retry function when retry button is clicked', async () => {
    const onRetry = vi.fn();
    render(<ErrorState error="Error" onRetry={onRetry} />);
    
    const retryButton = screen.getByText('Try Again');
    await retryButton.click();
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});