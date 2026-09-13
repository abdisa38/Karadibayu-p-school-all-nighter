import React from 'react';

interface FormFieldProps {
  label?: string;
  id?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  helperText,
  required,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-semibold text-surface-700 tracking-wide uppercase">
            {label}
            {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        </div>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-600 font-medium" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-surface-500">{helperText}</p>
      ) : null}
    </div>
  );
};
