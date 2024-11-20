import React from 'react';
import { LucideIcon } from 'lucide-react';
import Button from './Button';

interface NoDataProps {
  icon?: LucideIcon;
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

function NoData({ icon: Icon, title, message, action, className = '' }: NoDataProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {Icon && (
        <div className="rounded-full bg-background-light dark:bg-background-darker p-3 mb-4">
          <Icon className="h-6 w-6 text-text-light dark:text-text-dark-secondary" />
        </div>
      )}
      {title && (
        <h3 className="text-lg font-medium text-text-primary dark:text-text-dark mb-2">
          {title}
        </h3>
      )}
      <p className="text-sm text-text-light dark:text-text-dark-secondary text-center max-w-sm mb-6">
        {message}
      </p>
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default NoData;