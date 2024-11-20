import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-text-light dark:text-text-dark-secondary" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="text-brand-primary hover:text-brand-primary/80 dark:text-brand-primary/80 dark:hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-light dark:text-text-dark-secondary">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumbs;