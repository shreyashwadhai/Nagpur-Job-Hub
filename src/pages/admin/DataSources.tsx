import React from 'react';
import { mockDataSources } from '../../data/mockAdminData';
import { useToast } from '../../context/ToastContext';

export const DataSources: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-display">Data Sources & API Scrapers</h1>
        <p className="text-xs text-gray-500 mt-1">Monitor government APIs, MIDC directory web scrapers, and RSS feeds.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-3">
        {mockDataSources.map((ds) => (
          <div key={ds.id} className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-[#1F2937]">{ds.name}</h4>
              <p className="text-xs text-gray-500">Type: {ds.type} • Update Frequency: {ds.updateFreq} • Last Sync: {ds.lastSync}</p>
            </div>
            <button
              onClick={() => showToast(`Sync triggered for ${ds.name}`, 'success')}
              className="px-3.5 py-1.5 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl"
            >
              Trigger Sync
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
