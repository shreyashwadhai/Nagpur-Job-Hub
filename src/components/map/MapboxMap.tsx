import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Icon } from "@iconify/react";
import type { Company } from "../../types";
import { VerificationBadge } from "../ui/Badges";
import { Link } from "react-router-dom";

interface MapboxMapProps {
  companies: Company[];
  selectedCompanyId?: string;
  onSelectCompany?: (company: Company) => void;
  height?: string;
}

type MapboxStyle = "streets-v12" | "light-v11" | "satellite-streets-v12";

export const MapboxMap: React.FC<MapboxMapProps> = ({
  companies,
  selectedCompanyId,
  onSelectCompany,
  height = "500px",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);
  const [currentStyle, setCurrentStyle] = useState<MapboxStyle>("streets-v12");

  const mapboxToken = import.meta.env.VITE_MAPBOX || "";

  // Default Center: Nagpur MIHAN & Industrial Center [Longitude, Latitude]
  const NAGPUR_CENTER: [number, number] = [79.03, 21.08];

  // Initialize Native Mapbox GL JS Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${currentStyle}`,
      center: NAGPUR_CENTER,
      zoom: 11,
      attributionControl: false,
    });

    // Navigation control (Zoom in/out)
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update map style when style toggle is clicked
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setStyle(`mapbox://styles/mapbox/${currentStyle}`);
    }
  }, [currentStyle]);

  // Update Mapbox Markers
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Remove previous markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    companies.forEach((comp) => {
      const isSelected = comp.id === selectedCompanyId;
      const color = isSelected
        ? "#F28C28"
        : comp.verified
          ? "#0B5D3B"
          : "#6B7280";

      // Create Custom HTML Pin Element for Mapbox GL JS
      const el = document.createElement("div");
      el.className = "custom-mapbox-pin";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.alignItems = "center";

      el.innerHTML = `
        <div style="
          background: rgba(255, 255, 255, 0.95);
          color: #1F2937;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.22);
          border: 1.5px solid ${color};
          margin-bottom: 2px;
          white-space: nowrap;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          ${comp.name}
        </div>
        <div style="
          width: 32px;
          height: 32px;
          background: ${color};
          border: 2.5px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
          transition: transform 0.2s ease;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `;

      el.addEventListener("click", () => {
        setActiveCompany(comp);
        if (onSelectCompany) onSelectCompany(comp);
        map.flyTo({
          center: [comp.coordinates.lng, comp.coordinates.lat],
          zoom: 13,
          duration: 1000,
        });
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([comp.coordinates.lng, comp.coordinates.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [companies, selectedCompanyId, onSelectCompany]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#E5E9E6] shadow-soft bg-gray-100">
      {/* Native Mapbox GL Container */}
      <div ref={mapContainerRef} style={{ height }} className="w-full z-10" />

      {/* Map Overlay Badge & Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E9E6] shadow-md text-xs font-semibold text-[#1F2937]">
          <Icon
            icon="solar:map-point-wave-bold"
            className="w-4 h-4 text-[#F28C28]"
          />
          <span>Nagpur Industrial Nodes: {companies.length} Pins</span>
          {/* <span className="px-1.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase bg-[#0B5D3B]/10 text-[#0B5D3B] border border-[#0B5D3B]/20 flex items-center gap-1">
            <Icon icon="solar:verified-check-bold" className="w-3 h-3 text-[#0B5D3B]" />
            Mapbox GL JS
          </span> */}
        </div>

        {/* Mapbox Style Switcher */}
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-[#E5E9E6] shadow-md text-[11px]">
          <button
            onClick={() => setCurrentStyle("streets-v12")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              currentStyle === "streets-v12"
                ? "bg-[#0B5D3B] text-white shadow-sm font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Streets
          </button>
          <button
            onClick={() => setCurrentStyle("light-v11")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              currentStyle === "light-v11"
                ? "bg-[#0B5D3B] text-white shadow-sm font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setCurrentStyle("satellite-streets-v12")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              currentStyle === "satellite-streets-v12"
                ? "bg-[#0B5D3B] text-white shadow-sm font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Selected Company Popup Drawer */}
      {activeCompany && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E5E9E6] p-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <img
                src={activeCompany.logo}
                alt={activeCompany.name}
                className="w-10 h-10 rounded-xl object-cover border border-gray-100"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1F2937] leading-tight">
                  {activeCompany.name}
                </h4>
                <p className="text-[11px] text-[#0B5D3B] font-semibold">
                  {activeCompany.sezZone}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveCompany(null)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
            {activeCompany.overview}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <VerificationBadge status={activeCompany.verificationStatus} />
            <Link
              to={`/companies/${activeCompany.id}`}
              className="px-3 py-1.5 rounded-xl bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <span>View Entity</span>
              <Icon
                icon="solar:alt-arrow-right-linear"
                className="w-3.5 h-3.5"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
