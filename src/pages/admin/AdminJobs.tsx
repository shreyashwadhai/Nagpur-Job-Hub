import React from "react";
import { mockJobs } from "../../data/mockJobs";
import { useToast } from "../../context/ToastContext";
import { Icon } from "@iconify/react";

export const AdminJobs: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            Job Listings Moderation
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            AI Duplicate Detection & Scraper Validation Queue.
          </p>
        </div>
        <button
          onClick={() =>
            showToast(
              "AI Duplicate Scraper Triggered. 0 Duplicates Found.",
              "success",
            )
          }
          className="px-4 py-2 bg-[#F28C28] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
        >
          <Icon icon="solar:stars-minimalistic-bold" className="w-4 h-4" />
          <span>Run Duplicate Detection</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <div className="space-y-3">
          {mockJobs.map((j) => (
            <div
              key={j.id}
              className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-[#1F2937]">{j.title}</h4>
                <p className="text-xs text-gray-500">
                  {j.companyName} • {j.sezZone} • Source: {j.source}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    showToast(`Job ${j.title} approved`, "success")
                  }
                  className="px-3 py-1.5 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl"
                >
                  Approve Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
