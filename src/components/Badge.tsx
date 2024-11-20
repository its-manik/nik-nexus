import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-background-light dark:bg-background-darker text-text-primary dark:text-text-dark',
    success: 'bg-status-success-light dark:bg-status-success-dark/20 text-status-success-DEFAULT dark:text-status-success-light',
    warning: 'bg-status-warning-light dark:bg-status-warning-dark/20 text-status-warning-DEFAULT dark:text-status-warning-light',
    error: 'bg-status-error-light dark:bg-status-error-dark/20 text-status-error-DEFAULT dark:text-status-error-light',
    info: 'bg-status-info-light dark:bg-status-info-dark/20 text-status-info-DEFAULT dark:text-status-info-light',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        ${variants[variant]} 
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;