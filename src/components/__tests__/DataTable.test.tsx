import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DataTable from '../DataTable';

describe('DataTable', () => {
  const mockData = [
    { id: 1, name: 'Test 1', value: 100 },
    { id: 2, name: 'Test 2', value: 200 },
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Value', accessor: (item: any) => `$${item.value}` },
  ];

  it('renders table headers', () => {
    render(
      <DataTable
        columns={columns}
        data={mockData}
        keyExtractor={(item) => item.id}
      />
    );

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it('renders table rows with correct data', () => {
    render(
      <DataTable
        columns={columns}
        data={mockData}
        keyExtractor={(item) => item.id}
      />
    );

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.value}`)).toBeInTheDocument();
    });
  });

  it('applies custom column className', () => {
    const columnsWithClass = [
      { header: 'ID', accessor: 'id', className: 'custom-column' },
    ];

    render(
      <DataTable
        columns={columnsWithClass}
        data={mockData}
        keyExtractor={(item) => item.id}
      />
    );

    expect(screen.getByText('ID')).toHaveClass('custom-column');
  });
});