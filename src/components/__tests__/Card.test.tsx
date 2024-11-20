import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Settings } from 'lucide-react';
import Card from '../Card';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Card title="Test Title">Content</Card>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Card icon={Settings} title="Test">Content</Card>);
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders footer when provided', () => {
    render(
      <Card footer={<div>Footer content</div>}>
        Content
      </Card>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('renders without padding when noPadding is true', () => {
    const { container } = render(<Card noPadding>Content</Card>);
    expect(container.firstChild).not.toHaveClass('p-6');
  });
});