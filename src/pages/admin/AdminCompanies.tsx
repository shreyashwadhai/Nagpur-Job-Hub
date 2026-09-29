import React, { useState } from "react";
import { mockCompanies } from "../../data/mockCompanies";
import { VerificationBadge } from "../../components/ui/Badges";
import { useToast } from "../../context/ToastContext";
import { Icon } from "@iconify/react";

export const AdminCompanies: React.FC = () => {
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  const filtered = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            Company Directory Moderation
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage verified status badges and entity details.
          </p>
        </div>
        <button
          onClick={() => showToast("Add Company Form Opened", "info")}
          className="px-4 py-2 bg-[#F28C28] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
          <span>Add New Entity</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <input
          type="text"
          placeholder="Search entities by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b">
              <tr>
                <th className="p-3">Company Entity</th>
                <th className="p-3">Zone / SEZ</th>
                <th className="p-3">Industry</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="font-bold text-gray-800">{c.name}</span>
                  </td>
                  <td className="p-3 text-gray-600">{c.sezZone}</td>
                  <td className="p-3 text-gray-600">{c.industry}</td>
                  <td className="p-3">
                    <VerificationBadge status={c.verificationStatus} />
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() =>
                        showToast(
                          `Verified status toggled for ${c.name}`,
                          "success",
                        )
                      }
                      className="px-2.5 py-1 bg-[#0B5D3B]/10 text-[#0B5D3B] font-bold rounded-lg"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
