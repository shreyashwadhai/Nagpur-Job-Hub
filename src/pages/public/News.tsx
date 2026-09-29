import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { mockNews } from "../../data/mockNews";
import { NewsCard } from "../../components/ui/Cards";
import { PageHeader } from "../../components/common/PageHeader";
import { useModal } from "../../context/ModalContext";

export const News: React.FC = () => {
  const { openModal } = useModal();
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const themes = [
    "All",
    "Growth",
    "Talent",
    "Infrastructure",
    "Policy",
    "Investment",
    "CSR",
  ];

  const filteredNews = useMemo(() => {
    return mockNews.filter((n) => {
      const matchesQuery =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.aiSummary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTheme = selectedTheme === "All" || n.theme === selectedTheme;
      return matchesQuery && matchesTheme;
    });
  }, [searchQuery, selectedTheme]);

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <PageHeader
        title="Nagpur Industrial News & Intelligence"
        subtitle="AI-summarized news coverage, infrastructure policies, MIDC land allotments, and Vidarbha economic growth."
        badge="Enterprise Intelligence Feed"
        actions={
          <button
            onClick={() => openModal("submit-update")}
            className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Icon icon="solar:document-add-bold" className="w-4 h-4" />
            <span>Submit News Release</span>
          </button>
        }
      />

      {/* FILTER BAR */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5E9E6] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search news title, AI summaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
            <Icon
              icon="solar:magnifer-linear"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Theme Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTheme === theme
                    ? "bg-[#0B5D3B] text-white shadow-sm"
                    : "bg-[#F5F8F6] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>
    </div>
  );
};
