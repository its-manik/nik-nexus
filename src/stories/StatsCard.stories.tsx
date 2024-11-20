import type { Meta, StoryObj } from '@storybook/react';
import { Activity, Users, Database } from 'lucide-react';
import StatsCard from '../components/StatsCard';

const meta = {
  title: 'Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockStats = [
  {
    label: 'Total Users',
    value: '1,234',
    icon: Users,
  },
  {
    label: 'Active Users',
    value: '891',
    icon: Activity,
    change: {
      value: 12,
      trend: 'up' as const,
    },
  },
  {
    label: 'Database Size',
    value: '2.3 GB',
    icon: Database,
  },
];

export const Basic: Story = {
  args: {
    title: 'Statistics',
    stats: mockStats,
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Two Column Layout',
    stats: mockStats.slice(0, 2),
    columns: 2,
  },
};

export const WithoutTitle: Story = {
  args: {
    stats: mockStats,
  },
};