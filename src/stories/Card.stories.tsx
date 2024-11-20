import type { Meta, StoryObj } from '@storybook/react';
import { Settings } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    children: <p>Card content goes here.</p>,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Settings',
    icon: Settings,
    children: <p>Card with icon.</p>,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    actions: <Button variant="primary">Action</Button>,
    children: <p>Card with action buttons.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: <p>Main content.</p>,
    footer: <p className="text-sm text-gray-500">Footer content</p>,
  },
};

export const NoPadding: Story = {
  args: {
    title: 'No Padding',
    noPadding: true,
    children: <div className="bg-gray-100 p-4">Custom padding content.</div>,
  },
};