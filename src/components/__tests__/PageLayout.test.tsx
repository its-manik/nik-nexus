import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Settings } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from '../PageLayout';

describe('PageLayout', () => {
  const defaultProps = {
    title: 'Test Page',
    icon: Settings,
    children: <div>Test content</div>,
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders title and content', () => {
    renderWithRouter(<PageLayout {...defaultProps} />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    renderWithRouter(<PageLayout {...defaultProps} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = new Error('Test error');
    renderWithRouter(<PageLayout {...defaultProps} error={error} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    renderWithRouter(
      <PageLayout {...defaultProps} empty emptyMessage="No data available" />
    );
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders back link when provided', () => {
    renderWithRouter(
      <PageLayout {...defaultProps} backLink="/" backLabel="Back to Home" />
    );
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    renderWithRouter(
      <PageLayout
        {...defaultProps}
        actions={<button>Test Action</button>}
      />
    );
    expect(screen.getByText('Test Action')).toBeInTheDocument();
  });
});