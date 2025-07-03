'use client'

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Define the shape of each option
export interface SelectOption {
  value: string;
  label: string;
}

// Define the props for our component
interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className,
  dropdownClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-full', className)} ref={selectRef}>
      {/* The button that shows the current selection and toggles the dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-base shadow-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={selectedOption ? 'text-foreground' : 'text-card-muted-foreground'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-5 w-5 transform text-foreground/50 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* The dropdown menu */}
      {isOpen && (
        <ul className={cn(
          "absolute z-10 mt-2 w-full rounded-md bg-card py-1 text-base shadow-lg focus:outline-none",
          dropdownClassName
        )}>
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => handleSelect(option)}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-card-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <span className="block truncate">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
