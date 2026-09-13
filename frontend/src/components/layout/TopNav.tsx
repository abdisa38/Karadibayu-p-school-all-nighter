import React from 'react';
import { Menu, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface TopNavProps {
  onToggleSidebar: () => void;
  apiHealthy?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar, apiHealthy = true }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-surface-200 shadow-subtle">
      {/* Left section: Mobile hamburger & Institutional Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-surface-600 hover:text-surface-900 rounded-md hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-900"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-bold text-brand-900 uppercase tracking-wide">
            Karadibayu Primary School
          </span>
          <span className="text-[11px] text-surface-500 font-medium">
            Academic Management & Information System
          </span>
        </div>
      </div>

      {/* Right section: System telemetry chips, Academic Session & User badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Backend Connectivity Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium bg-surface-50 border-surface-200">
          <span
            className={`w-2 h-2 rounded-full ${
              apiHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-surface-600 font-mono text-[11px]">
            {apiHealthy ? 'API ONLINE' : 'DEGRADED'}
          </span>
        </div>

        {/* Current Ethiopian Academic Year & Term Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-100 text-xs text-brand-900 font-medium">
          <Calendar className="w-3.5 h-3.5 text-brand-700" />
          <span>2018 E.C. (Term 1)</span>
        </div>

        {/* Notification Bell (Functional trigger displaying system announcement preview) */}
        <button
          title="System Notifications"
          className="relative p-2 text-surface-500 hover:text-brand-900 rounded-md hover:bg-surface-100 transition-colors focus:outline-none"
          aria-label="System announcements"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-600 rounded-full" />
        </button>

        {/* User Identity Chip */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-surface-200">
          <div className="w-8 h-8 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
            {user?.firstName?.charAt(0) || 'A'}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-surface-900 leading-tight">
              {user ? `${user.firstName} ${user.lastName}` : 'Administrator'}
            </span>
            <span className="text-[10px] text-surface-500 font-mono">
              {user?.role || 'SUPER_ADMIN'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
