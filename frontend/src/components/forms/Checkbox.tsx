import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, description, id, disabled, ...props }, ref) => {
    return (
      <div className="flex items-start gap-2.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className={`h-4 w-4 rounded border-surface-300 text-brand-900 focus:ring-brand-900 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 mt-0.5 ${className}`}
          {...props}
        />
        {(label || description) && (
          <div className="text-sm select-none">
            {label && (
              <label htmlFor={id} className="font-medium text-surface-800 cursor-pointer">
                {label}
              </label>
            )}
            {description && <p className="text-xs text-surface-500">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
