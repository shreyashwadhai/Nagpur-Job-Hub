import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import { useToast } from '../../context/ToastContext';
import { Icon } from '@iconify/react';
import type { VerificationRequest } from '../../types';

export const VerificationRequests: React.FC = () => {
  const { verificationRequests, approveVerificationRequest, rejectVerificationRequest } = useVerification();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);

  const filteredRequests = verificationRequests.filter((req) => {
    if (activeTab === 'All') return true;
    return req.status === activeTab;
  });

  const handleApprove = (req: VerificationRequest) => {
    approveVerificationRequest(req.id);
    showToast(`Claim for "${req.companyName}" has been APPROVED! Official badge assigned.`, 'success');
  };

  const handleReject = (req: VerificationRequest) => {
    rejectVerificationRequest(req.id);
    showToast(`Claim for "${req.companyName}" has been REJECTED.`, 'error');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-tech font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded">
            Admin Governance & Moderation
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans mt-0.5">
            Claim Verification Queue
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review submitted company registration forms, legal GSTIN/CIN IDs, and MIDC allotment proof documents.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#F5F8F6] p-1 rounded-2xl border border-gray-200 self-start md:self-auto">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => {
            const count = verificationRequests.filter(r => tab === 'All' ? true : r.status === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0B5D3B] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verification Queue List */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-[#1F2937] uppercase tracking-wider flex items-center justify-between">
          <span>Verification Queue Requests ({filteredRequests.length})</span>
          <span className="text-xs font-normal text-gray-400">Click company name to review full details</span>
        </h3>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-[#F5F8F6] rounded-2xl border border-dashed border-gray-200">
            <Icon icon="solar:document-text-bold-duotone" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-600">No {activeTab.toLowerCase()} verification requests found.</p>
            <p className="text-xs text-gray-400 mt-1">Submitted claim forms will automatically display here in real-time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((v) => (
              <div
                key={v.id}
                className="p-5 rounded-2xl bg-[#F5F8F6] hover:bg-emerald-50/30 border border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Clickable Company Name */}
                    <button
                      onClick={() => setSelectedRequest(v)}
                      className="font-bold text-base text-[#0B5D3B] hover:text-[#07472d] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                      title="Click to view company full details"
                    >
                      <Icon icon="solar:buildings-bold" className="w-4 h-4 text-[#0B5D3B]" />
                      <span>{v.companyName}</span>
                      <Icon icon="solar:square-arrow-out-up-right-bold" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 text-[#0B5D3B]" />
                    </button>

                    {/* Status Pill */}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      v.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : v.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {v.status}
                    </span>

                    {v.industry && (
                      <span className="text-[10px] font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        {v.industry}
                      </span>
                    )}

                    {v.sezZone && (
                      <span className="text-[10px] font-semibold bg-emerald-100/60 text-[#0B5D3B] px-2 py-0.5 rounded">
                        {v.sezZone}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-700">Requester:</span> {v.requesterName} {v.designation ? `(${v.designation})` : ''}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Email:</span> <a href={`mailto:${v.requesterEmail}`} className="text-blue-600 hover:underline">{v.requesterEmail}</a>
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-gray-700">GSTIN / CIN:</span> <span className="font-mono text-gray-800">{v.gstCin}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
                    <span className="flex items-center gap-1 font-medium text-[#0B5D3B]">
                      <Icon icon="solar:document-bold" className="w-3.5 h-3.5 text-[#0B5D3B]" />
                      Proof Doc: {v.documentName}
                    </span>
                    <span>Submitted on {v.submittedDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200">
                  <button
                    onClick={() => setSelectedRequest(v)}
                    className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-xl border border-gray-200 shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Icon icon="solar:eye-bold" className="w-3.5 h-3.5 text-gray-600" />
                    <span>View Details</span>
                  </button>

                  {v.status !== 'Approved' && (
                    <button
                      onClick={() => handleApprove(v)}
                      className="px-3.5 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {v.status !== 'Rejected' && (
                    <button
                      onClick={() => handleReject(v)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Icon icon="solar:close-circle-bold" className="w-3.5 h-3.5 text-rose-600" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COMPANY FULL DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setSelectedRequest(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                  <Icon icon="solar:buildings-bold" className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl font-display leading-tight">
                      {selectedRequest.companyName}
                    </h3>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      selectedRequest.status === 'Approved'
                        ? 'bg-emerald-200 text-emerald-900'
                        : selectedRequest.status === 'Rejected'
                          ? 'bg-rose-200 text-rose-900'
                          : 'bg-amber-200 text-amber-900'
                    }`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Claim & Registration Submission • ID: {selectedRequest.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Company Profile Section */}
              <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                  <Icon icon="solar:buildings-2-bold" className="w-4 h-4" />
                  <span>Company Profile & Overview</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-500 block font-medium">Industry Sector:</span>
                    <span className="font-semibold text-gray-800">{selectedRequest.industry || 'IT & Industrial Services'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-medium">Nagpur SEZ / Zone:</span>
                    <span className="font-semibold text-gray-800">{selectedRequest.sezZone || 'MIHAN SEZ'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-medium">Employee Headcount:</span>
                    <span className="font-semibold text-gray-800">{selectedRequest.employeeBand || '50-200 Employees'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-medium">Official Website:</span>
                    <a
                      href={selectedRequest.website || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedRequest.website || 'N/A'}</span>
                      <Icon icon="solar:square-share-line-bold" className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {selectedRequest.businessFocus && (
                  <div>
                    <span className="text-gray-500 block font-medium">Core Business Focus:</span>
                    <p className="font-semibold text-gray-800">{selectedRequest.businessFocus}</p>
                  </div>
                )}

                {selectedRequest.overview && (
                  <div>
                    <span className="text-gray-500 block font-medium">Company Overview:</span>
                    <p className="text-gray-700 leading-relaxed font-sans mt-0.5">{selectedRequest.overview}</p>
                  </div>
                )}

                {selectedRequest.address && (
                  <div>
                    <span className="text-gray-500 block font-medium">Facility Address:</span>
                    <p className="text-gray-800">{selectedRequest.address}</p>
                  </div>
                )}
              </div>

              {/* Legal Representative & Proof Section */}
              <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                  <Icon icon="solar:shield-user-bold" className="w-4 h-4" />
                  <span>Representative & Legal Claim Verification</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-500 block font-medium">Requester Name:</span>
                    <span className="font-bold text-gray-900">{selectedRequest.requesterName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-medium">Designation:</span>
                    <span className="font-semibold text-gray-800">{selectedRequest.designation || 'Authorized Signatory'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-medium">Corporate Email:</span>
                    <a href={`mailto:${selectedRequest.requesterEmail}`} className="font-semibold text-blue-600 hover:underline">
                      {selectedRequest.requesterEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-medium">GSTIN / Corporate CIN:</span>
                    <span className="font-mono font-bold text-gray-800">{selectedRequest.gstCin}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/70 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-gray-500 block font-medium">Uploaded Proof Document:</span>
                    <span className="font-semibold text-[#0B5D3B]">{selectedRequest.documentName}</span>
                  </div>
                  <button
                    onClick={() => showToast(`Previewing ${selectedRequest.documentName}...`, 'info')}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-[#0B5D3B] font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Icon icon="solar:file-download-bold" className="w-4 h-4 text-[#0B5D3B]" />
                    <span>Download Proof</span>
                  </button>
                </div>

                {selectedRequest.notes && (
                  <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-mono text-[11px]">
                    <span className="font-bold text-gray-700 block mb-0.5">Submission Notes:</span>
                    {selectedRequest.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-white hover:bg-gray-200 text-gray-700 font-bold rounded-xl border border-gray-300 transition-all cursor-pointer"
              >
                Close Window
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleReject(selectedRequest);
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Icon icon="solar:close-circle-bold" className="w-4 h-4 text-rose-600" />
                  <span>Reject Claim</span>
                </button>

                <button
                  onClick={() => {
                    handleApprove(selectedRequest);
                    setSelectedRequest(null);
                  }}
                  className="px-5 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-white" />
                  <span>Approve Claim</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
