import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InfiniteList } from '../InfiniteList';

describe('InfiniteList', () => {
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  const renderItem = (item: typeof mockItems[0]) => (
    <div key={item.id}>{item.name}</div>
  );

  it('renders list items correctly', () => {
    render(
      <InfiniteList
        items={mockItems}
        renderItem={renderItem}
        loadMoreRef={() => {}}
        isFetching={false}
      />
    );

    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('shows loading spinner when fetching', () => {
    render(
      <InfiniteList
        items={mockItems}
        renderItem={renderItem}
        loadMoreRef={() => {}}
        isFetching={true}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <InfiniteList
        items={mockItems}
        renderItem={renderItem}
        loadMoreRef={() => {}}
        isFetching={false}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});