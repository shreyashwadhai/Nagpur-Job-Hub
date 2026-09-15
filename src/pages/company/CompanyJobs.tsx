import React from 'react';
import { mockJobs } from '../../data/mockJobs';
import { mockCompanies } from '../../data/mockCompanies';
import { useToast } from '../../context/ToastContext';
import { Icon } from '@iconify/react';

export const CompanyJobs: React.FC = () => {
  const company = mockCompanies[0];
  const companyJobs = mockJobs.filter((j) => j.companyId === company.id);
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] font-display">Manage Job Listings ({companyJobs.length})</h1>
          <p className="text-xs text-gray-500 mt-1">Post and moderate active engineering & tech positions in MIHAN SEZ.</p>
        </div>
        <button
          onClick={() => showToast('New Job Posting Form Opened', 'info')}
          className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      <div className="space-y-4">
        {companyJobs.map((j) => (
          <div key={j.id} className="bg-white p-5 rounded-2xl border border-[#E5E9E6] shadow-sm flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base text-[#1F2937]">{j.title}</h4>
              <p className="text-xs text-gray-500">{j.salaryRange} • {j.experience} • {j.sezZone}</p>
              <div className="flex gap-1.5 mt-2">
                {j.skills.map((s) => (
                  <span key={s} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-semibold">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#0B5D3B]/10 text-[#0B5D3B] text-xs font-bold rounded-full">Active</span>
              <button
                onClick={() => showToast(`Job ${j.title} updated`, 'info')}
                className="p-2 text-gray-500 hover:text-[#0B5D3B] bg-gray-100 rounded-xl"
              >
                <Icon icon="solar:pen-bold" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
