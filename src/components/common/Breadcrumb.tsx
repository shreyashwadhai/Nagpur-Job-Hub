import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 overflow-x-auto py-1">
      <Link to="/" className="flex items-center gap-1 hover:text-[#0B5D3B] transition-colors">
        <Icon icon="solar:home-2-bold" className="w-3.5 h-3.5 text-[#F28C28]" />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <React.Fragment key={routeTo}>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-gray-400 flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-[#0B5D3B] truncate max-w-[150px]">{formattedName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-[#0B5D3B] transition-colors capitalize">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
