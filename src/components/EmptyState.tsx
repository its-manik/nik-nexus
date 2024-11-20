import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  icon: LucideIcon;
  className?: string;
}

function EmptyState({ message, icon: Icon, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="rounded-full bg-background-light dark:bg-background-darker p-3">
        <Icon className="h-6 w-6 text-text-light dark:text-text-dark-secondary" />
      </div>
      <p className="mt-4 text-sm text-text-light dark:text-text-dark-secondary">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;