import React, { useState } from 'react';
import { mockCompanies } from '../../data/mockCompanies';
import { useToast } from '../../context/ToastContext';
import { Icon } from '@iconify/react';

export const CompanyProfileEdit: React.FC = () => {
  const company = mockCompanies[0];
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: company.name,
    overview: company.overview,
    businessFocus: company.businessFocus,
    website: company.website,
    contactEmail: company.contactEmail,
    phone: company.phone
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Company profile details saved successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-display">Edit Nagpur Corporate Profile</h1>
        <p className="text-xs text-gray-500 mt-1">Update operational information displayed in the public directory.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Company Entity Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Overview</label>
          <textarea
            rows={4}
            required
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Website URL</label>
            <input
              type="text"
              required
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
        </div>

        <button type="submit" className="px-5 py-2.5 bg-[#0B5D3B] hover:bg-[#087F5B] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5">
          <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
