import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from './Card';

interface StatItem {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
}

interface StatsCardProps {
  title?: string;
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

function StatsCard({ title, stats, columns = 4, className = '' }: StatsCardProps) {
  return (
    <Card title={title} className={className}>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
        {stats.map((stat, index) => (
          <div key={index} className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon && <stat.icon className="h-5 w-5 text-brand-primary dark:text-brand-primary/80" />}
              <dt className="text-sm text-text-light dark:text-text-dark-secondary">{stat.label}</dt>
            </div>
            <dd className="text-lg font-semibold text-text-primary dark:text-text-dark">
              {stat.value}
              {stat.change && (
                <span
                  className={`ml-2 text-sm font-normal ${
                    stat.change.trend === 'up' 
                      ? 'text-status-success-DEFAULT dark:text-status-success-light' 
                      : 'text-status-error-DEFAULT dark:text-status-error-light'
                  }`}
                >
                  {stat.change.trend === 'up' ? '↑' : '↓'} {stat.change.value}%
                </span>
              )}
            </dd>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default StatsCard;