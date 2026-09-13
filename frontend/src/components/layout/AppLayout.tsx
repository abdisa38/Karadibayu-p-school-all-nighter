import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.js';
import { TopNav } from './TopNav.js';
import { PageContainer } from './PageContainer.js';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient.js';
import { ApiResponseEnvelope, SystemHealthData } from '../../types/index.js';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real health check query to backend
  const { data: healthData } = useQuery<ApiResponseEnvelope<SystemHealthData>>({
    queryKey: ['system-health'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponseEnvelope<SystemHealthData>>('/health');
      return res.data;
    },
    refetchInterval: 30000,
    retry: 1,
  });

  const isHealthy = healthData?.data?.status === 'HEALTHY';

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 flex">
      {/* Institutional Responsive Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <TopNav
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          apiHealthy={isHealthy}
        />

        <main className="flex-1">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>

        {/* Institutional Footer */}
        <footer className="py-4 px-6 border-t border-surface-200 bg-white text-center text-xs text-surface-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Karadibayu Primary School &copy; {new Date().getFullYear()} &mdash; All Institutional Rights Reserved.
          </span>
          <span className="font-mono text-[11px] text-surface-400">
            System Core Foundation &bull; Oromia Regional Standard
          </span>
        </footer>
      </div>
    </div>
  );
};
