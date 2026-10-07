import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Icon } from "@iconify/react";

export const JobAlerts: React.FC = () => {
  const { user, addJobAlert, removeJobAlert } = useAuth();
  const { showToast } = useToast();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("MIHAN SEZ");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    addJobAlert(keyword.trim(), location);
    showToast(`Alert set for "${keyword.trim()}" in ${location}!`, "success");
    setKeyword("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
          Job Alert Rules
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Receive automated notifications when matching opportunities are posted
          in Nagpur.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4"
      >
        <h3 className="font-bold text-base text-[#1F2937]">
          Create New Job Alert
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Target Keyword / Skill
            </label>
            <input
              type="text"
              required
              placeholder="e.g. React Developer, Aerospace Engineer"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Preferred Zone
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              <option value="MIHAN SEZ">MIHAN SEZ</option>
              <option value="IT Park Parsodi">IT Park Parsodi</option>
              <option value="Hingna MIDC">Hingna MIDC</option>
              <option value="Butibori Industrial Area">
                Butibori Industrial Area
              </option>
              <option value="All Nagpur">All Nagpur</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#0B5D3B] hover:bg-[#087F5B] text-white text-xs font-bold rounded-xl shadow-sm"
        >
          Save Alert Rule
        </button>
      </form>

      {/* Existing Rules */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-3">
        <h3 className="font-bold text-base text-[#1F2937]">
          Active Alert Rules ({user.jobAlerts.length})
        </h3>
        {user.jobAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-sm text-[#1F2937]">
                {alert.keyword}
              </h4>
              <p className="text-xs text-gray-500">
                {alert.location} • Frequency: {alert.frequency}
              </p>
            </div>
            <button
              onClick={() => {
                removeJobAlert(alert.id);
                showToast("Alert rule removed", "info");
              }}
              className="text-red-600 hover:text-red-700 text-xs font-bold flex items-center gap-1"
            >
              <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
