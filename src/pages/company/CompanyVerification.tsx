import React from 'react';
import { mockCompanies } from '../../data/mockCompanies';
import { VerificationBadge } from '../../components/ui/Badges';
import { useModal } from '../../context/ModalContext';
import { Icon } from '@iconify/react';

export const CompanyVerification: React.FC = () => {
  const company = mockCompanies[0];
  const { openModal } = useModal();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] font-display">Domain & Legal Verification Status</h1>
          <p className="text-xs text-gray-500 mt-1">Official trust score verification workflow.</p>
        </div>
        <VerificationBadge status={company.verificationStatus} />
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-[#1F2937] text-base">Verification Checklist</h3>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-[#0B5D3B]/10 rounded-xl border border-[#0B5D3B]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-[#0B5D3B]" />
              <span className="font-bold text-gray-800">Corporate Domain Match (@infocepts.com)</span>
            </div>
            <span className="font-bold text-[#0B5D3B]">Passed</span>
          </div>

          <div className="p-3 bg-[#0B5D3B]/10 rounded-xl border border-[#0B5D3B]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-[#0B5D3B]" />
              <span className="font-bold text-gray-800">MIHAN SEZ Land Allotment GST Certificate Audit</span>
            </div>
            <span className="font-bold text-[#0B5D3B]">Verified</span>
          </div>
        </div>

        <button
          onClick={() => openModal('claim-company', company)}
          className="mt-4 px-4 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm"
        >
          Re-submit Proof Documents
        </button>
      </div>
    </div>
  );
};
