import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Clock, Hash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getBenchmarks } from '../lib/api/benchmarks';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Select from '../components/Select';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import type { Benchmark } from '../types/api';

const pageSizeOptions = [
  { value: '10', label: '10 per page' },
  { value: '25', label: '25 per page' },
  { value: '50', label: '50 per page' },
  { value: '100', label: '100 per page' },
];

function Benchmarks() {
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['benchmarks', pageSize, currentPage],
    queryFn: () => getBenchmarks(currentPage, pageSize),
  });

  const benchmarks = data?.data || [];
  const totalCount = data?.total || 0;

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPreviousPage = currentPage > 0;
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalCount);

  const columns = [
    {
      header: 'Benchmark ID',
      accessor: (benchmark: Benchmark) => (
        <Link
          to={`/benchmark/${benchmark.id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Activity className="h-4 w-4 mr-2" />
          {benchmark.id}
        </Link>
      ),
    },
    {
      header: 'Added',
      accessor: (benchmark: Benchmark) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm text-text-light dark:text-text-dark-secondary">
            {formatDate(benchmark.datetime_added)}
          </span>
        </div>
      ),
    },
    {
      header: 'Merkle Root',
      accessor: (benchmark: Benchmark) => (
        <div className="flex items-center">
          <Hash className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm font-mono text-text-light dark:text-text-dark-secondary">
            {benchmark.merkle_root 
              ? `${benchmark.merkle_root.slice(0, 8)}...${benchmark.merkle_root.slice(-6)}`
              : 'N/A'
            }
          </span>
        </div>
      ),
    },
    {
      header: 'Solutions',
      accessor: (benchmark: Benchmark) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {benchmark.num_solutions}
        </span>
      ),
    },
  ];

  return (
    <PageLayout
      title="Benchmarks"
      icon={Activity}
      backLink="/"
      loading={isLoading}
      error={error}
      empty={!benchmarks?.length}
    >

      <Card title="Recent Benchmarks" className="dark:bg-background-dark shadow-none border-black" noPadding={true}>
        <div className="space-y-4">
          <div className="flex justify-end items-center pr-6">
            <div className="flex items-center gap-2">
              <span className="text-text-light dark:text-text-dark-secondary">Show</span>
              <Select
                options={pageSizeOptions}
                value={pageSize.toString()}
                onChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(0);
                }}
                className="w-40"
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState error={error} />
          ) : !benchmarks?.length ? (
            <EmptyState message="No benchmarks found" icon={Activity} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-background-light dark:bg-background-darker">
                      {columns.map((column) => (
                        <th key={column.header} className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border">
                    {benchmarks.map((benchmark: Benchmark) => (
                      <tr key={benchmark.id} className="hover:bg-background-light dark:hover:bg-background-darker">
                        {columns.map((column) => (
                          <td key={`${benchmark.id}-${column.header}`} className="px-6 py-4 whitespace-nowrap">
                            {column.accessor(benchmark)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-t border-ui-border dark:border-ui-dark-border px-4 py-3">
                <div>
                  <p className="text-text-light dark:text-text-dark-secondary text-center">
                    Showing <span className="font-medium">{startItem}</span> to{' '}
                    <span className="font-medium">{endItem}</span>{' '}
                    of <span className="font-medium">{totalCount}</span> results
                  </p>
                </div>
                <div className="flex gap-2 flex-col text-center lg:flex-row">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={!hasPreviousPage || isFetching}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-text-light dark:text-text-dark-secondary">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={!hasNextPage || isFetching}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </PageLayout>
  );
}

export default Benchmarks;