import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { MapboxMap } from "../../components/map/MapboxMap";
import { mockCompanies } from "../../data/mockCompanies";
import { PageHeader } from "../../components/common/PageHeader";

export const EcosystemMap: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState({
    companies: true,
    logistics: true,
    academia: true,
    infrastructure: true,
  });

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <PageHeader
        title="Nagpur Multi-Layered Infrastructure Map"
        subtitle="Toggle layers for MIHAN Airport, Metro Phase 2, Samruddhi Mahamarg Cargo Nodes, and VNIT Academic Hubs."
        badge="Multi-Layer GIS"
      />

      {/* LAYER CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E9E6] shadow-sm flex flex-wrap items-center gap-3 text-xs font-semibold" data-aos="fade-up">
        <span className="text-gray-500 font-bold uppercase text-[10px]">
          Toggle Layers:
        </span>
        <label className="flex items-center gap-2 bg-[#F5F8F6] px-3 py-1.5 rounded-xl border cursor-pointer">
          <input
            type="checkbox"
            checked={activeLayers.companies}
            onChange={(e) =>
              setActiveLayers({ ...activeLayers, companies: e.target.checked })
            }
          />
          <Icon
            icon="solar:buildings-bold"
            className="w-4 h-4 text-[#0B5D3B]"
          />
          <span>Industrial Entities ({mockCompanies.length})</span>
        </label>
        <label className="flex items-center gap-2 bg-[#F5F8F6] px-3 py-1.5 rounded-xl border cursor-pointer">
          <input
            type="checkbox"
            checked={activeLayers.infrastructure}
            onChange={(e) =>
              setActiveLayers({
                ...activeLayers,
                infrastructure: e.target.checked,
              })
            }
          />
          <Icon
            icon="solar:routing-2-bold"
            className="w-4 h-4 text-[#F28C28]"
          />
          <span>Samruddhi Highway & Metro 2</span>
        </label>
        <label className="flex items-center gap-2 bg-[#F5F8F6] px-3 py-1.5 rounded-xl border cursor-pointer">
          <input
            type="checkbox"
            checked={activeLayers.academia}
            onChange={(e) =>
              setActiveLayers({ ...activeLayers, academia: e.target.checked })
            }
          />
          <Icon
            icon="solar:ruler-cross-pen-bold"
            className="w-4 h-4 text-[#FF9F43]"
          />
          <span>Academic Institutions (VNIT/IIITN)</span>
        </label>
      </div>

      <div data-aos="zoom-in">
        <MapboxMap companies={mockCompanies} height="650px" />
      </div>
    </div>
  );
};
