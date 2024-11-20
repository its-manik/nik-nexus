import React from 'react';
import { Link } from 'react-router-dom';
import { Blocks as BlocksIcon } from 'lucide-react';
import { useInfiniteQuery } from '../hooks/useInfiniteQuery';
import { getBlocks } from '../lib/api/blocks';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import LoadingState from '../components/LoadingState';
import type { Block } from '../types/api';

const PAGE_SIZE = 25;

function Blocks() {
  const {
    items: blocks,
    isLoading,
    isError,
    error,
    loadMoreRef,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['blocks'],
    queryFn: (page) => getBlocks(page, PAGE_SIZE),
    pageSize: PAGE_SIZE,
  });

  const columns = [
    {
      header: 'Height',
      accessor: (block: Block) => (
        <Link
          to={`/block/${block.id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <BlocksIcon className="h-4 w-4 mr-2" />
          {block.height}
        </Link>
      ),
    },
    {
      header: 'Added',
      accessor: (block: Block) => (
        <span className="text-sm text-text-light dark:text-text-dark-secondary">
          {formatDate(block.datetime_added)}
        </span>
      ),
    },
    {
      header: 'Round',
      accessor: (block: Block) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {block.round}
        </span>
      ),
    },
    {
      header: 'TIG Block',
      accessor: (block: Block) => (
        <span className="text-sm text-text-light dark:text-text-dark-secondary">
          {block.eth_block_num || 'N/A'}
        </span>
      ),
    },
  ];

  return (
    <PageLayout
      title="Blocks"
      icon={BlocksIcon}
      backLink="/"
      loading={isLoading}
      error={error}
      empty={!blocks?.length}
    >


      <Card title="Recent Blocks" className='shadow-none border-black z-50'>
        <DataTable
          columns={columns}
          data={blocks || []}
          keyExtractor={(block) => block.id}
        />
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetching && (
            <LoadingState 
              message={
                <span className="text-text-light dark:text-text-dark-secondary">
                  Loading more blocks...
                </span>
              }
            />
          )}
        </div>
      </Card>
    </PageLayout>
  );
}

export default Blocks; 