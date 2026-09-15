import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import type { Company } from '../../types';
import { Icon } from '@iconify/react';

export const ClaimCompanyModal: React.FC = () => {
  const { modalType, modalData, isOpen, closeModal } = useModal();
  const { showToast } = useToast();
  const company = modalData as Company;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    gstCin: '',
    docName: ''
  });

  if (modalType !== 'claim-company' || !company) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Claim verification request submitted for ${company.name}! Admin review in 24-48 hours.`, 'success');
    closeModal();
    setStep(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={`Claim Official Profile: ${company.name}`}
      subtitle="Corporate Email & Domain Verification Workflow"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-semibold pb-3 border-b border-gray-100">
          <span className={step >= 1 ? 'text-[#0B5D3B]' : 'text-gray-400'}>1. Representative Info</span>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-gray-300" />
          <span className={step >= 2 ? 'text-[#0B5D3B]' : 'text-gray-400'}>2. GST / CIN Proof</span>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-gray-300" />
          <span className={step >= 3 ? 'text-[#0B5D3B]' : 'text-gray-400'}>3. Admin Review</span>
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Shashank Garg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Work Email</label>
              <input
                type="email"
                required
                placeholder={`must match @${company.website.replace('https://www.', '').replace('https://', '')}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                required
                placeholder="e.g. HR Director / Operations VP"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-[#087F5B] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Continue to Step 2
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">GSTIN / Corporate CIN</label>
              <input
                type="text"
                required
                placeholder="27AAFCB1290K1Z4 / U72900MH2004PTC145000"
                value={formData.gstCin}
                onChange={(e) => setFormData({ ...formData, gstCin: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Upload Proof Document (PDF/PNG)</label>
              <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center bg-[#F5F8F6]">
                <Icon icon="solar:document-add-bold-duotone" className="w-8 h-8 text-[#F28C28] mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-semibold">Click to upload MIDC land allotment letter or GST certificate</p>
                <span className="text-[10px] text-gray-400">Max size: 10MB</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Submit Claim Verification
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
