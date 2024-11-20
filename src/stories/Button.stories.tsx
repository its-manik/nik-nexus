import type { Meta, StoryObj } from '@storybook/react';
import { Settings } from 'lucide-react';
import Button from '../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Settings',
    icon: Settings,
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    variant: 'primary',
  },
};