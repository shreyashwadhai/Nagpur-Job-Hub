import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import { Icon } from '@iconify/react';

export const SubmitUpdateModal: React.FC = () => {
  const { modalType, isOpen, closeModal } = useModal();
  const { showToast } = useToast();

  const [type, setType] = useState<'Missing Company' | 'News Article' | 'Data Correction'>('Missing Company');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    details: ''
  });

  if (modalType !== 'submit-update') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Community submission received! Sent to Nagpur Admin Moderation Queue.', 'success');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Submit Ecosystem Update"
      subtitle="Contribute missing Nagpur companies, news releases, or data updates"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F5F8F6] rounded-xl border border-gray-200">
          {(['Missing Company', 'News Article', 'Data Correction'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ${
                type === t ? 'bg-[#0B5D3B] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rutuja Deshmukh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              required
              placeholder="rutuja@vnit.ac.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Entity / Article Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Adani Logistics Depot Butibori"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description & Reference URL</label>
          <textarea
            rows={3}
            required
            placeholder="Provide context, address in MIHAN/Hingna/Butibori, or press release link..."
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Icon icon="solar:send-square-bold" className="w-4 h-4" />
          Submit for Moderation
        </button>
      </form>
    </Modal>
  );
};
