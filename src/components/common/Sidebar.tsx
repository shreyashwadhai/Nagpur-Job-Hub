import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { role } = useAuth();

  const userNav = [
    { label: 'Overview Dashboard', path: '/user/dashboard', icon: 'solar:widget-bold-duotone' },
    { label: 'Saved Opportunities', path: '/user/saved-jobs', icon: 'solar:bookmark-bold-duotone' },
    { label: 'Job Alerts', path: '/user/alerts', icon: 'solar:bell-bold-duotone' },
    { label: 'Explore Directory', path: '/companies', icon: 'solar:buildings-bold-duotone' },
  ];

  const companyNav = [
    { label: 'Company Overview', path: '/company/dashboard', icon: 'solar:widget-bold-duotone' },
    { label: 'Company Profile', path: '/company/profile', icon: 'solar:buildings-bold-duotone' },
    { label: 'Manage Job Listings', path: '/company/jobs', icon: 'solar:case-round-bold-duotone' },
    { label: 'Candidate Analytics', path: '/company/analytics', icon: 'solar:chart-2-bold-duotone' },
    { label: 'Domain Verification', path: '/company/verification', icon: 'solar:verified-check-bold-duotone' },
  ];

  const adminNav = [
    { label: 'System Intelligence', path: '/admin/dashboard', icon: 'solar:widget-bold-duotone' },
    { label: 'Company Moderation', path: '/admin/companies', icon: 'solar:buildings-bold-duotone' },
    { label: 'Verification Claims', path: '/admin/verification', icon: 'solar:shield-check-bold-duotone' },
    { label: 'Jobs Moderation', path: '/admin/jobs', icon: 'solar:case-round-bold-duotone' },
    { label: 'News Moderation', path: '/admin/news', icon: 'solar:document-text-bold-duotone' },
    { label: 'User Directory', path: '/admin/users', icon: 'solar:users-group-two-rounded-bold-duotone' },
    { label: 'Data Feeds & Scrapers', path: '/admin/data-sources', icon: 'solar:server-bold-duotone' },
    { label: 'System Audit Logs', path: '/admin/audit-logs', icon: 'solar:history-bold-duotone' },
  ];

  const navItems = role === 'admin' ? adminNav : role === 'company' ? companyNav : userNav;
  const panelTitle = role === 'admin' ? 'Admin Intelligence' : role === 'company' ? 'Company Enterprise' : 'Job Seeker Portal';

  return (
    <aside className="w-64 bg-white border-r border-[#E5E9E6] hidden md:flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Panel Header Badge */}
      <div className="p-4 border-b border-[#E5E9E6]">
        <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-1 rounded-md block w-fit mb-1">
          {panelTitle}
        </span>
        <h3 className="font-semibold text-sm text-[#1F2937]">Nagpur Hub Management</h3>
      </div>

      {/* Nav List */}
      <nav className="p-3 space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#0B5D3B] text-white font-semibold shadow-md shadow-[#0B5D3B]/20'
                  : 'text-gray-700 hover:bg-[#F5F8F6] hover:text-[#0B5D3B]'
              }`}
            >
              <Icon icon={item.icon} className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Public Site */}
      <div className="p-4 border-t border-[#E5E9E6] bg-[#F5F8F6]">
        <Link
          to="/"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-200/70 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon icon="solar:home-2-bold" className="w-4 h-4 text-[#F28C28]" />
            <span>Public Platform</span>
          </div>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
