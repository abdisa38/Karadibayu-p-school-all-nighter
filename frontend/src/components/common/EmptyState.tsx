import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-surface-300 bg-white/50 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center text-surface-500 mb-4 border border-surface-200">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-surface-800 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
