import type { Meta, StoryObj } from '@storybook/react';
import DataTable from '../components/DataTable';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
];

const columns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  {
    header: 'Status',
    accessor: (item: any) => (
      <span className={item.status === 'active' ? 'text-green-600' : 'text-red-600'}>
        {item.status}
      </span>
    ),
  },
];

export const Basic: Story = {
  args: {
    columns,
    data: mockData,
    keyExtractor: (item: any) => item.id,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (item: any) => item.id,
  },
};

export const WithCustomStyles: Story = {
  args: {
    columns: columns.map(col => ({
      ...col,
      className: 'font-medium',
    })),
    data: mockData,
    keyExtractor: (item: any) => item.id,
  },
};