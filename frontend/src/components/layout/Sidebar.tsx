import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  Award,
  Clock,
  Bell,
  Settings,
  ShieldCheck,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { KaradibayuSchoolLogo } from '../logo/KaradibayuSchoolLogo.js';
import { useAuth } from '../../context/AuthContext.js';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavSection {
  title: string;
  items: Array<{
    label: string;
    path: string;
    icon: React.ElementType;
    badge?: string;
  }>;
}

const navSections: NavSection[] = [
  {
    title: 'Core System',
    items: [
      { label: 'System Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Academic Structure',
    items: [
      { label: 'Classes & Grades', path: '/classes', icon: BookOpen, badge: 'Phase 3' },
      { label: 'Curriculum & Subjects', path: '/subjects', icon: GraduationCap, badge: 'Phase 3' },
      { label: 'Academic Calendar', path: '/academic-calendar', icon: Calendar, badge: 'Phase 3' },
    ],
  },
  {
    title: 'Institutional Registry',
    items: [
      { label: 'Student Directory', path: '/students', icon: Users, badge: 'Phase 3' },
      { label: 'Faculty & Teachers', path: '/teachers', icon: UserCheck, badge: 'Phase 2' },
      { label: 'Parents & Guardians', path: '/parents', icon: Users, badge: 'Phase 3' },
    ],
  },
  {
    title: 'Examinations & Grading',
    items: [
      { label: 'Continuous Assessment', path: '/assessments', icon: ClipboardList, badge: 'Phase 4' },
      { label: 'Examinations', path: '/examinations', icon: FileSpreadsheet, badge: 'Phase 4' },
      { label: 'Academic Report Cards', path: '/report-cards', icon: Award, badge: 'Phase 4' },
    ],
  },
  {
    title: 'School Operations',
    items: [
      { label: 'Daily Attendance', path: '/attendance', icon: Clock, badge: 'Phase 5' },
      { label: 'Announcements', path: '/announcements', icon: Bell, badge: 'Phase 5' },
    ],
  },
  {
    title: 'System Governance',
    items: [
      { label: 'Audit Log Registry', path: '/audit-logs', icon: ShieldCheck, badge: 'Phase 5' },
      { label: 'Institutional Settings', path: '/settings', icon: Settings, badge: 'Phase 5' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-900/60 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-brand-950 text-white flex flex-col border-r border-brand-900 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header with School Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-900 bg-brand-950">
          <KaradibayuSchoolLogo size="md" variant="full" theme="dark" />
          <button
            onClick={onClose}
            className="text-surface-400 hover:text-white lg:hidden p-1 rounded-md focus:outline-none"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* School System Sub-label */}
        <div className="px-5 py-2 bg-brand-900/40 border-b border-brand-900/60 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400">
            Primary Portal
          </span>
          <span className="text-[10px] text-surface-400 font-mono">v1.0.0</span>
        </div>

        {/* Nav Links Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto" aria-label="Main Navigation">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-surface-400 select-none">
                {section.title}
              </h3>
              <div className="mt-1 space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `group flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors select-none ${
                          isActive
                            ? 'bg-brand-800 text-white shadow-xs'
                            : 'text-surface-300 hover:bg-brand-900/60 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isActive ? 'text-teal-400' : 'text-surface-400 group-hover:text-white'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-900 text-teal-300 border border-brand-700 font-mono shrink-0">
                              {item.badge}
                            </span>
                          )}
                          {!item.badge && isActive && (
                            <ChevronRight className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-3 border-t border-brand-900 bg-brand-950/80">
          <div className="flex items-center justify-between p-2 rounded-md bg-brand-900/50 border border-brand-800">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs font-semibold text-white truncate">
                {user ? `${user.firstName} ${user.lastName}` : 'System Administrator'}
              </span>
              <span className="text-[10px] text-teal-400 font-mono uppercase tracking-wider truncate">
                {user?.role || 'SUPER_ADMIN'}
              </span>
            </div>
            <button
              onClick={logout}
              title="Sign Out of Portal"
              className="text-surface-400 hover:text-red-400 p-1.5 rounded hover:bg-brand-900 transition-colors focus:outline-none"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
