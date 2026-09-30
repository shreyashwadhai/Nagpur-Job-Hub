import React from "react";
import { Breadcrumb } from "./Breadcrumb";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
}) => {
  return (
    <div className="mb-8">
      <Breadcrumb />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E9E6] shadow-sm">
        <div>
          {badge && (
            <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 border border-[#F28C28]/20 px-2.5 py-0.5 rounded-md mb-2">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] tracking-tight font-sans">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
};
