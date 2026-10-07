import React from "react";
import { Icon } from "@iconify/react";
import type { ImpactLevel, VerificationStatus } from "../../types";

export const VerificationBadge: React.FC<{ status: VerificationStatus }> = ({
  status,
}) => {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B] border border-[#0B5D3B]/20">
        <Icon
          icon="solar:verified-check-bold"
          className="w-3.5 h-3.5 text-[#0B5D3B]"
        />
        Verified Entity
      </span>
    );
  }
  if (status === "estimated") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F28C28]/10 text-[#F28C28] border border-[#F28C28]/20">
        <Icon
          icon="solar:info-square-bold"
          className="w-3.5 h-3.5 text-[#F28C28]"
        />
        Estimated Data
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-300">
        <Icon
          icon="solar:clock-circle-bold"
          className="w-3.5 h-3.5 text-amber-600"
        />
        Verification Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
      <Icon icon="solar:document-text-linear" className="w-3.5 h-3.5" />
      Public Record
    </span>
  );
};

export const ImpactBadge: React.FC<{ impact: ImpactLevel }> = ({ impact }) => {
  const isHigh = impact === "High";
  const isMed = impact === "Medium";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-md border ${
        isHigh
          ? "bg-[#F28C28]/15 text-[#F28C28] border-[#F28C28]/30"
          : isMed
            ? "bg-[#0B5D3B]/10 text-[#0B5D3B] border-[#0B5D3B]/20"
            : "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      <Icon
        icon={isHigh ? "solar:flame-bold" : "solar:graph-up-bold"}
        className="w-3 h-3"
      />
      Nagpur Impact: {impact}
    </span>
  );
};

export const AISummaryBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 border border-purple-200">
    <Icon
      icon="solar:stars-minimalistic-bold"
      className="w-3 h-3 text-purple-600"
    />
    AI Intelligence
  </span>
);
