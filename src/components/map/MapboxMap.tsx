import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from '@iconify/react';
import type { Company } from '../../types';
import { VerificationBadge } from '../ui/Badges';
import { Link } from 'react-router-dom';

interface MapboxMapProps {
  companies: Company[];
  selectedCompanyId?: string;
  onSelectCompany?: (company: Company) => void;
  height?: string;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({
  companies,
  selectedCompanyId,
  onSelectCompany,
  height = '500px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const markersLayerGroup = useRef<L.LayerGroup | null>(null);
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);

  // Default Center: Nagpur MIHAN & Industrial Center (21.08, 79.03)
  const NAGPUR_CENTER: [number, number] = [21.08, 79.03];

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletInstance.current) {
      // Initialize Leaflet Map with Mapbox styled tiles
      const map = L.map(mapRef.current, {
        center: NAGPUR_CENTER,
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Mapbox Carto Light Tile Layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Add Zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      leafletInstance.current = map;
      markersLayerGroup.current = L.layerGroup().addTo(map);
    }

    const map = leafletInstance.current;
    const markersGroup = markersLayerGroup.current;
    if (!map || !markersGroup) return;

    // Clear old markers
    markersGroup.clearLayers();

    // Custom Icon Generator with visible location pin name
    const createCustomIcon = (name: string, isVerified: boolean, isSelected: boolean) => {
      const color = isSelected ? '#F28C28' : isVerified ? '#0B5D3B' : '#6B7280';
      const html = `
        <div style="display: flex; flex-direction: column; align-items: center; pointer-events: auto; cursor: pointer; transform: translate(-50%, -100%);">
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
            ${name}
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
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            transition: transform 0.2s ease;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      `;
      return L.divIcon({
        html,
        className: 'custom-map-pin',
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
    };

    // Render company markers
    companies.forEach((comp) => {
      const isSelected = comp.id === selectedCompanyId;
      const icon = createCustomIcon(comp.name, comp.verified, isSelected);

      const marker = L.marker([comp.coordinates.lat, comp.coordinates.lng], { icon });
      marker.on('click', () => {
        setActiveCompany(comp);
        if (onSelectCompany) onSelectCompany(comp);
        map.flyTo([comp.coordinates.lat, comp.coordinates.lng], 13, { duration: 1 });
      });

      markersGroup.addLayer(marker);
    });
  }, [companies, selectedCompanyId, onSelectCompany]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#E5E9E6] shadow-soft bg-gray-100">
      {/* Map Canvas */}
      <div ref={mapRef} style={{ height }} className="w-full z-10" />

      {/* Map Control Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E9E6] shadow-sm text-xs font-semibold text-[#1F2937]">
        <Icon icon="solar:map-point-wave-bold" className="w-4 h-4 text-[#F28C28]" />
        <span>Nagpur Industrial Nodes: {companies.length} Active Pins</span>
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
                <h4 className="font-bold text-sm text-[#1F2937] leading-tight">{activeCompany.name}</h4>
                <p className="text-[11px] text-[#0B5D3B] font-semibold">{activeCompany.sezZone}</p>
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
              <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
