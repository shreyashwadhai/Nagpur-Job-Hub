import React, { useState, useEffect } from "react";
import { mockCompanies } from "../../data/mockCompanies";
import { MapboxMap } from "../../components/map/MapboxMap";
import { PageHeader } from "../../components/common/PageHeader";
import { CompanyCard } from "../../components/ui/Cards";
import type { Company } from "../../types";
import { refreshAOS } from "../../components/common/AOSInit";

export const CompanyMap: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<Company | undefined>(
    undefined,
  );
  const [sezFilter, setSezFilter] = useState("All");

  const filtered =
    sezFilter === "All"
      ? mockCompanies
      : mockCompanies.filter((c) => c.sezZone === sezFilter);

  useEffect(() => {
    refreshAOS(50);
  }, [sezFilter]);

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <PageHeader
        title="Nagpur Interactive Ecosystem Map"
        subtitle="Geographic source of truth for MIHAN SEZ, Hingna MIDC, Butibori Industrial Area, Parsodi IT Park, and Kalmeshwar nodes."
        badge="Geographic Intelligence"
      />

      <div className="flex items-center gap-2 overflow-x-auto pb-2" data-aos="fade-up">
        <span className="text-xs font-semibold text-gray-500 flex-shrink-0">
          Filter SEZ Zone:
        </span>
        {[
          "All",
          "MIHAN SEZ",
          "Hingna MIDC",
          "Butibori Industrial Area",
          "IT Park Parsodi",
          "Kalmeshwar",
        ].map((zone) => (
          <button
            key={zone}
            onClick={() => setSezFilter(zone)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              sezFilter === zone
                ? "bg-[#0B5D3B] text-white"
                : "bg-white border border-gray-200 text-gray-700"
            }`}
          >
            {zone}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-aos="fade-up">
        <div className="lg:col-span-8">
          <MapboxMap
            companies={filtered}
            selectedCompanyId={selectedComp?.id}
            onSelectCompany={(c) => setSelectedComp(c)}
            height="650px"
          />
        </div>
        <div className="lg:col-span-4 space-y-4 max-h-[650px] overflow-y-auto pr-1">
          <h3 className="font-bold text-sm text-[#1F2937]">
            Visible Pins ({filtered.length})
          </h3>
          {filtered.map((c, idx) => (
            <div
              key={c.id}
              onClick={() => setSelectedComp(c)}
              className={`cursor-pointer transition-all ${selectedComp?.id === c.id ? "ring-2 ring-[#F28C28] rounded-2xl" : ""}`}
            >
              <CompanyCard company={c} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
