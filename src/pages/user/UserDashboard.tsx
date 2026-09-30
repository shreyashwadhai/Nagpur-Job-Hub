import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { mockJobs } from "../../data/mockJobs";
import { JobCard, KPICard } from "../../components/ui/Cards";

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const savedJobs = mockJobs.filter((j) => user.savedJobIds.includes(j.id));
  const appliedJobs = mockJobs.filter((j) => user.appliedJobIds.includes(j.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0B5D3B]"
          />
          <div>
            <span className="text-[10px] font-tech font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded">
              Job Seeker Portal
            </span>
            <h1 className="text-2xl font-bold text-[#1F2937] font-sans mt-0.5">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs text-gray-500">
              Nagpur Career & Intelligence Dashboard
            </p>
          </div>
        </div>

        <Link
          to="/jobs"
          className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <Icon icon="solar:magnifer-linear" className="w-4 h-4" />
          <span>Discover Opportunities</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          title="Applied Opportunities"
          value={appliedJobs.length}
          icon="solar:case-bold-duotone"
        />
        <KPICard
          title="Saved Opportunities"
          value={savedJobs.length}
          icon="solar:bookmark-bold-duotone"
        />
        <KPICard
          title="Active Job Alerts"
          value={user.jobAlerts.length}
          icon="solar:bell-bold-duotone"
        />
      </div>

      {/* Applied Applications Tracker */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937] font-sans">
          Recent Application Submissions
        </h3>
        {appliedJobs.length > 0 ? (
          <div className="space-y-3">
            {appliedJobs.map((j) => (
              <div
                key={j.id}
                className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={j.companyLogo}
                    alt={j.companyName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#1F2937]">
                      {j.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {j.companyName} • {j.sezZone}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                  Under Review
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            No active applications submitted yet.
          </p>
        )}
      </div>

      {/* Recommended Jobs */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937] font-sans">
          Recommended Opportunities for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.slice(0, 4).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </div>
    </div>
  );
};
