import React from 'react';
import { Breadcrumbs } from './Breadcrumbs.js';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
  showBreadcrumbs = true,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {showBreadcrumbs && <Breadcrumbs className="mb-3" />}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-surface-900 tracking-tight">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-surface-500 mt-1 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
