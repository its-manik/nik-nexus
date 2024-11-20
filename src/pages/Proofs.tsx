import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Hash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProofs } from '../lib/api/proofs';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import type { Proof } from '../types/api';

interface ProofWithStatus extends Proof {
  id: string;
  block_id: string;
  status: 'pending' | 'verified' | 'rejected';
}

function Proofs() {
  const { data: proofsData, isLoading, isError, error } = useQuery({
    queryKey: ['proofs'],
    queryFn: () => getProofs(),
  });

  const proofs: ProofWithStatus[] = (proofsData?.data || []).map(proof => ({
    ...proof,
    id: `${proof.benchmark_id}_0`,
    block_id: proof.benchmark_id.split('_')[0],
    status: 'pending'
  }));

  const columns = [
    {
      header: 'Proof ID',
      accessor: (proof: ProofWithStatus) => (
        <Link
          to={`/proof/${proof.id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Shield className="h-4 w-4 mr-2" />
          {proof.id}
        </Link>
      ),
    },
    {
      header: 'Benchmark',
      accessor: (proof: ProofWithStatus) => (
        <Link
          to={`/benchmark/${proof.benchmark_id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Activity className="h-4 w-4 mr-2" />
          {proof.benchmark_id}
        </Link>
      ),
    },
    {
      header: 'Block',
      accessor: (proof: ProofWithStatus) => (
        <Link
          to={`/block/${proof.block_id}`}
          className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          <Hash className="h-4 w-4 mr-2" />
          {proof.block_id}
        </Link>
      ),
    },
    {
      header: 'Added',
      accessor: (proof: ProofWithStatus) => (
        <span className="text-text-light dark:text-text-dark-secondary">
          {formatDate(proof.datetime_added)}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (proof: ProofWithStatus) => {
        const statusColors = {
          pending: 'bg-status-warning-light dark:bg-status-warning-dark/20 text-status-warning-dark dark:text-status-warning-light',
          verified: 'bg-status-success-light dark:bg-status-success-dark/20 text-status-success-dark dark:text-status-success-light',
          rejected: 'bg-status-error-light dark:bg-status-error-dark/20 text-status-error-dark dark:text-status-error-light',
        }[proof.status];

        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors}`}>
            {proof.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-darker">
      <PageLayout
        title="Proofs"
        icon={Shield}
        backLink="/"
        loading={isLoading}
        error={error}
        empty={!proofs.length}
      >

        <Card title="Recent Proofs" className="bg-background-white dark:bg-background-dark shadow-none border-black">
          <DataTable
            columns={columns}
            data={proofs}
            keyExtractor={(proof) => proof.id}
          />
        </Card>
      </PageLayout>
    </div>
  );
}

export default Proofs;