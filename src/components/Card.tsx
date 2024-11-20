import React from "react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  /** Optional card title */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Optional icon component from lucide-react */
  icon?: LucideIcon;
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Optional action buttons or controls */
  actions?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Disable default padding */
  noPadding?: boolean;
}

/**
 * Card component provides a consistent container for content sections.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Card title="User Profile">
 *   <UserDetails user={user} />
 * </Card>
 *
 * // With actions and footer
 * <Card
 *   title="Settings"
 *   icon={Settings}
 *   actions={<Button>Save</Button>}
 *   footer={<StatusMessage>Last saved 5 minutes ago</StatusMessage>}
 * >
 *   <SettingsForm />
 * </Card>
 * ```
 */
function Card({
  title,
  description,
  icon: Icon,
  children,
  className = "",
  actions,
  footer,
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-background-white dark:bg-background-dark 
        border border-ui-border dark:border-ui-dark-border 
        rounded-lg shadow-sm z-50 relative
        ${noPadding ? "" : "p-6"} 
        ${className}
      `}
    >
      {(title || description || Icon || actions) && (
        <div
          className={`flex items-start justify-between ${
            noPadding ? "p-6 pb-0" : "p-6 pb-4"
          }`}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon className="h-5 w-5 text-text-light dark:text-text-dark-secondary" />
            )}
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-text-primary dark:text-text-dark">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-text-light dark:text-text-dark-secondary">
                  {description}
                </p>
              )}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className={noPadding ? "" : "mt-4"}>{children}</div>

      {footer && (
        <div
          className={`border-t border-ui-border dark:border-ui-dark-border ${
            noPadding ? "p-6 pt-4" : "mt-6 pt-4"
          }`}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
