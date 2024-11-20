import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

function Select({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  className = '',
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text-primary dark:text-text-dark mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            block w-full pl-2 py-2 text-base 
            border border-ui-border dark:border-ui-dark-border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
            bg-background-white dark:bg-background-dark 
            text-text-primary dark:text-text-dark
            disabled:bg-background-light dark:disabled:bg-background-darker
            disabled:text-text-light dark:disabled:text-text-dark-secondary
          `}
        >
          {placeholder && (
            <option value="" disabled className="text-text-light dark:text-text-dark-secondary">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-text-primary dark:text-text-dark">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;