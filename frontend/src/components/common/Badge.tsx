import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' | 'teal' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  }[size];

  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 border',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 border',
    danger: 'bg-red-50 text-red-800 border-red-200 border',
    info: 'bg-sky-50 text-sky-800 border-sky-200 border',
    neutral: 'bg-surface-100 text-surface-700 border-surface-200 border',
    brand: 'bg-brand-50 text-brand-900 border-brand-200 border',
    teal: 'bg-teal-50 text-teal-800 border-teal-200 border',
    gold: 'bg-gold-50 text-gold-800 border-gold-200 border',
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md uppercase tracking-wider ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
