import React from 'react';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`border-b border-ui-border dark:border-ui-dark-border ${className}`}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary dark:text-brand-primary/80'
                  : 'border-transparent text-text-light dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark hover:border-ui-border dark:hover:border-ui-dark-border'
              }
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-primary/80'
                    : 'bg-background-light dark:bg-background-darker text-text-primary dark:text-text-dark'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Tabs;