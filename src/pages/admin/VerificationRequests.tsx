import React from "react";
import { mockVerificationRequests } from "../../data/mockAdminData";
import { useToast } from "../../context/ToastContext";

export const VerificationRequests: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
          Claim Verification Queue
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review corporate email matching and MIDC allotment proof documents.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <div className="space-y-3">
          {mockVerificationRequests.map((v) => (
            <div
              key={v.id}
              className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-bold text-sm text-[#1F2937]">
                  {v.companyName}
                </h4>
                <p className="text-xs text-gray-500">
                  Requester: {v.requesterName} ({v.requesterEmail})
                </p>
                <p className="text-[11px] text-gray-600 mt-1">
                  Proof Doc:{" "}
                  <span className="font-semibold text-[#0B5D3B]">
                    {v.documentName}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    showToast(`Claim for ${v.companyName} Approved!`, "success")
                  }
                  className="px-4 py-2 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl"
                >
                  Approve Claim
                </button>
                <button
                  onClick={() =>
                    showToast(`Claim for ${v.companyName} Rejected`, "error")
                  }
                  className="px-4 py-2 bg-red-100 text-red-700 text-xs font-bold rounded-xl"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
