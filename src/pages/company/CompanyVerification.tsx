import React, { useState } from "react";
import { mockCompanies } from "../../data/mockCompanies";
import { VerificationBadge } from "../../components/ui/Badges";
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";
import { Icon } from "@iconify/react";

export const CompanyVerification: React.FC = () => {
  const company = mockCompanies[0];
  const { openModal } = useModal();
  const { showToast } = useToast();

  const [activeStepHover, setActiveStepHover] = useState<number | null>(null);

  const timelineSteps = [
    {
      step: 1,
      title: "Corporate Domain Authentication",
      subtitle: "Domain MX, DNS & Corporate Email Check",
      details: "Official corporate domain @infocepts.com verified via automated DKIM, SPF & MX record handshake.",
      date: "Verified on 12 Aug 2026",
      status: "Completed",
      icon: "solar:letter-bold",
      badgeColor: "bg-emerald-100 text-[#0B5D3B] border-emerald-300"
    },
    {
      step: 2,
      title: "Company Profile Information Audit",
      subtitle: "Corporate Entity & Leadership Verification",
      details: "Company profile details (InfoCepts Technologies, headcount, local leadership & website) verified against Nagpur Ecosystem registry.",
      date: "Verified on 13 Aug 2026",
      status: "Completed",
      icon: "solar:buildings-bold",
      badgeColor: "bg-emerald-100 text-[#0B5D3B] border-emerald-300"
    },
    {
      step: 3,
      title: "Legal GSTIN & Corporate CIN Verification",
      subtitle: "Ministry of Corporate Affairs (MCA) Sync",
      details: "GSTIN 27AAFCB1290K1Z4 & CIN U72900MH2004PTC145000 verified with Government MCA portal database.",
      date: "Verified on 15 Aug 2026",
      status: "Completed",
      icon: "solar:shield-check-bold",
      badgeColor: "bg-emerald-100 text-[#0B5D3B] border-emerald-300"
    },
    {
      step: 4,
      title: "MIDC / MIHAN SEZ Land Parcel Audit",
      subtitle: "Physical Facility & Allotment Proof Review",
      details: "Land allotment letter for MIHAN SEZ Sector 3 Plot 14 reviewed and verified by Civic Tech Scraper.",
      date: "Verified on 18 Aug 2026",
      status: "Completed",
      icon: "solar:buildings-2-bold",
      badgeColor: "bg-emerald-100 text-[#0B5D3B] border-emerald-300"
    },
    {
      step: 5,
      title: "Ecosystem Gold Profile Badge Issued",
      subtitle: "Public Directory Trust Badge Active",
      details: "Verified Gold Shield badge active on your company profile and all posted job listings.",
      date: "Active since 25 Aug 2026",
      status: "Active",
      icon: "solar:stars-minimalistic-bold",
      badgeColor: "bg-[#F28C28]/20 text-[#F28C28] border-[#F28C28]/40"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-tech font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded">
            Trust & Compliance Portal
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans mt-0.5">
            Domain & Company Profile Verification
          </h1>
          <p className="text-xs text-gray-500">
            Official domain authentication and company profile verification workflow with timeline audit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <VerificationBadge status={company.verificationStatus} />
          <button
            onClick={() => showToast("Downloading Verification Certificate (PDF)...", "info")}
            className="px-3.5 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Icon icon="solar:file-download-bold" className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
        </div>
      </div>

      {/* TRUST SCORE OVERVIEW CARD */}
      <div className="bg-gradient-to-br from-[#0B5D3B] via-[#087F5B] to-[#044D2F] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-100 uppercase tracking-wider">
                Ecosystem Gold Status
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Verified
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display">
              {company.name} Verification Audit
            </h2>
            <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
              Your company has passed all 5 stages of domain authentication, company profile audit, legal GSTIN check, and MIHAN SEZ land allotment document verification.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner font-tech font-extrabold text-2xl">
              98%
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-100 block">Trust Score Index</span>
              <span className="text-[11px] text-emerald-200 block">Level 5 Governance Badge</span>
              <span className="text-[10px] text-amber-300 font-semibold block mt-0.5">Top 2% in MIHAN SEZ</span>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFICATION TIMELINE SECTION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#1F2937] font-sans">
              Domain & Company Profile Verification Timeline
            </h3>
            <p className="text-xs text-gray-500">
              Interactive timeline tracking domain authentication, company profile audit & government legal verification.
            </p>
          </div>
          <button
            onClick={() => openModal("claim-company", company)}
            className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Icon icon="solar:document-add-bold" className="w-4 h-4" />
            <span>Re-submit Proof Documents</span>
          </button>
        </div>

        {/* TIMELINE STEPS CONTAINER */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#0B5D3B] before:via-[#087F5B] before:to-[#F28C28]">
          {timelineSteps.map((item) => {
            const isHovered = activeStepHover === item.step;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStepHover(item.step)}
                onMouseLeave={() => setActiveStepHover(null)}
                className="relative group transition-all duration-300"
              >
                {/* Timeline Dot Node */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    item.status === "Completed"
                      ? "bg-[#0B5D3B] border-white text-white shadow-md shadow-[#0B5D3B]/30 ring-4 ring-emerald-50"
                      : "bg-[#F28C28] border-white text-white shadow-md shadow-[#F28C28]/30 ring-4 ring-amber-50 animate-pulse"
                  }`}
                >
                  {item.step}
                </div>

                {/* Step Card Content */}
                <div
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isHovered
                      ? "bg-emerald-50/40 border-[#0B5D3B]/40 shadow-md translate-x-1"
                      : "bg-[#F5F8F6] border-gray-200/80 shadow-2xs"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white border border-gray-200 text-[#0B5D3B]">
                        <Icon icon={item.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1F2937] leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.status}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed mt-3 pt-2 border-t border-gray-200/60 font-sans">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
