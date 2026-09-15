import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import { Icon } from '@iconify/react';

export const ExportModal: React.FC = () => {
  const { modalType, isOpen, closeModal } = useModal();
  const { showToast } = useToast();
  const [format, setFormat] = useState<'csv' | 'pdf'>('pdf');
  const [range, setRange] = useState('2025-2026');

  if (modalType !== 'export-insights') return null;

  const handleExport = () => {
    showToast(`Nagpur Intelligence Report exported as ${format.toUpperCase()} (${range})!`, 'success');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Export Executive Intelligence Report"
      subtitle="Download aggregated Nagpur industrial telemetry data"
      size="sm"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Export Format</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFormat('pdf')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                format === 'pdf'
                  ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                  : 'bg-[#F5F8F6] text-gray-700 border-gray-200'
              }`}
            >
              <Icon icon="solar:file-corrupt-bold" className="w-4 h-4" />
              <span>PDF Executive Summary</span>
            </button>
            <button
              onClick={() => setFormat('csv')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                format === 'csv'
                  ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                  : 'bg-[#F5F8F6] text-gray-700 border-gray-200'
              }`}
            >
              <Icon icon="solar:document-text-bold" className="w-4 h-4" />
              <span>CSV Raw Telemetry</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Time Horizon</label>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
          >
            <option value="2025-2026">Current Year (2025 - 2026)</option>
            <option value="2020-2026">5-Year Growth Trajectory (2020 - 2026)</option>
            <option value="MIHAN-Only">MIHAN SEZ Specific Telemetry</option>
          </select>
        </div>

        <button
          onClick={handleExport}
          className="w-full py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Icon icon="solar:download-square-bold" className="w-4 h-4" />
          <span>Generate & Download File</span>
        </button>
      </div>
    </Modal>
  );
};
