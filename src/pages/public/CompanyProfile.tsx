import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockCompanies } from "../../data/mockCompanies";
import { mockJobs } from "../../data/mockJobs";
import { mockNews } from "../../data/mockNews";
import { JobCard, NewsCard } from "../../components/ui/Cards";
import { VerificationBadge } from "../../components/ui/Badges";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { useModal } from "../../context/ModalContext";

export const CompanyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "news">(
    "overview",
  );

  const company = mockCompanies.find((c) => c.id === id) || mockCompanies[0];
  const companyJobs = mockJobs.filter((j) => j.companyId === company.id);
  const companyNews = mockNews.filter(
    (n) => n.companyId === company.id || n.companyName === company.name,
  );

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <Breadcrumb />

      {/* Profile Banner */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] p-6 sm:p-8 shadow-soft relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={company.logo}
              alt={company.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100 shadow-md flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
                  {company.name}
                </h1>
                <VerificationBadge status={company.verificationStatus} />
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="solar:map-point-bold"
                    className="w-4 h-4 text-[#F28C28]"
                  />
                  {company.location} ({company.sezZone})
                </span>
                <span className="flex items-center gap-1">
                  <Icon
                    icon="solar:buildings-bold"
                    className="w-4 h-4 text-[#0B5D3B]"
                  />
                  {company.industry}
                </span>
                <span className="flex items-center gap-1">
                  <Icon
                    icon="solar:calendar-bold"
                    className="w-4 h-4 text-gray-400"
                  />
                  Established {company.entryYear}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
            <button
              onClick={() => openModal("claim-company", company)}
              className="px-4 py-2.5 rounded-xl bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Icon icon="solar:shield-check-bold" className="w-4 h-4" />
              <span>Claim Profile</span>
            </button>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#F5F8F6] hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-1.5 border border-gray-200 transition-all"
            >
              <span>Visit Corporate Site</span>
              <Icon
                icon="solar:square-share-line-bold"
                className="w-4 h-4 text-gray-500"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E9E6] pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-[#0B5D3B] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon icon="solar:info-circle-bold" className="w-4 h-4" />
          <span>Overview & Headcount</span>
        </button>

        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "jobs"
              ? "bg-[#0B5D3B] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon icon="solar:case-bold" className="w-4 h-4" />
          <span>Open Jobs ({companyJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("news")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "news"
              ? "bg-[#0B5D3B] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon icon="solar:document-text-bold" className="w-4 h-4" />
          <span>News & Policy Impact ({companyNews.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-[#1F2937] font-sans">
                About Company
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                {company.overview}
              </p>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Core Business Focus
                </h4>
                <p className="text-xs text-gray-800 font-semibold">
                  {company.businessFocus}
                </p>
              </div>
            </div>

            {/* Growth Trajectory Chart */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#1F2937] font-sans">
                    Nagpur Headcount Trajectory
                  </h3>
                  <p className="text-xs text-gray-500">
                    Historical local workforce growth in Nagpur facility
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0B5D3B] bg-[#0B5D3B]/10 px-3 py-1 rounded-full">
                  {company.employeeBand} Employees
                </span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={company.growthTrajectory}>
                    <defs>
                      <linearGradient
                        id="colorHeadcount"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0B5D3B"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0B5D3B"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="headcount"
                      stroke="#0B5D3B"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorHeadcount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Leadership */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#1F2937]">
                Local Nagpur Leadership
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={company.localLeadership.avatar}
                  alt={company.localLeadership.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#F28C28]/30"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937]">
                    {company.localLeadership.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {company.localLeadership.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-gradient-to-br from-[#F5F8F6] to-gray-100 p-6 rounded-3xl border border-gray-200 space-y-3">
              <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                <Icon
                  icon="solar:shield-check-bold"
                  className="w-5 h-5 text-[#0B5D3B]"
                />
                <span>Verification & Trust Audit</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                This profile data is verified against MIDC allotment records,
                official domain email checks, and public corporate filing APIs.
              </p>
              <button
                onClick={() => openModal("claim-company", company)}
                className="text-xs font-bold text-[#F28C28] hover:underline block"
              >
                Request Data Update / Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: JOBS */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-[#1F2937]">
            Active Openings at {company.name}
          </h3>
          {companyJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 text-center rounded-3xl border border-gray-200">
              <p className="text-xs text-gray-500">
                No active job listings posted for this entity currently.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: NEWS */}
      {activeTab === "news" && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-[#1F2937]">
            News & Policy Coverage
          </h3>
          {companyNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyNews.map((n) => (
                <NewsCard key={n.id} news={n} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 text-center rounded-3xl border border-gray-200">
              <p className="text-xs text-gray-500">
                No recent news articles logged for this entity.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
