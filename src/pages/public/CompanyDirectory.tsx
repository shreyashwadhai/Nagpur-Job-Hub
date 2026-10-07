import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { mockCompanies } from "../../data/mockCompanies";
import { CompanyCard } from "../../components/ui/Cards";
import { MapboxMap } from "../../components/map/MapboxMap";
import { PageHeader } from "../../components/common/PageHeader";
import { useModal } from "../../context/ModalContext";
import { refreshAOS } from "../../components/common/AOSInit";

export const CompanyDirectory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { openModal } = useModal();

  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedSez, setSelectedSez] = useState(
    searchParams.get("sez") || "All",
  );
  const [selectedIndustry, setSelectedIndustry] = useState(
    searchParams.get("industry") || "All",
  );
  const [selectedVerif, setSelectedVerif] = useState(
    searchParams.get("verif") || "All",
  );

  const sezOptions = [
    "All",
    "MIHAN SEZ",
    "Hingna MIDC",
    "Butibori Industrial Area",
    "IT Park Parsodi",
    "Kalmeshwar",
    "Central Nagpur",
  ];
  const industryOptions = [
    "All",
    "IT & Data Analytics",
    "IT & Software Services",
    "Defence & Industrial Explosives",
    "Defence & Aerospace Manufacturing",
    "Manufacturing & Automotive",
    "EV & Electric Mobility",
    "Logistics & Warehousing",
    "Data Centres & Cloud Infra",
  ];

  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((comp) => {
      const matchesQuery =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesSez = selectedSez === "All" || comp.sezZone === selectedSez;
      const matchesIndustry =
        selectedIndustry === "All" || comp.industry === selectedIndustry;
      const matchesVerif =
        selectedVerif === "All" || comp.verificationStatus === selectedVerif;

      return matchesQuery && matchesSez && matchesIndustry && matchesVerif;
    });
  }, [searchQuery, selectedSez, selectedIndustry, selectedVerif]);

  useEffect(() => {
    refreshAOS(100);
  }, [filteredCompanies, viewMode]);

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <PageHeader
        title="Nagpur Company Directory"
        subtitle="Explore verified enterprise entities, tech delivery centers, heavy manufacturing, and defence plants across Nagpur."
        badge="Verified Source of Truth"
        actions={
          <button
            onClick={() => openModal("submit-update")}
            className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
            <span>Submit Missing Company</span>
          </button>
        }
      />

      {/* FILTER CONTROL BAR */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E9E6] shadow-sm mb-6 space-y-4" data-aos="fade-up">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Keyword Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Filter by company name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
            <Icon
              icon="solar:magnifer-linear"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="p-1 bg-[#F5F8F6] rounded-xl border border-gray-200 flex items-center gap-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === "list"
                    ? "bg-[#0B5D3B] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon icon="solar:list-bold" className="w-4 h-4" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === "map"
                    ? "bg-[#0B5D3B] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon icon="solar:map-bold" className="w-4 h-4" />
                <span>Map View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Industrial Zone / SEZ
            </label>
            <select
              value={selectedSez}
              onChange={(e) => setSelectedSez(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              {sezOptions.map((sez) => (
                <option key={sez} value={sez}>
                  {sez}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Industry Sector
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              {industryOptions.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Verification Status
            </label>
            <select
              value={selectedVerif}
              onChange={(e) => setSelectedVerif(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              <option value="All">All Verification Levels</option>
              <option value="verified">Verified Entity Only</option>
              <option value="estimated">Estimated Public Data</option>
              <option value="public">Public Record</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-600 font-medium">
          Showing{" "}
          <span className="font-bold text-[#1F2937]">
            {filteredCompanies.length}
          </span>{" "}
          companies matching parameters
        </p>
        {(selectedSez !== "All" ||
          selectedIndustry !== "All" ||
          selectedVerif !== "All" ||
          searchQuery) && (
          <button
            onClick={() => {
              setSelectedSez("All");
              setSelectedIndustry("All");
              setSelectedVerif("All");
              setSearchQuery("");
            }}
            className="text-xs font-bold text-[#F28C28] hover:underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* CONTENT: LIST OR MAP */}
      {viewMode === "list" ? (
        filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((c, idx) => (
              <CompanyCard key={c.id} company={c} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-[#E5E9E6] space-y-3" data-aos="fade-up">
            <Icon
              icon="solar:magnifer-bug-bold-duotone"
              className="w-12 h-12 text-[#F28C28] mx-auto"
            />
            <h3 className="font-bold text-lg text-gray-800">
              No Companies Found
            </h3>
            <p className="text-xs text-gray-500">
              Try loosening your search query or industrial zone filter.
            </p>
          </div>
        )
      ) : (
        <div className="space-y-4">
          <div data-aos="fade-up">
            <MapboxMap companies={filteredCompanies} height="600px" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredCompanies.map((c, idx) => (
              <CompanyCard key={c.id} company={c} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
