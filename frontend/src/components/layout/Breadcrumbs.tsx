import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrent: boolean;
}

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  students: 'Student Management',
  teachers: 'Teacher Management',
  classes: 'Classes & Grades',
  subjects: 'Curriculum & Subjects',
  assessments: 'Continuous Assessments',
  examinations: 'Examinations',
  attendance: 'Attendance Registry',
  reports: 'Academic Reports',
  settings: 'School Settings',
  'audit-logs': 'Audit Logs',
  profile: 'Institutional Profile',
};

export const Breadcrumbs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      path: '/dashboard',
      isCurrent: pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard'),
    },
  ];

  let accumulatedPath = '';
  pathnames.forEach((segment, index) => {
    if (segment === 'dashboard') return;
    accumulatedPath += `/${segment}`;
    const isCurrent = index === pathnames.length - 1;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');

    items.push({
      label,
      path: accumulatedPath,
      isCurrent,
    });
  });

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-surface-500 select-none ${className}`}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-surface-400 mx-1 shrink-0" />}
            {item.isCurrent ? (
              <span className="font-semibold text-brand-900 truncate max-w-[200px]" aria-current="page">
                {index === 0 && <Home className="w-3.5 h-3.5 inline mr-1 text-surface-500" />}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-brand-900 transition-colors flex items-center"
              >
                {index === 0 && <Home className="w-3.5 h-3.5 mr-1" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
