import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Select from './Select';
import Pagination from './Pagination';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
  sortKey?: keyof T;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  className?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  defaultSortColumn?: string;
  defaultSortDirection?: 'asc' | 'desc';
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className = '',
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  defaultSortColumn,
  defaultSortDirection = 'asc',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortColumn, setSortColumn] = useState<string | undefined>(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);

  // Sort data if a sort column is specified
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const column = columns.find(col => 
        typeof col.accessor === 'string' && col.accessor === sortColumn
      );
      
      if (!column || typeof column.accessor !== 'string') return 0;

      const aValue = a[column.accessor as keyof T];
      const bValue = b[column.accessor as keyof T];

      if (aValue === bValue) return 0;
      
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return aValue < bValue ? -1 * modifier : 1 * modifier;
    });
  }, [data, sortColumn, sortDirection]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return String(item[column.accessor]);
  };

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr className="bg-background-light dark:bg-background-darker">
              {columns.map((column) => (
                <th
                  key={column.header}
                  className={`
                    px-6 py-3 text-left text-xs font-medium 
                    text-text-light dark:text-text-dark-secondary 
                    uppercase tracking-wider
                    ${column.className || ''}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border bg-background-white dark:bg-background-dark">
            {paginatedData.map((item) => (
              <tr 
                key={keyExtractor(item)} 
                className="hover:bg-background-light dark:hover:bg-background-darker"
              >
                {columns.map((column) => (
                  <td 
                    key={column.header} 
                    className="px-6 py-4 whitespace-nowrap text-text-primary dark:text-text-dark"
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row items-center justify-between px-6 py-3 border-t border-ui-border dark:border-ui-dark-border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-light dark:text-text-dark-secondary">Show</span>
          <Select
            value={pageSize.toString()}
            onChange={(value) => setPageSize(Number(value))}
            options={pageSizeOptions.map(size => ({
              value: size.toString(),
              label: `${size} rows`,
            }))}
            className="w-32"
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default DataTable;