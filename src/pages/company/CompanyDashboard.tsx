import React from "react";
import { Icon } from "@iconify/react";
import { mockCompanies } from "../../data/mockCompanies";
import { mockJobs } from "../../data/mockJobs";
import { KPICard } from "../../components/ui/Cards";
import { VerificationBadge } from "../../components/ui/Badges";
import { useModal } from "../../context/ModalContext";

export const CompanyDashboard: React.FC = () => {
  const company = mockCompanies[0]; // InfoCepts
  const activeJobs = mockJobs.filter((j) => j.companyId === company.id);
  const { openModal } = useModal();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-14 h-14 rounded-2xl object-cover border"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
                {company.name}
              </h1>
              <VerificationBadge status={company.verificationStatus} />
            </div>
            <p className="text-xs text-gray-500">
              {company.location} • Company Portal
            </p>
          </div>
        </div>

        <button
          onClick={() => openModal("claim-company", company)}
          className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <Icon icon="solar:shield-check-bold" className="w-4 h-4" />
          <span>Verification Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          title="Profile Views"
          value="4,820"
          change="+28%"
          icon="solar:eye-bold-duotone"
        />
        <KPICard
          title="Active Job Postings"
          value={activeJobs.length}
          icon="solar:case-round-bold-duotone"
        />
        <KPICard
          title="Total Candidate Applications"
          value="342"
          change="+14%"
          icon="solar:users-group-two-rounded-bold-duotone"
        />
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937] font-sans">
          Active Postings in Nagpur
        </h3>
        <div className="space-y-3">
          {activeJobs.map((j) => (
            <div
              key={j.id}
              className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-[#1F2937]">{j.title}</h4>
                <p className="text-xs text-gray-500">
                  {j.salaryRange} • Posted {j.postedDate}
                </p>
              </div>
              <span className="px-3 py-1 bg-[#0B5D3B]/10 text-[#0B5D3B] text-xs font-bold rounded-full">
                48 Applicants
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
