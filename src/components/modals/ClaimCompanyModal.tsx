import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import { useVerification } from '../../context/VerificationContext';
import type { Company } from '../../types';
import { Icon } from '@iconify/react';

export const ClaimCompanyModal: React.FC = () => {
  const { modalType, modalData, isOpen, closeModal } = useModal();
  const { showToast } = useToast();
  const { addVerificationRequest } = useVerification();
  const company = modalData as Company | undefined;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'IT & Software Services',
    sezZone: 'MIHAN SEZ' as const,
    website: '',
    employeeBand: '50-200',
    businessFocus: '',
    overview: '',
    requesterName: '',
    requesterEmail: '',
    designation: '',
    gstCin: '',
    documentName: 'MIDC_Allotment_GST_Certificate.pdf'
  });

  useEffect(() => {
    if (company) {
      setFormData((prev) => ({
        ...prev,
        companyName: company.name || '',
        industry: company.industry || 'IT & Software Services',
        sezZone: company.sezZone || 'MIHAN SEZ',
        website: company.website || '',
        employeeBand: company.employeeBand || '50-200',
        businessFocus: company.businessFocus || '',
        overview: company.overview || '',
        requesterEmail: company.contactEmail || ''
      }));
    } else {
      setFormData({
        companyName: '',
        industry: 'IT & Software Services',
        sezZone: 'MIHAN SEZ',
        website: '',
        employeeBand: '50-200',
        businessFocus: '',
        overview: '',
        requesterName: '',
        requesterEmail: '',
        designation: '',
        gstCin: '',
        documentName: 'MIDC_Allotment_GST_Certificate.pdf'
      });
    }
  }, [company, isOpen]);

  if (modalType !== 'claim-company') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      showToast('Please enter your Company Name.', 'error');
      return;
    }
    if (!formData.requesterName.trim() || !formData.requesterEmail.trim()) {
      showToast('Please enter your Full Name and Corporate Email.', 'error');
      return;
    }

    const companyId = company?.id || formData.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    addVerificationRequest({
      companyId,
      companyName: formData.companyName.trim(),
      requesterName: formData.requesterName.trim(),
      requesterEmail: formData.requesterEmail.trim(),
      designation: formData.designation.trim() || 'Authorized Representative',
      gstCin: formData.gstCin.trim() || '27AAFCB1290K1Z4 / U72900MH2024PTC100000',
      documentName: formData.documentName.trim() || 'Company_Registration_Document.pdf',
      notes: `Claim & registration form submitted for ${formData.companyName}. Pending Review.`,
      industry: formData.industry,
      sezZone: formData.sezZone,
      website: formData.website || `https://${companyId}.com`,
      employeeBand: formData.employeeBand,
      businessFocus: formData.businessFocus || 'Industrial & Technological Services',
      overview: formData.overview || `${formData.companyName} operates in ${formData.sezZone}, Nagpur.`
    });

    showToast(`Claim registration form submitted for "${formData.companyName}"! Added to Admin Verification Queue.`, 'success');
    closeModal();
    setStep(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={company ? `Claim Profile: ${company.name}` : 'Register & Claim Company Profile'}
      subtitle="Fill in company details to submit for Nagpur Portal Admin Verification"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-semibold pb-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 font-bold transition-colors ${
              step >= 1 ? 'text-[#0B5D3B]' : 'text-gray-400'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 1 ? 'bg-[#0B5D3B] text-white' : 'bg-gray-100 text-gray-600'
            }`}>1</span>
            <span>Company Profile Details</span>
          </button>
          <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-gray-300" />
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 font-bold transition-colors ${
              step >= 2 ? 'text-[#0B5D3B]' : 'text-gray-400'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 2 ? 'bg-[#0B5D3B] text-white' : 'bg-gray-100 text-gray-600'
            }`}>2</span>
            <span>Legal Proof & Verification</span>
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hexagon Tech Solutions"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Industry Sector</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                >
                  <option value="IT & Software Services">IT & Software Services</option>
                  <option value="Defense & Aerospace">Defense & Aerospace</option>
                  <option value="AgriTech & Bio-Processing">AgriTech & Bio-Processing</option>
                  <option value="EV & Automotive">EV & Automotive</option>
                  <option value="Manufacturing & Heavy Industry">Manufacturing & Heavy Industry</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                  <option value="Textiles & Apparel">Textiles & Apparel</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Industrial Zone / SEZ</label>
                <select
                  value={formData.sezZone}
                  onChange={(e) => setFormData({ ...formData, sezZone: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                >
                  <option value="MIHAN SEZ">MIHAN SEZ</option>
                  <option value="Hingna MIDC">Hingna MIDC</option>
                  <option value="Butibori Industrial Area">Butibori Industrial Area</option>
                  <option value="IT Park Parsodi">IT Park Parsodi</option>
                  <option value="Kalmeshwar">Kalmeshwar MIDC</option>
                  <option value="Central Nagpur">Central Nagpur</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Official Website</label>
                <input
                  type="text"
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Employee Headcount</label>
                <select
                  value={formData.employeeBand}
                  onChange={(e) => setFormData({ ...formData, employeeBand: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                >
                  <option value="1-50">1 - 50 Employees</option>
                  <option value="50-200">50 - 200 Employees</option>
                  <option value="200-500">200 - 500 Employees</option>
                  <option value="500-2000">500 - 2,000 Employees</option>
                  <option value="2000+">2,000+ Employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Core Business Focus</label>
              <input
                type="text"
                placeholder="e.g. Cloud Infrastructure, EV Lithium Battery Assembly, Precision Aerospace Tools"
                value={formData.businessFocus}
                onChange={(e) => setFormData({ ...formData, businessFocus: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company Overview</label>
              <textarea
                rows={3}
                placeholder="Describe your company's operations, facility in Nagpur, and product/service details..."
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!formData.companyName.trim()) {
                  showToast('Please enter Company Name first.', 'error');
                  return;
                }
                setStep(2);
              }}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>Continue to Legal Verification (Step 2)</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Representative Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.requesterName}
                  onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh@company.com"
                  value={formData.requesterEmail}
                  onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Designation</label>
                <input
                  type="text"
                  placeholder="e.g. HR Director / General Manager / VP Operations"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">GSTIN / Corporate CIN *</label>
                <input
                  type="text"
                  required
                  placeholder="27AAFCB1290K1Z4 / U72900MH2024PTC100000"
                  value={formData.gstCin}
                  onChange={(e) => setFormData({ ...formData, gstCin: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Proof Document (MIDC Allotment / GST Certificate)</label>
              <div className="border-2 border-dashed border-[#0B5D3B]/30 bg-[#F5F8F6] p-4 rounded-xl text-center hover:bg-emerald-50/50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, documentName: file.name });
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Icon icon="solar:document-add-bold-duotone" className="w-8 h-8 text-[#0B5D3B] mx-auto mb-1" />
                <p className="text-xs text-gray-700 font-semibold">
                  {formData.documentName ? `Selected Document: ${formData.documentName}` : 'Click to select MIDC Allotment Letter, GST Certificate or FSSAI License'}
                </p>
                <span className="text-[10px] text-gray-400">PDF, PNG, JPG up to 10MB</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Back to Details
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icon icon="solar:shield-check-bold" className="w-4 h-4 text-white" />
                <span>Submit Company Registration Form</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
