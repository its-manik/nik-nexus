import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
}

function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  className = '',
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-4 py-2 
            border border-ui-border dark:border-ui-dark-border rounded-lg 
            bg-background-white dark:bg-background-dark
            text-text-primary dark:text-text-dark
            placeholder-text-light dark:placeholder-text-dark-secondary
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
          `}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-text-light dark:text-text-dark-secondary" />
        <button
          type="submit"
          className={`
            absolute right-2 top-1.5 px-3 py-1.5 
            bg-brand-primary dark:bg-brand-primary/90 
            text-background-white dark:text-background-dark 
            text-sm font-medium rounded-md 
            hover:bg-brand-primary/90 dark:hover:bg-brand-primary
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary
            dark:focus:ring-offset-background-dark
          `}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchInput;