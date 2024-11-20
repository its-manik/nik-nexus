import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from '../lib/api/client';
import { getAverageBlockTime } from '../lib/api/blocks';
import Card from './Card';

interface NetworkStats {
  total_blocks: number;
  total_players: number;
  total_algorithms: number;
  total_benchmarks: number;
  total_proofs: number;
  num_qualifiers_this_block: number;
  num_proofs_this_block: number;
  num_benchmarks_this_block: number;
  num_frauds_this_block: number;
}

async function fetchNetworkStats(): Promise<NetworkStats> {
  try {
    console.log('[fetchNetworkStats] Fetching network stats...');
    const data = await fetchAPI<NetworkStats>('/stats');
    console.log('[fetchNetworkStats] Raw response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('[fetchNetworkStats] Error:', error);
    throw error;
  }
}

function StatsPanel() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['networkStats'],
    queryFn: fetchNetworkStats,
  });

  const { data: avgBlockTime, isLoading: avgTimeLoading, error: avgTimeError } = useQuery({
    queryKey: ['avgBlockTime'],
    queryFn: getAverageBlockTime,
  });

  const isLoading = statsLoading || avgTimeLoading;
  const error = statsError || avgTimeError;

  if (isLoading) {
    return (
      <Card title="Network Overview">
        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-6 bg-background-light dark:bg-background-darker rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Network Overview">
        <div className="text-status-error-DEFAULT dark:text-status-error-light text-sm">
          Failed to fetch network stats
        </div>
      </Card>
    );
  }

  return (
    <Card title="Network Overview" className='shadow-none border-black 2xl:col-auto col-span-1'>
      <dl className="space-y-3">
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Total Blocks</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.total_blocks.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Average Block Time</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {avgBlockTime ? `${avgBlockTime.toFixed(2)}s` : 'N/A'}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Total Players</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.total_players.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Total Algorithms</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.total_algorithms.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Total Benchmarks</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.total_benchmarks.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Total Proofs</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.total_proofs.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Current Block Qualifiers</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.num_qualifiers_this_block.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Current Block Proofs</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.num_proofs_this_block.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Current Block Benchmarks</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.num_benchmarks_this_block.toLocaleString()}
          </dd>
        </div>
        <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
          <dt className="text-xs text-text-light dark:text-text-dark-secondary">Current Block Frauds</dt>
          <dd className="mt-0.5 text-xl font-semibold text-text-primary dark:text-text-dark">
            {stats?.num_frauds_this_block.toLocaleString()}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

export default StatsPanel;
