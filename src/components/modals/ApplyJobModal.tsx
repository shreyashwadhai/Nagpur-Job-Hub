import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import type { Job } from '../../types';
import { Icon } from '@iconify/react';

export const ApplyJobModal: React.FC = () => {
  const { modalType, modalData, isOpen, closeModal } = useModal();
  const { applyJob, user } = useAuth();
  const { showToast } = useToast();
  const job = modalData as Job;

  const [formData, setFormData] = useState({
    fullName: user.name || '',
    email: user.email || '',
    phone: '+91 98230 11223',
    experienceYears: '3.5',
    noticePeriod: '15 Days',
    coverNote: 'Excited to contribute to Nagpur industrial growth!'
  });

  if (modalType !== 'apply-job' || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyJob(job.id);
    showToast(`Application successfully submitted for ${job.title} at ${job.companyName}!`, 'success');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={`Apply for ${job.title}`}
      subtitle={`Direct Application to ${job.companyName} (${job.sezZone})`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="bg-[#F5F8F6] p-3 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#1F2937] block">{job.companyName}</span>
            <span className="text-gray-500">{job.salaryRange} • {job.experience}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B] font-bold">
            {job.workMode}
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Mobile</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Total Experience (Years)</label>
            <input
              type="text"
              required
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Notice Period</label>
            <input
              type="text"
              required
              value={formData.noticePeriod}
              onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Resume / CV Attachment</label>
          <div className="border border-dashed border-gray-300 p-3 rounded-xl text-center bg-[#F5F8F6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="solar:document-text-bold" className="w-5 h-5 text-[#0B5D3B]" />
              <span className="text-xs font-semibold text-gray-800">Aarav_Deshmukh_Resume_2026.pdf</span>
            </div>
            <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">Attached</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Submit Application
          </button>
        </div>
      </form>
    </Modal>
  );
};
