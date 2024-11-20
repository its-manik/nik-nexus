import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { classNames } from '../lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  backLink?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}

function PageHeader({
  title,
  subtitle,
  icon: Icon,
  backLink,
  backLabel = 'Back',
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={classNames('mb-8', className)}>
      {backLink && (
        <div className="mb-4">
          <Link to={backLink} className="flex items-center text-brand-primary hover:text-brand-primary/80 dark:text-brand-primary/80 dark:hover:text-brand-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backLabel}
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-8 w-8 text-brand-primary dark:text-brand-primary/80" />}
          <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-dark">{title}</h1>
            {subtitle && <p className="text-sm text-text-light dark:text-text-dark-secondary">{subtitle}</p>}
          </div>
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}

export default PageHeader;