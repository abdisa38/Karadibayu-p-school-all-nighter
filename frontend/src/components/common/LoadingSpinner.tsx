import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand' | 'white' | 'teal';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'brand',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  }[size];

  const colorClasses = {
    brand: 'border-brand-200 border-t-brand-900',
    white: 'border-white/30 border-t-white',
    teal: 'border-teal-200 border-t-teal-700',
  }[color];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full animate-spin ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
