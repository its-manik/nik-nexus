import React from 'react';

interface DifficultyParameter {
  name: string;
  max_value: number;
  min_value: number;
}

interface DifficultyTableProps {
  data: Record<string, DifficultyParameter[]>;
}

const CHALLENGE_NAMES = {
  'c001': 'Satisfiability',
  'c002': 'Vehicle Routing',
  'c003': 'Knapsack',
  'c004': 'Vector Search'
} as const;

function DifficultyTable({ data }: DifficultyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-ui-border dark:divide-ui-dark-border">
        <thead>
          <tr className="bg-background-light dark:bg-background-darker">
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
              Challenge
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
              Parameter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
              Min Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
              Max Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
              Range
            </th>
          </tr>
        </thead>
        <tbody className="bg-background-white dark:bg-background-dark divide-y divide-ui-border dark:divide-ui-dark-border">
          {Object.entries(data).map(([challengeId, parameters]) => (
            <React.Fragment key={challengeId}>
              {parameters.map((param, paramIndex) => (
                <tr key={`${challengeId}-${param.name}`} className="hover:bg-background-light dark:hover:bg-background-darker">
                  {paramIndex === 0 && (
                    <td 
                      className="px-6 py-4 text-sm font-medium text-text-primary dark:text-text-dark whitespace-nowrap"
                      rowSpan={parameters.length}
                    >
                      {CHALLENGE_NAMES[challengeId as keyof typeof CHALLENGE_NAMES] || challengeId}
                    </td>
                  )}
                  <td className="px-6 py-4 text-sm text-text-primary dark:text-text-dark whitespace-nowrap">
                    {param.name.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-brand-primary dark:text-brand-primary/80 whitespace-nowrap">
                    {param.min_value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-brand-primary dark:text-brand-primary/80 whitespace-nowrap">
                    {param.max_value === 2147483647 ? '∞' : param.max_value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-grow h-2 bg-background-light dark:bg-background-darker rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-primary dark:bg-brand-primary/80 rounded-full transition-all"
                          style={{
                            width: `${(param.min_value / (param.max_value === 2147483647 ? param.min_value * 2 : param.max_value)) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DifficultyTable; 