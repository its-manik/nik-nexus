import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart2, Activity, Hash } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getChallenge, getChallengeState, getChallengeBlockData } from '../lib/api/challenges';
import { getBlocks } from '../lib/api/blocks';
import { formatDate } from '../lib/utils';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';

function ChallengeDetails() {
  const { challengeId } = useParams<{ challengeId: string }>();

  const { data: challenge, loading: challengeLoading, error: challengeError } = useApi(
    async () => challengeId ? await getChallenge(challengeId) : Promise.reject(new Error('No challenge ID')),
    [challengeId]
  );

  const { data: state, loading: stateLoading, error: stateError } = useApi(
    async () => challengeId ? await getChallengeState(challengeId) : Promise.reject(new Error('No challenge ID')),
    [challengeId]
  );

  const { data: blocks, loading: blocksLoading, error: blocksError } = useApi(
    async () => state?.block_confirmed ? await getBlocks(0, 1, false) : Promise.reject(new Error('No block confirmed')),
    [state?.block_confirmed]
  );

  const { data: blockData, loading: blockDataLoading, error: blockDataError } = useApi(
    async () => {
      if (!challengeId || !blocks?.data?.[0]?.id) {
        return Promise.reject(new Error('Missing required data'));
      }
      return await getChallengeBlockData(challengeId, blocks.data[0].id);
    },
    [challengeId, blocks?.data]
  );

  const loading = challengeLoading || stateLoading || blocksLoading || blockDataLoading;
  const error = challengeError || stateError || blocksError || blockDataError;

  // Helper function to transform data for scatter plot
  const transformToScatterData = (data: [number, number][]) => {
    return data.map(([x, y]) => ({
      x,
      y
    }));
  };

  // Helper function to get parameter names based on challenge ID
  const getParameterNames = (challengeId: string) => {
    switch (challengeId) {
      case 'c001': // satisfiability
        return {
          param1: 'Number of Variables',
          param2: 'Clauses to Variables Ratio',
          description: 'Shows the relationship between problem size and complexity'
        };
      case 'c002': // vehicle routing
        return {
          param1: 'Number of Vehicles',
          param2: 'Route Length',
          description: 'Illustrates the trade-off between fleet size and route optimization'
        };
      case 'c003': // knapsack
        return {
          param1: 'Item Count',
          param2: 'Weight Limit',
          description: 'Demonstrates the balance between capacity and item selection'
        };
      case 'c004': // vector search
        return {
          param1: 'Vector Count',
          param2: 'Vector Dimension',
          description: 'Visualizes the scale of vector search problems'
        };
      default:
        return {
          param1: 'Parameter 1',
          param2: 'Parameter 2',
          description: 'Parameter relationship visualization'
        };
    }
  };

  const renderScatterPlot = (data: [number, number][], title: string, color: string) => {
    const scatterData = transformToScatterData(data);
    const paramNames = challenge ? getParameterNames(challenge.id) : { param1: '', param2: '', description: '' };

    return (
      <div className="bg-background-white dark:bg-background-dark p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark mb-2">{title}</h3>
        <p className="text-sm text-text-light dark:text-text-dark-secondary mb-4">{paramNames.description}</p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 40,
                left: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-ui-dark-border" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name={paramNames.param1}
                label={{ 
                  value: paramNames.param1, 
                  position: 'bottom',
                  offset: 20,
                  className: "text-text-primary dark:text-text-dark"
                }}
                tick={{ fill: '#6B7280', className: "dark:fill-text-dark-secondary" }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name={paramNames.param2}
                label={{ 
                  value: paramNames.param2, 
                  angle: -90, 
                  position: 'left',
                  offset: 20,
                  className: "text-text-primary dark:text-text-dark"
                }}
                tick={{ fill: '#6B7280', className: "dark:fill-text-dark-secondary" }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background-white dark:bg-background-dark border border-ui-border dark:border-ui-dark-border p-3 rounded shadow-lg">
                        <p className="text-sm font-medium text-text-primary dark:text-text-dark">
                          {`${paramNames.param1}: ${payload[0].value}`}
                        </p>
                        <p className="text-sm font-medium text-text-primary dark:text-text-dark">
                          {`${paramNames.param2}: ${payload[1].value}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                data={scatterData} 
                fill={color}
                fillOpacity={0.6}
                strokeWidth={1}
                stroke={color}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <PageLayout
      title="Challenge Details"
      subtitle={challengeId}
      icon={BarChart2}
      backLink="/challenges"
      loading={loading}
      error={error}
      empty={!challenge}
    >

      {challenge && state && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Challenge Info" className='shadow-none border-black'>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Name</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark"  style={{wordWrap: "break-word"}}>
                    {challenge.name}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Added</dt>
                  <dd className="mt-1 text-sm text-text-primary dark:text-text-dark">
                    {formatDate(challenge.datetime_added)}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Block Confirmed</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.block_confirmed}
                  </dd>
                </div>
                <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                  <dt className="text-sm text-text-light dark:text-text-dark-secondary">Round Active</dt>
                  <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                    {state.round_active || 'N/A'}
                  </dd>
                </div>
              </dl>
            </Card>

            {blockData && (
              <Card title="Block Data" className='shadow-none border-black'>
                <dl className="grid grid-cols-2 gap-4">
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Block ID</dt>
                    <dd className="mt-1 text-sm font-semibold text-text-primary dark:text-text-dark" style={{wordWrap: "break-word"}}>
                      {blockData.block_id}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Solution Signature Threshold</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.solution_signature_threshold}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Number of Qualifiers</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.num_qualifiers}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Scaling Factor</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.scaling_factor.toFixed(4)}
                    </dd>
                  </div>
                </dl>
              </Card>
            )}
          </div>

          {blockData && (
            <>
              <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Qualifier Difficulties Visualization */}
                {blockData.qualifier_difficulties.length > 0 && (
                  <Card className='shadow-none border-black'>
                    {renderScatterPlot(
                      blockData.qualifier_difficulties,
                      'Qualifier Difficulties',
                      '#4040ff' // Using brand-primary-dark for better visibility in both modes
                    )}
                  </Card>
                )}

                {/* Base Frontier Visualization */}
                {blockData.base_frontier.length > 0 && (
                  <Card className='shadow-none border-black'>
                    {renderScatterPlot(
                      blockData.base_frontier,
                      'Base Frontier',
                      '#810636' // Brand secondary color
                    )}
                  </Card>
                )}

                {/* Cutoff Frontier Visualization (if exists) */}
                {blockData.cutoff_frontier && blockData.cutoff_frontier.length > 0 && (
                  <Card className='shadow-none border-black'>
                    {renderScatterPlot(
                      blockData.cutoff_frontier,
                      'Cutoff Frontier',
                      '#4040ff' // Using brand-primary-dark for better visibility in both modes
                    )}
                  </Card>
                )}
              </div>

              {/* Get parameter names for the tables */}
              {(() => {
                const paramNames = challenge ? getParameterNames(challenge.id) : { param1: '', param2: '', description: '' };
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card title="Qualifier Difficulties" className='shadow-none border-black'>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-background-light dark:bg-background-darker">
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                                {paramNames.param1}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                                {paramNames.param2}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border">
                            {blockData.qualifier_difficulties.map(([param1, param2], index) => (
                              <tr key={index} className="hover:bg-background-light dark:hover:bg-background-darker">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary dark:text-text-dark">{param1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary dark:text-text-dark">{param2}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    <Card title="Base Frontier" className='shadow-none border-black'>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-background-light dark:bg-background-darker">
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                                {paramNames.param1}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                                {paramNames.param2}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border">
                            {blockData.base_frontier.map(([param1, param2], index) => (
                              <tr key={index} className="hover:bg-background-light dark:hover:bg-background-darker">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary dark:text-text-dark">{param1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary dark:text-text-dark">{param2}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                );
              })()}
            </>
          )}
        </>
      )}
    </PageLayout>
  );
}

export default ChallengeDetails;
