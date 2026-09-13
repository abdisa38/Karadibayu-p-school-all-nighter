import React, { ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner.js';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'teal' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-brand-900 hover:bg-brand-800 text-white focus-visible:ring-brand-900 border border-transparent shadow-sm',
    secondary:
      'bg-surface-100 hover:bg-surface-200 text-surface-800 focus-visible:ring-surface-400 border border-surface-300',
    outline:
      'bg-transparent hover:bg-brand-50 text-brand-900 border border-brand-800 focus-visible:ring-brand-900',
    teal:
      'bg-teal-700 hover:bg-teal-800 text-white focus-visible:ring-teal-700 border border-transparent shadow-sm',
    danger:
      'bg-red-700 hover:bg-red-800 text-white focus-visible:ring-red-600 border border-transparent shadow-sm',
    ghost:
      'bg-transparent hover:bg-surface-100 text-surface-700 hover:text-surface-900 border border-transparent',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" color={variant === 'secondary' || variant === 'ghost' ? 'brand' : 'white'} />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
