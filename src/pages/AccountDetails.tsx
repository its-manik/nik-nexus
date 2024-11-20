import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wallet, Clock, Activity } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getAccount } from '../lib/api/accounts';
import { formatDate, formatEther } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import type { PlayerBlockData } from '../types/api';

function AccountDetails() {
  const { accountId } = useParams<{ accountId: string }>();

  const { data: accountData, loading, error } = useApi<PlayerBlockData[]>(
    async () => accountId ? await getAccount(accountId) : Promise.reject(new Error('No account ID')),
    [accountId]
  );

  const columns = [
    {
      header: 'Block',
      accessor: (data: PlayerBlockData) => (
        <Link
          to={`/block/${data.block_id}`}
          className="text-sm font-medium text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          {data.block_id}
        </Link>
      ),
    },
    {
      header: 'Qualifiers',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {Object.values(data.num_qualifiers_by_challenge).reduce((a, b) => a + b, 0)}
        </span>
      ),
    },
    {
      header: 'Cutoff',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {data.cutoff}
        </span>
      ),
    },
    {
      header: 'Imbalance',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {data.imbalance.toFixed(4)}
        </span>
      ),
    },
    {
      header: 'Penalty',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {data.imbalance_penalty.toFixed(4)}
        </span>
      ),
    },
    {
      header: 'Influence',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {data.influence.toFixed(4)}
        </span>
      ),
    },
    {
      header: 'Reward',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">
          {formatEther(data.reward.toString())} TIG
        </span>
      ),
    },
    {
      header: 'Balance',
      accessor: (data: PlayerBlockData) => (
        <span className="text-sm font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">
          {data.rolling_balance ? `${formatEther(data.rolling_balance.toString())} TIG` : 'N/A'}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-darker">
      <PageLayout
        title="Account Details"
        subtitle={accountId}
        icon={Wallet}
        backLink="/accounts"
        loading={loading}
        error={error}
        empty={!accountData}
      >

        {accountData && (
          <Card title="Account History" className="bg-background-white dark:bg-background-dark shadow-none border-black">
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
                  {accountData.map((data) => (
                    <tr key={data.block_id} className="hover:bg-background-light dark:hover:bg-background-darker">
                      {columns.map((column) => (
                        <td key={`${data.block_id}-${column.header}`} className="px-6 py-4 whitespace-nowrap">
                          {column.accessor(data)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </PageLayout>
    </div>
  );
}

export default AccountDetails;