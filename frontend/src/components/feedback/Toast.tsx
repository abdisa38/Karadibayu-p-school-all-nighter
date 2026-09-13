import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-600 shrink-0" />,
  };

  const borderClass = {
    success: 'border-l-4 border-l-emerald-600',
    error: 'border-l-4 border-l-red-600',
    warning: 'border-l-4 border-l-amber-600',
    info: 'border-l-4 border-l-brand-600',
  }[toast.type];

  return (
    <div
      role="status"
      className={`flex items-start gap-3 w-80 sm:w-96 p-4 bg-white rounded-lg shadow-elevated border border-surface-200 ${borderClass} transition-all duration-200 pointer-events-auto`}
    >
      {iconMap[toast.type]}
      <div className="flex-1 min-w-0">
        {toast.title && <h4 className="text-sm font-semibold text-surface-900 mb-0.5">{toast.title}</h4>}
        <p className="text-xs text-surface-600 leading-normal break-words">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-surface-400 hover:text-surface-600 rounded p-0.5 focus-visible:outline-none"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
