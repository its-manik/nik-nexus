import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Activity } from 'lucide-react';
import StatsCard from '../StatsCard';

describe('StatsCard', () => {
  const mockStats = [
    {
      label: 'Total Users',
      value: '1,234',
      icon: Activity,
    },
    {
      label: 'Active Users',
      value: '567',
      icon: Activity,
      change: {
        value: 12,
        trend: 'up' as const,
      },
    },
  ];

  it('renders stats correctly', () => {
    render(<StatsCard stats={mockStats} />);

    mockStats.forEach(stat => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    });
  });

  it('renders title when provided', () => {
    render(<StatsCard title="Test Stats" stats={mockStats} />);
    expect(screen.getByText('Test Stats')).toBeInTheDocument();
  });

  it('renders trend indicators', () => {
    render(<StatsCard stats={mockStats} />);
    expect(screen.getByText('↑ 12%')).toBeInTheDocument();
  });

  it('applies correct column layout', () => {
    const { container } = render(<StatsCard stats={mockStats} columns={2} />);
    expect(container.querySelector('.grid-cols-1.md\\:grid-cols-2')).toBeTruthy();
  });
});