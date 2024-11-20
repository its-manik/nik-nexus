import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { useInfiniteQuery } from '../hooks/useInfiniteQuery';
import { getChallenges } from '../lib/api/challenges';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import LoadingState from '../components/LoadingState';
import type { Challenge } from '../types/api';

const PAGE_SIZE = 25;

function Challenges() {
  const {
    items: challenges,
    isLoading,
    isError,
    error,
    loadMoreRef,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['challenges'],
    queryFn: (page) => getChallenges(page, PAGE_SIZE),
    pageSize: PAGE_SIZE,
  });

  const columns = [
    {
      header: 'Challenge ID',
      accessor: (challenge: Challenge) => (
        <Link
          to={`/challenge/${challenge.id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <BarChart2 className="h-4 w-4 mr-2" />
          {challenge.id}
        </Link>
      ),
    },
    {
      header: 'Name',
      accessor: (challenge: Challenge) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {challenge.name}
        </span>
      ),
    },
    {
      header: 'Added',
      accessor: (challenge: Challenge) => (
        <span className="text-sm text-text-light dark:text-text-dark-secondary">
          {formatDate(challenge.datetime_added)}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-darker">
      <PageLayout
        title="Challenges"
        icon={BarChart2}
        backLink="/"
        loading={isLoading}
        error={error}
        empty={!challenges?.length}
      >


        <Card title="Active Challenges" className="bg-background-white dark:bg-background-dark shadow-none border-black">
          <DataTable
            columns={columns}
            data={challenges || []}
            keyExtractor={(challenge) => challenge.id}
          />
          <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
            {isFetching && (
              <LoadingState 
                message={
                  <span className="text-text-light dark:text-text-dark-secondary">
                    Loading more challenges...
                  </span>
                }
              />
            )}
          </div>
        </Card>
      </PageLayout>
    </div>
  );
}

export default Challenges;