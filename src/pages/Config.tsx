import React from 'react';
import { Settings } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { fetchAPI, validateResponse } from '../lib/api/client';
import { BlockConfigSchema } from '../types/api';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import DifficultyTable from '../components/DifficultyTable';

async function getConfig() {
  try {
    console.log('[getConfig] Fetching latest block configuration...');
    const response = await fetchAPI('/blocks/latest/config');
    console.log('[getConfig] Raw API response:', JSON.stringify(response, null, 2));
    
    const validated = await validateResponse(BlockConfigSchema, response);
    console.log('[getConfig] Validated config:', validated);
    
    return validated;
  } catch (error) {
    console.error('[getConfig] Error fetching config:', error);
    throw error;
  }
}

function Config() {
  const { data: config, loading, error } = useApi(getConfig);

  const formatTitle = (key: string): string => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const renderValue = (key: string, value: unknown): JSX.Element | string => {
    // Use DifficultyTable component for difficulty parameters
    if (key === 'parameters' && typeof value === 'object' && value !== null && 
        value.hasOwnProperty('c001') && value.hasOwnProperty('c002')) {
      return <DifficultyTable data={value as Record<string, Array<{name: string, max_value: number, min_value: number}>>} />;
    }
    
    // Special handling for rewards schedule
    if (key === 'schedule' && Array.isArray(value)) {
      return (
        <div className="space-y-4">
          <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
            <h4 className="text-sm font-medium text-text-primary dark:text-text-dark mb-4">Block Rewards Over Time</h4>
            <div className="relative">
              <div className="absolute left-0 right-0 h-1 bg-ui-border dark:bg-ui-dark-border top-1/2 transform -translate-y-1/2" />
              <div className="relative flex justify-between">
                {value.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-background-white dark:bg-background-dark border border-ui-border dark:border-ui-dark-border rounded-lg p-3 shadow-sm relative z-10">
                      <div className="text-sm font-semibold text-brand-primary-DEFAULT dark:text-brand-primary-dark">
                        {item.block_reward} TIG
                      </div>
                      <div className="text-xs text-text-light dark:text-text-dark-secondary mt-1">
                        Round {item.round_start}
                      </div>
                    </div>
                    <div className="h-2 w-2 bg-brand-primary-DEFAULT dark:bg-brand-primary-dark rounded-full mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <table className="min-w-full divide-y divide-ui-border dark:divide-ui-dark-border">
            <thead>
              <tr className="bg-background-light dark:bg-background-darker">
                <th className="px-4 py-2 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary">Round Start</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary">Block Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border">
              {value.map((item, index) => (
                <tr key={index} className="hover:bg-background-light dark:hover:bg-background-darker">
                  <td className="px-4 py-2 text-sm text-text-primary dark:text-text-dark">Round {item.round_start}</td>
                  <td className="px-4 py-2 text-sm font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">{item.block_reward} TIG</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Default rendering for other values
    if (typeof value === 'object' && value !== null) {
      return (
        <pre className="text-sm font-mono text-text-primary dark:text-text-dark bg-background-light dark:bg-background-darker p-2 rounded">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    return String(value);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-darker">
      <PageLayout
        title="Configuration"
        icon={Settings}
        backLink="/"
        loading={loading}
        error={error}
        empty={!config}
      >

    
        {config && Object.entries(config).map(([section, sectionData]) => (
          <Card key={section} title={formatTitle(section)} className="mb-6 bg-background-white dark:bg-background-dark shadow-none border-black">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-background-light dark:bg-background-darker">
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border">
                  {Object.entries(sectionData).map(([key, value]) => (
                    <tr key={key} className="hover:bg-background-light dark:hover:bg-background-darker">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary dark:text-text-dark">
                        {formatTitle(key)}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap text-sm text-text-light dark:text-text-dark-secondary">
                        {renderValue(key, value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </PageLayout>
    </div>
  );
}

export default Config;