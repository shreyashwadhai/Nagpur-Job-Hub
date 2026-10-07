import React from "react";
import { useAuth } from "../../context/AuthContext";
import { mockJobs } from "../../data/mockJobs";
import { JobCard } from "../../components/ui/Cards";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const SavedJobs: React.FC = () => {
  const { user } = useAuth();
  const savedJobs = mockJobs.filter((j) => user.savedJobIds.includes(j.id));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm" data-aos="fade-down">
        <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
          Saved Opportunities ({savedJobs.length})
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Bookmarked career listings in Nagpur industrial hubs.
        </p>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((j, idx) => (
            <JobCard key={j.id} job={j} index={idx} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 space-y-3">
          <Icon
            icon="solar:bookmark-bold-duotone"
            className="w-12 h-12 text-[#F28C28] mx-auto"
          />
          <h3 className="font-bold text-base text-gray-800">
            No Saved Jobs Yet
          </h3>
          <p className="text-xs text-gray-500">
            Explore job opportunities and click the bookmark icon to save them
            here.
          </p>
          <Link
            to="/jobs"
            className="inline-block px-4 py-2 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl"
          >
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
};
