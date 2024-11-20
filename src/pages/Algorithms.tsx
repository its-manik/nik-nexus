import { Link } from 'react-router-dom';
import { Code, User, Hash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAlgorithms } from '../lib/api/algorithms';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import type { Algorithm } from '../types/api';

function Algorithms() {
  const { data: algorithmsData, isLoading, isError, error } = useQuery({
    queryKey: ['algorithms'],
    queryFn: () => getAlgorithms(),
  });

  const algorithms = algorithmsData?.data || [];

  const columns = [
    {
      header: 'Algorithm ID',
      accessor: (algorithm: Algorithm) => (
        <Link
          to={`/algorithm/${algorithm.id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Code className="h-4 w-4 mr-2" />
          {algorithm.id}
        </Link>
      ),
    },
    {
      header: 'Name',
      accessor: (algorithm: Algorithm) => (
        <span className="text-text-primary dark:text-text-dark">
          {algorithm.name}
        </span>
      ),
    },
    {
      header: 'Player',
      accessor: (algorithm: Algorithm) => (
        <Link
          to={`/account/${algorithm.player_id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <User className="h-4 w-4 mr-2" />
          <span className="font-mono">
            {`${algorithm.player_id.slice(0, 8)}...${algorithm.player_id.slice(-6)}`}
          </span>
        </Link>
      ),
    },
    {
      header: 'Challenge',
      accessor: (algorithm: Algorithm) => (
        <Link
          to={`/challenge/${algorithm.challenge_id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Hash className="h-4 w-4 mr-2" />
          {algorithm.challenge_id}
        </Link>
      ),
    },
    {
      header: 'Added',
      accessor: (algorithm: Algorithm) => (
        <span className="text-text-light dark:text-text-dark-secondary">
          {formatDate(algorithm.datetime_added)}
        </span>
      ),
    },
  ];

  return (
    <PageLayout
      title="Algorithms"
      icon={Code}
      backLink="/"
      loading={isLoading}
      error={error}
      empty={!algorithms.length}
    >

      <Card title="Recent Algorithms" className="dark:bg-background-dark shadow-none border-black">
        <DataTable
          columns={columns}
          data={algorithms}
          keyExtractor={(algorithm) => algorithm.id}
        />
      </Card>
    </PageLayout>
  );
}

export default Algorithms;
