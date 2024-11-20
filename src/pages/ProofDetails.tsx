import React from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Clock, Hash, Activity } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getProofByBenchmark, getProofState, getProofData } from '../lib/api/proofs';
import { formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';

function ProofDetails() {
  const { proofId } = useParams<{ proofId: string }>();
  const benchmarkId = proofId?.split('_')[0];
  const proofIndex = parseInt(proofId?.split('_')[1] || '0');

  const { data: proof, loading: proofLoading, error: proofError } = useApi(
    async () => benchmarkId ? await getProofByBenchmark(benchmarkId) : Promise.reject(new Error('No benchmark ID')),
    [benchmarkId]
  );

  const { data: state, loading: stateLoading, error: stateError } = useApi(
    async () => benchmarkId ? await getProofState(benchmarkId) : Promise.reject(new Error('No benchmark ID')),
    [benchmarkId]
  );

  const { data: proofData, loading: dataLoading, error: dataError } = useApi(
    async () => benchmarkId ? await getProofData(benchmarkId) : Promise.reject(new Error('No benchmark ID')),
    [benchmarkId]
  );

  const loading = proofLoading || stateLoading || dataLoading;
  const error = proofError || stateError || dataError;

  const currentProof = proofData?.merkle_proofs[proofIndex];

  const renderSolution = (solution: any) => {
    if (solution.variables !== null) {
      // SAT Challenge
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary dark:text-text-dark">Boolean Variables</h4>
          <div className="grid grid-cols-10 gap-1">
            {solution.variables.map((value: boolean, idx: number) => (
              <div
                key={idx}
                className={value 
                  ? "text-xs font-mono p-1 text-center rounded bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                  : "text-xs font-mono p-1 text-center rounded bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                }
              >
                {value ? 'T' : 'F'}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (solution.routes !== null) {
      // VRP Challenge
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary dark:text-text-dark">Vehicle Routes</h4>
          <div className="space-y-2">
            {solution.routes.map((route: number[], idx: number) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-xs font-medium text-text-light dark:text-text-dark-secondary w-16">Route {idx + 1}:</span>
                <div className="flex flex-wrap gap-1">
                  {route.map((node: number, nodeIdx: number) => (
                    <React.Fragment key={nodeIdx}>
                      <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                        {node}
                      </span>
                      {nodeIdx < route.length - 1 && (
                        <span className="text-text-light dark:text-text-dark-secondary">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (solution.items !== null) {
      // Knapsack Challenge
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary dark:text-text-dark">Selected Items</h4>
          <div className="flex flex-wrap gap-2">
            {solution.items.map((item: number) => (
              <span
                key={item}
                className="text-sm font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (solution.indexes !== null) {
      // Vector Search Challenge
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary dark:text-text-dark">Vector Indexes</h4>
          <div className="flex flex-wrap gap-2">
            {solution.indexes.map((index: number) => (
              <span
                key={index}
                className="text-sm font-mono bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded"
              >
                {index}
              </span>
            ))}
          </div>
        </div>
      );
    }

    return (
      <pre className="text-sm text-text-primary dark:text-text-dark">
        {JSON.stringify(solution, null, 2)}
      </pre>
    );
  };

  return (
    <PageLayout
      title="Proof Details"
      subtitle={proofId}
      icon={Shield}
      backLink="/proofs"
      loading={loading}
      error={error}
      empty={!proof}
    >

      {proof && state && proofData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Proof Info" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-2">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Benchmark ID</dt>
                  <dd className="mt-1 text-sm font-mono text-text-primary dark:text-text-dark" style={{wordWrap: "break-word"}}>
                    {proof.benchmark_id}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Added</dt>
                  <dd className="mt-1 text-sm text-text-primary dark:text-text-dark">
                    {formatDate(proof.datetime_added)}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card title="Proof State" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Block Confirmed</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.block_confirmed}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Submission Delay</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.submission_delay}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>

          {currentProof && (
            <Card title={`Proof Data (${proofIndex + 1} of ${proofData.merkle_proofs.length})`} className='shadow-none border-black'>
              <div className="space-y-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                    Leaf Data
                  </h3>
                  <dl className="grid grid-cols-3 gap-4">
                    <div>
                      <dt className="text-sm text-text-light dark:text-text-dark-secondary">Nonce</dt>
                      <dd className="mt-1 text-sm font-mono text-text-primary dark:text-text-dark">
                        {currentProof.leaf.nonce}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-text-light dark:text-text-dark-secondary">Fuel Consumed</dt>
                      <dd className="mt-1 text-sm font-mono text-text-primary dark:text-text-dark">
                        {currentProof.leaf.fuel_consumed.toLocaleString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-text-light dark:text-text-dark-secondary">Runtime Signature</dt>
                      <dd className="mt-1 text-sm font-mono text-text-primary dark:text-text-dark">
                        {currentProof.leaf.runtime_signature.toString(16)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-text-primary dark:text-text-dark mb-4">
                    Solution
                  </h3>
                  {renderSolution(currentProof.leaf.solution)}
                </div>

                {currentProof.branch && (
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-text-primary dark:text-text-dark mb-2">
                      Merkle Branch
                    </h3>
                    <div className="overflow-x-auto">
                      <pre className="text-sm text-text-primary dark:text-text-dark">
                        {JSON.stringify(currentProof.branch, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </PageLayout>
  );
}

export default ProofDetails;