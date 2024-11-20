import type { Meta, StoryObj } from '@storybook/react';
import LoadingState from '../components/LoadingState';

const meta = {
  title: 'Components/LoadingState',
  component: LoadingState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithMessage: Story = {
  args: {
    message: 'Loading data...',
  },
};

export const CustomStyling: Story = {
  args: {
    message: 'Please wait',
    className: 'bg-indigo-50 rounded-xl',
  },
};