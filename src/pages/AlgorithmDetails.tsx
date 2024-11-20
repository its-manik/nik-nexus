import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code, TrendingUp, Users, Activity } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { 
  getAlgorithm, 
  getAlgorithmState, 
  getAlgorithmBlockData 
} from '../lib/api/algorithms';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import DataTable from '../components/DataTable';

function AlgorithmDetails() {
  const { algorithmId } = useParams<{ algorithmId: string }>();

  const { data: algorithm, loading: algorithmLoading, error: algorithmError } = useApi(
    async () => algorithmId ? await getAlgorithm(algorithmId) : Promise.reject(new Error('No algorithm ID')),
    [algorithmId]
  );

  const { data: state, loading: stateLoading, error: stateError } = useApi(
    async () => algorithmId ? await getAlgorithmState(algorithmId) : Promise.reject(new Error('No algorithm ID')),
    [algorithmId]
  );

  const { data: blockData, loading: blockDataLoading, error: blockDataError } = useApi(
    async () => {
      if (!algorithmId || !state?.block_confirmed) {
        return Promise.reject(new Error('Missing required data'));
      }
      return await getAlgorithmBlockData(algorithmId, state.block_confirmed.toString());
    },
    [algorithmId, state?.block_confirmed]
  );

  const loading = algorithmLoading || stateLoading || blockDataLoading;
  const error = algorithmError || stateError || blockDataError;

  const qualifierColumns = [
    {
      header: 'Player Address',
      accessor: ([address]: [string, number]) => (
        <Link
          to={`/account/${address}`}
          className="text-sm font-mono text-brand-primary hover:text-brand-primary/80 dark:text-brand-primary/80 dark:hover:text-brand-primary"
        >
          {`${address.slice(0, 8)}...${address.slice(-6)}`}
        </Link>
      ),
    },
    {
      header: 'Qualifiers',
      accessor: ([_, count]: [string, number]) => (
        <span className="text-sm text-text-primary dark:text-text-dark">{count}</span>
      ),
    },
  ];

  return (
    <PageLayout
      title="Algorithm Details"
      subtitle={algorithmId}
      icon={Code}
      backLink="/algorithms"
      loading={loading}
      error={error}
      empty={!algorithm}
      actions={
        <Link to={`/algorithm/${algorithmId}/code`}>
          <Button
            variant="primary"
            className="flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            View Source Code
          </Button>
        </Link>
      }
    >

      {algorithm && state && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
            <Card title="Algorithm Info" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Name</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {algorithm.name}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Added</dt>
                  <dd className="mt-1 text-sm text-text-primary dark:text-text-dark">
                    {formatDate(algorithm.datetime_added)}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Player</dt>
                  <dd className="mt-1">
                    <Link
                      to={`/account/${algorithm.player_id}`}
                      className="text-sm font-mono text-brand-primary hover:text-brand-primary/80 dark:text-brand-primary/80 dark:hover:text-brand-primary"
                    >
                      {`${algorithm.player_id.slice(0, 8)}...${algorithm.player_id.slice(-6)}`}
                    </Link>
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Challenge</dt>
                  <dd className="mt-1">
                    <Link
                      to={`/challenge/${algorithm.challenge_id}`}
                      className="text-sm text-brand-primary hover:text-brand-primary/80 dark:text-brand-primary/80 dark:hover:text-brand-primary"
                    >
                      {algorithm.challenge_id}
                    </Link>
                  </dd>
                </div>
              </dl>
            </Card>

            <Card title="Algorithm State" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Block Confirmed</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.block_confirmed}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Round Submitted</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.round_submitted}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Round Pushed</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.round_pushed || 'N/A'}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Round Merged</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.round_merged || 'N/A'}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>

          {blockData && (
            <Card title="Block Data" className='shadow-none border-black'>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-brand-primary dark:text-brand-primary/80" />
                    <h3 className="text-sm font-medium text-text-primary dark:text-text-dark">Adoption</h3>
                  </div>
                  <p className="text-2xl font-bold text-text-primary dark:text-text-dark">
                    {blockData.adoption || 0}
                  </p>
                </div>

                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-brand-primary dark:text-brand-primary/80" />
                    <h3 className="text-sm font-medium text-text-primary dark:text-text-dark">Merge Points</h3>
                  </div>
                  <p className="text-2xl font-bold text-text-primary dark:text-text-dark">
                    {blockData.merge_points || 0}
                  </p>
                </div>

                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-brand-primary dark:text-brand-primary/80" />
                    <h3 className="text-sm font-medium text-text-primary dark:text-text-dark">Total Qualifiers</h3>
                  </div>
                  <p className="text-2xl font-bold text-text-primary dark:text-text-dark">
                    {blockData.num_qualifiers_by_player
                      ? Object.values(blockData.num_qualifiers_by_player).reduce((a, b) => a + b, 0)
                      : 0}
                  </p>
                </div>
              </div>

              {blockData.num_qualifiers_by_player && (
                <Card title="Qualifiers by Player">
                  <DataTable
                    columns={qualifierColumns}
                    data={Object.entries(blockData.num_qualifiers_by_player)}
                    keyExtractor={([address]) => address}
                  />
                </Card>
              )}
            </Card>
          )}
        </>
      )}
    </PageLayout>
  );
}

export default AlgorithmDetails;
