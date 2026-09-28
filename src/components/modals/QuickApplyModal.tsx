import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import { mockJobs } from '../../data/mockJobs';
import { JobCard } from '../ui/Cards';
import type { Job } from '../../types';

export const QuickApplyModal: React.FC = () => {
  const { modalType, isOpen, closeModal } = useModal();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2>(1);
  const [roleQuery, setRoleQuery] = useState('');
  const [selectedSez, setSelectedSez] = useState('All');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (modalType !== 'quick-apply') return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSearchAndMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleQuery.trim()) {
      showToast('Please enter a target job role or skill.', 'error');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const q = roleQuery.toLowerCase();
      let matched = mockJobs.filter((job) => {
        const matchesRole =
          job.title.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q)) ||
          job.description.toLowerCase().includes(q);
        const matchesSez = selectedSez === 'All' || job.sezZone === selectedSez;
        return matchesRole && matchesSez;
      });

      // Fallback fallback matched jobs if none match specifically
      if (matched.length === 0) {
        matched = mockJobs.slice(0, 3);
      }

      setMatchedJobs(matched);
      setIsAnalyzing(false);
      setStep(2);
    }, 700);
  };

  // const handleApplyToJob = (jobTitle: string, companyName: string) => {
  //   showToast(`Quick Application submitted for "${jobTitle}" at ${companyName}!`, 'success');
  // };

  const handleReset = () => {
    setStep(1);
    setRoleQuery('');
    setSelectedFile(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Quick Apply - AI Job Role Matching"
      subtitle="Upload your CV and enter your desired role to get instant Nagpur job matches."
      size="xl"
    >
      {step === 1 ? (
        <form onSubmit={handleSearchAndMatch} className="space-y-5">
          {/* Role Search Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Target Job Role or Primary Skill <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. React Developer, Data Engineer, Mechanical Design, Quality Analyst"
                value={roleQuery}
                onChange={(e) => setRoleQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F5F8F6] border-2 border-[#E5E9E6] focus:border-[#F28C28] rounded-2xl text-sm focus:outline-none focus:bg-white transition-all text-[#1F2937]"
                required
              />
              <Icon
                icon="solar:magnifer-linear"
                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Location / SEZ Preference */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Preferred Industrial Zone / SEZ
            </label>
            <select
              value={selectedSez}
              onChange={(e) => setSelectedSez(e.target.value)}
              className="w-full px-4 py-3 bg-[#F5F8F6] border-2 border-[#E5E9E6] focus:border-[#F28C28] rounded-2xl text-sm focus:outline-none focus:bg-white transition-all text-[#1F2937]"
            >
              <option value="All">All Nagpur Industrial Zones</option>
              <option value="MIHAN SEZ">MIHAN SEZ</option>
              <option value="IT Park Parsodi">IT Park Parsodi</option>
              <option value="Hingna MIDC">Hingna MIDC</option>
              <option value="Butibori Industrial Area">Butibori Industrial Area</option>
            </select>
          </div>

          {/* CV Upload Dropzone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Upload CV / Resume <span className="text-gray-400 font-normal">(PDF, DOC, DOCX - Max 5MB)</span>
            </label>
            <div className="border-2 border-dashed border-[#F28C28]/40 hover:border-[#F28C28] bg-[#F5F8F6] hover:bg-white rounded-2xl p-6 text-center transition-all cursor-pointer relative group">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-[#F28C28]/10 text-[#F28C28] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon="solar:document-add-bold-duotone" className="w-6 h-6" />
                </div>
                {selectedFile ? (
                  <div>
                    <p className="font-bold text-sm text-[#0B5D3B]">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB uploaded</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-sm text-[#1F2937]">Drag & Drop your resume or Click to Browse</p>
                    <p className="text-xs text-gray-500">Attach your CV for automated skill parsing & 1-click matching</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                  <span>Parsing CV & Matching...</span>
                </>
              ) : (
                <>
                  <Icon icon="solar:stars-minimalistic-bold" className="w-4 h-4" />
                  <span>Find Matched Jobs</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#0B5D3B]/10 p-4 rounded-2xl border border-[#0B5D3B]/20">
            <div>
              <p className="text-xs font-bold text-[#0B5D3B] uppercase">Matched Opportunities Found</p>
              <p className="text-sm font-semibold text-[#1F2937]">
                Showing {matchedJobs.length} active roles for &quot;{roleQuery}&quot; in Nagpur
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-white text-xs font-bold text-gray-700 hover:text-[#0B5D3B] border border-gray-200 rounded-xl transition-colors"
            >
              Change Role / CV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
            {matchedJobs.map((job) => (
              <div key={job.id} className="relative">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};
