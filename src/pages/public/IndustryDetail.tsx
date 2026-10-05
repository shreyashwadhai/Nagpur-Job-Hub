import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockIndustries } from "../../data/mockIndustries";
import { mockCompanies } from "../../data/mockCompanies";
import { mockJobs } from "../../data/mockJobs";
import { CompanyCard, JobCard } from "../../components/ui/Cards";
import { Breadcrumb } from "../../components/common/Breadcrumb";

export const IndustryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const industry =
    mockIndustries.find((ind) => ind.id === id) || mockIndustries[0];

  const industryCompanies = mockCompanies.filter(
    (c) =>
      c.industryId === industry.id ||
      c.industry
        .toLowerCase()
        .includes(industry.name.toLowerCase().split(" ")[0]),
  );
  const industryJobs = mockJobs.filter((j) =>
    industryCompanies.some((c) => c.id === j.companyId),
  );

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumb />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] p-6 sm:p-8 shadow-soft space-y-6" data-aos="fade-down">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center">
              <Icon icon={industry.icon} className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-sans uppercase bg-[#F28C28]/10 text-[#F28C28]">
                {industry.growthRate}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-[#1F2937] font-sans mt-1">
                {industry.name}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 text-center text-xs">
            <div>
              <span className="block font-bold text-lg font-sans text-[#1F2937]">
                {industry.totalCompanies}
              </span>
              <span className="text-[10px] text-gray-400">Companies</span>
            </div>
            <div>
              <span className="block font-bold text-lg font-sans text-[#0B5D3B]">
                {industry.totalJobs}
              </span>
              <span className="text-[10px] text-gray-400">Jobs</span>
            </div>
            <div>
              <span className="block font-bold text-lg font-sans text-[#F28C28]">
                {(industry.totalEmployment / 1000).toFixed(1)}k
              </span>
              <span className="text-[10px] text-gray-400">Workforce</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed font-sans max-w-4xl">
          {industry.description}
        </p>
      </div>

      {/* HISTORICAL GROWTH CHART */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4" data-aos="fade-up">
        <h3 className="font-bold text-lg text-[#1F2937] font-sans">
          Historical Growth Trajectory (2021-2025)
        </h3>
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industry.historicalGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="companies"
                name="Companies"
                fill="#0B5D3B"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="jobs"
                name="Open Positions"
                fill="#F28C28"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MAJOR COMPANIES IN THIS SECTOR */}
      <div className="space-y-4" data-aos="fade-up">
        <h3 className="font-bold text-xl text-[#1F2937] font-sans">
          Major Employers in {industry.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryCompanies.map((c, idx) => (
            <CompanyCard key={c.id} company={c} index={idx} />
          ))}
        </div>
      </div>

      {/* OPEN POSITIONS */}
      {industryJobs.length > 0 && (
        <div className="space-y-4" data-aos="fade-up">
          <h3 className="font-bold text-xl text-[#1F2937] font-sans">
            Open Positions in Sector
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryJobs.map((j, idx) => (
              <JobCard key={j.id} job={j} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
