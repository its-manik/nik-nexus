import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity, Clock, Hash } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getBenchmark, getBenchmarkState, getBenchmarkData } from '../lib/api/benchmarks';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';

function BenchmarkDetails() {
  const { benchmarkId } = useParams<{ benchmarkId: string }>();

  const { data: benchmark, loading: benchmarkLoading, error: benchmarkError } = useApi(
    () => benchmarkId ? getBenchmark(benchmarkId) : null,
    [benchmarkId]
  );

  const { data: state, loading: stateLoading, error: stateError } = useApi(
    () => benchmarkId ? getBenchmarkState(benchmarkId) : null,
    [benchmarkId]
  );

  const { data: benchmarkData, loading: dataLoading, error: dataError } = useApi(
    () => benchmarkId ? getBenchmarkData(benchmarkId) : null,
    [benchmarkId]
  );

  const loading = benchmarkLoading || stateLoading || dataLoading;
  const error = benchmarkError || stateError || dataError;

  return (
    <PageLayout
      title="Benchmark Details"
      subtitle={benchmarkId}
      icon={Activity}
      backLink="/benchmarks"
      loading={loading}
      error={error}
      empty={!benchmark}
    >

      {benchmark && state && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Benchmark Info" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Added</dt>
                  <dd className="mt-1 text-sm text-text-primary dark:text-text-dark">
                    {formatDate(benchmark.datetime_added)}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Solutions</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {benchmark.num_solutions}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg col-span-2">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Merkle Root</dt>
                  <dd className="mt-1 text-sm font-mono text-text-primary dark:text-text-dark break-all">
                    {benchmark.merkle_root || 'N/A'}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card title="Benchmark State" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Block Confirmed</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.block_confirmed}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Sampled Nonces</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.sampled_nonces.length}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>

          {benchmarkData && (
            <Card title="Solutions" className='shadow-none border-black'>
              <div className="space-y-4">
                {benchmarkData.solution_nonces.map((nonce, index) => (
                  <div key={index} className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Solution {index + 1}
                    </h3>
                    <pre className="text-sm text-text-light dark:text-text-dark-secondary overflow-x-auto">
                      {JSON.stringify(nonce, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </PageLayout>
  );
}

export default BenchmarkDetails;