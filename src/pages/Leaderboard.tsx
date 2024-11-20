import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Wallet, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../lib/api/accounts';
import { formatEther, formatDate } from '../lib/utils';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import type { LeaderboardEntry } from '../types/api';

function Leaderboard() {
  const { data: leaderboardData, isLoading, isError, error } = useQuery({
    queryKey: ['leaderboard', 10],
    queryFn: () => getLeaderboard(10),
  });

  const entries = leaderboardData?.data || [];

  const renderRankBadge = (index: number) => {
    const badgeStyles = {
      0: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800/30',
      1: 'bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700/30',
      2: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800/30',
    }[index] || 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-100 dark:border-blue-800/30';

    return (
      <div className={`px-3 py-1 rounded-full border ${badgeStyles} text-sm font-semibold`}>
        #{index + 1}
      </div>
    );
  };

  const renderQualifiers = (qualifiers: Record<string, number>) => {
    return (
      <div className="space-y-1">
        {Object.entries(qualifiers).map(([challenge, count]) => (
          <div key={challenge} className="flex items-center justify-between text-xs">
            <span className="text-text-light dark:text-text-dark-secondary">{challenge}:</span>
            <span className="font-medium text-text-primary dark:text-text-dark">{count}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PageLayout
      title="Leaderboard"
      subtitle="Top Performers"
      icon={Trophy}
      backLink="/"
      loading={isLoading}
      error={error}
      empty={!entries.length}
    >

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={entry.id} className="hover:bg-background-light dark:hover:bg-background-darker transition-colors shadow-none border-black">
            <div className="flex items-start gap-6">
              {/* Rank & Basic Info */}
              <div className="flex items-center gap-4">
                {renderRankBadge(index)}
                <div>
                  <Link
                    to={`/account/${entry.id}`}
                    className="flex items-center text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    <span className="font-mono">
                      {`${entry.id.slice(0, 6)}...${entry.id.slice(-4)}`}
                    </span>
                  </Link>
                  <div className="text-xs text-text-light dark:text-text-dark-secondary mt-1">
                    Last Active: {formatDate(entry.datetime_added)}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-4 gap-4">
                {/* Earnings */}
                <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
                  <div className="text-xs text-text-light dark:text-text-dark-secondary mb-1">Round Earnings</div>
                  <div className="font-semibold text-brand-primary-DEFAULT dark:text-brand-primary-dark">
                    {formatEther(entry.round_earnings)} TIG
                  </div>
                </div>

                {/* Qualifiers */}
                <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
                  <div className="text-xs text-text-light dark:text-text-dark-secondary mb-1">Qualifiers</div>
                  {renderQualifiers(entry.num_qualifiers_by_challenge)}
                </div>

                {/* Performance Metrics */}
                <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
                  <div className="text-xs text-text-light dark:text-text-dark-secondary mb-1">Performance</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-light dark:text-text-dark-secondary">Cutoff:</span>
                      <span className="font-medium text-text-primary dark:text-text-dark">{entry.cutoff.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-light dark:text-text-dark-secondary">Influence:</span>
                      <span className="font-medium text-text-primary dark:text-text-dark">{(entry.influence / 1e18).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Rewards & Balance */}
                <div className="bg-background-light dark:bg-background-darker p-3 rounded-lg">
                  <div className="text-xs text-text-light dark:text-text-dark-secondary mb-1">Rewards</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-light dark:text-text-dark-secondary">Reward:</span>
                      <span className="font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">{formatEther(entry.reward)} TIG</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-light dark:text-text-dark-secondary">Balance:</span>
                      <span className="font-medium text-brand-primary-DEFAULT dark:text-brand-primary-dark">
                        {entry.rolling_balance ? formatEther(entry.rolling_balance) : '0'} TIG
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

export default Leaderboard; 