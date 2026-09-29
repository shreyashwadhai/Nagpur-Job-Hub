import React from "react";
import { Icon } from "@iconify/react";
import { PageHeader } from "../../components/common/PageHeader";
import { useModal } from "../../context/ModalContext";

export const About: React.FC = () => {
  const { openModal } = useModal();

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">
      <PageHeader
        title="About Nagpur Industrial Ecosystem"
        subtitle="Digital source of truth uniting Nagpur’s industrial zones, technology hubs, academic research, and career growth."
        badge="Civic-Tech Initiative"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-3xl font-extrabold text-[#1F2937] font-sans">
            Empowering Vidarbha’s Industrial Transformation
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-sans">
            Nagpur, positioned at India’s geographical center (Zero Mile), is
            undergoing a rapid industrial renaissance. From the 4,300-hectare
            MIHAN SEZ to heavy manufacturing MIDCs in Butibori and Hingna, the
            city is emerging as Central India’s primary logistics, tech
            delivery, and defence hub.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-sans">
            This platform acts as an open, trustworthy civic intelligence layer
            — standardizing company data, tracking job opportunities, mapping
            skill gaps with VNIT and IIIT Nagpur, and facilitating domain
            verification.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openModal("claim-company")}
              className="px-5 py-3 rounded-2xl bg-[#0B5D3B] hover:bg-[#087F5B] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Icon icon="solar:shield-check-bold" className="w-4 h-4" />
              <span>Claim Enterprise Entity</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B5D3B] to-[#087F5B] text-white p-8 rounded-3xl shadow-xl space-y-4">
          <Icon icon="solar:city-bold" className="w-12 h-12 text-[#FF9F43]" />
          <h3 className="font-bold text-xl font-sans">
            Governance & Telemetry Standards
          </h3>
          <ul className="space-y-2 text-xs text-gray-200">
            <li className="flex items-start gap-2">
              <Icon
                icon="solar:check-circle-bold"
                className="w-4 h-4 text-[#FF9F43] mt-0.5"
              />
              <span>Domain Email Verification & GST/CIN Document Audit</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="solar:check-circle-bold"
                className="w-4 h-4 text-[#FF9F43] mt-0.5"
              />
              <span>Scraped Job Deduplication Engine</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="solar:check-circle-bold"
                className="w-4 h-4 text-[#FF9F43] mt-0.5"
              />
              <span>Open Data Standard Compliance</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
