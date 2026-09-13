import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 text-surface-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-surface-900 transition-colors placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-surface-100 disabled:text-surface-500 disabled:cursor-not-allowed ${
            leftIcon ? 'pl-9' : ''
          } ${rightIcon ? 'pr-9' : ''} ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-surface-300 focus:border-brand-700 focus:ring-brand-100'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-surface-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
