import React from 'react';
import { LucideIcon } from 'lucide-react';
import Stat from './Stat';

interface StatItem {
  label: string;
  value: string | number;
  icon?: LucideIcon;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

function StatsGrid({ stats, columns = 4, className = '' }: StatsGridProps) {
  return (
    <div className={`
      grid grid-cols-1 
      ${columns === 2 ? 'md:grid-cols-2' : 
        columns === 3 ? 'md:grid-cols-3' : 
        'md:grid-cols-4'} 
      gap-4 
      ${className}
    `}>
      {stats.map((stat, index) => (
        <Stat 
          key={index} 
          {...stat} 
          className="bg-background-light dark:bg-background-darker"
        />
      ))}
    </div>
  );
}

export default StatsGrid;