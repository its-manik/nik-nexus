import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

const variants: Record<AlertVariant, { icon: typeof AlertCircle; colors: string }> = {
  success: {
    icon: CheckCircle,
    colors: 'bg-status-success-light dark:bg-status-success-dark/20 text-status-success-DEFAULT dark:text-status-success-light border-status-success-DEFAULT/20 dark:border-status-success-dark/30',
  },
  error: {
    icon: AlertCircle,
    colors: 'bg-status-error-light dark:bg-status-error-dark/20 text-status-error-DEFAULT dark:text-status-error-light border-status-error-DEFAULT/20 dark:border-status-error-dark/30',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-status-warning-light dark:bg-status-warning-dark/20 text-status-warning-DEFAULT dark:text-status-warning-light border-status-warning-DEFAULT/20 dark:border-status-warning-dark/30',
  },
  info: {
    icon: Info,
    colors: 'bg-status-info-light dark:bg-status-info-dark/20 text-status-info-DEFAULT dark:text-status-info-light border-status-info-DEFAULT/20 dark:border-status-info-dark/30',
  },
};

function Alert({
  title,
  children,
  variant = 'info',
  onClose,
  className = '',
}: AlertProps) {
  const { icon: Icon, colors } = variants[variant];

  return (
    <div className={`rounded-md border p-4 ${colors} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className="text-sm mt-1">{children}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Alert;