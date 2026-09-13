import { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, disabled, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-surface-900 transition-colors placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-surface-100 disabled:text-surface-500 disabled:cursor-not-allowed ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
            : 'border-surface-300 focus:border-brand-700 focus:ring-brand-100'
        } ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
