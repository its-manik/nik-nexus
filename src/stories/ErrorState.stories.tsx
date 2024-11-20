import type { Meta, StoryObj } from '@storybook/react';
import ErrorState from '../components/ErrorState';

const meta = {
  title: 'Components/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    error: new Error('Something went wrong'),
  },
};

export const WithRetry: Story = {
  args: {
    error: 'Failed to load data',
    onRetry: () => alert('Retrying...'),
  },
};

export const CustomStyling: Story = {
  args: {
    error: 'Network error occurred',
    className: 'bg-red-50 rounded-xl',
  },
};