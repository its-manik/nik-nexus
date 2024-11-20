import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  className?: string;
}

function Stat({ label, value, icon: Icon, className = '' }: StatProps) {
  return (
    <div className={`
      bg-background-light dark:bg-background-darker 
      border border-ui-border dark:border-ui-dark-border
      p-4 rounded-lg 
      ${className}
    `}>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="h-5 w-5 text-brand-primary dark:text-brand-primary/80" />}
        <dt className="text-sm text-text-light dark:text-text-dark-secondary">{label}</dt>
      </div>
      <dd className="text-lg font-semibold text-text-primary dark:text-text-dark">{value}</dd>
    </div>
  );
}

export default Stat;