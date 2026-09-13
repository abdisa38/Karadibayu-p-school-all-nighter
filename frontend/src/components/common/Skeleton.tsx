import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    rect: 'rounded-md',
    circle: 'rounded-full',
  }[variant];

  return (
    <div
      className={`animate-pulse bg-surface-200/80 ${variantStyles} ${className}`}
      aria-hidden="true"
    />
  );
};
