import React from 'react';
import { Link } from 'react-router-dom';
import { User, Clock, Wallet, Shield, Key } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '../lib/api/accounts';
import { formatEther, formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import type { Account } from '../types/api';

function Accounts() {
  const {
    data: accountsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['players'],
    queryFn: () => getAccounts(),
  });

  const accounts = accountsData?.data || [];

  const columns = [
    {
      header: 'Account',
      accessor: (account: Account) => (
        <Link
          to={`/account/${account.id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Wallet className="h-4 w-4 mr-2" />
          <span className="font-mono">
            {`${account.id.slice(0, 6)}...${account.id.slice(-4)}`}
          </span>
        </Link>
      ),
    },
    {
      header: 'Added',
      accessor: (account: Account) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm text-text-light dark:text-text-dark-secondary">
            {formatDate(account.datetime_added)}
          </span>
        </div>
      ),
    },
    {
      header: 'Balance',
      accessor: (account: Account) => (
        <span className="text-sm font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">
          {formatEther(account.balance)} TIG
        </span>
      ),
    },
    {
      header: 'Round Earnings',
      accessor: (account: Account) => (
        <span className="text-sm font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">
          {formatEther(account.round_earnings || '0')} TIG
        </span>
      ),
    },
    {
      header: 'Type',
      accessor: (account: Account) => (
        <div className="flex items-center">
          <Shield className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm text-text-light dark:text-text-dark-secondary">
            {account.is_multisig ? 'Multi-sig' : 'Standard'}
          </span>
        </div>
      ),
    },
    {
      header: 'API Key',
      accessor: (account: Account) => (
        <div className="flex items-center">
          <Key className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm font-mono text-text-light dark:text-text-dark-secondary">
            {account.api_key ? `${account.api_key.slice(0, 8)}...` : 'N/A'}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-darker">
      <PageLayout
        title="Players"
        icon={User}
        backLink="/"
        loading={isLoading}
        error={error}
        empty={!accounts || accounts.length === 0}
      >

        <Card title="Active Players" className="bg-background-white dark:bg-background-dark shadow-none border-black">
          <DataTable
            columns={columns}
            data={accounts}
            keyExtractor={(account) => account.id}
          />
        </Card>
      </PageLayout>
    </div>
  );
}

export default Accounts;
