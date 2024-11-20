import React from 'react';
import { classNames } from '../lib/utils';

type StatusVariant = 'success' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<StatusVariant, string> = {
  success: 'bg-status-success-light dark:bg-status-success-dark/20 text-status-success-DEFAULT dark:text-status-success-light',
  warning: 'bg-status-warning-light dark:bg-status-warning-dark/20 text-status-warning-DEFAULT dark:text-status-warning-light',
  error: 'bg-status-error-light dark:bg-status-error-dark/20 text-status-error-DEFAULT dark:text-status-error-light',
  info: 'bg-status-info-light dark:bg-status-info-dark/20 text-status-info-DEFAULT dark:text-status-info-light',
};

function StatusBadge({ variant, children, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default StatusBadge;