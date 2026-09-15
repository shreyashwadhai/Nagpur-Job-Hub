import React from 'react';
import { mockCompanies } from '../../data/mockCompanies';
import { mockVerificationRequests, mockAuditLogs } from '../../data/mockAdminData';
import { KPICard } from '../../components/ui/Cards';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const pendingVerifications = mockVerificationRequests.filter((v) => v.status === 'Pending');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-tech font-bold uppercase text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-0.5 rounded">
            System Administration
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-display mt-0.5">Nagpur Ecosystem Governance</h1>
        </div>
        <button
          onClick={() => showToast('System Cache & Scraper Sync Cleared', 'success')}
          className="px-4 py-2 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl shadow-sm"
        >
          Force API Scraper Sync
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KPICard title="Total Entities" value={mockCompanies.length} icon="solar:buildings-bold-duotone" />
        <KPICard title="Pending Verifications" value={pendingVerifications.length} icon="solar:clock-circle-bold-duotone" />
        <KPICard title="Active Job Feeds" value="3,690" icon="solar:case-round-bold-duotone" />
        <KPICard title="Scraper Health" value="100%" icon="solar:server-bold-duotone" />
      </div>

      {/* Pending Verifications */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937] font-display">Pending Claim Verification Requests</h3>
        <div className="space-y-3">
          {mockVerificationRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-[#1F2937]">{req.companyName}</h4>
                <p className="text-xs text-gray-500">Requester: {req.requesterName} ({req.requesterEmail})</p>
                <span className="text-[10px] text-gray-400">Submitted {req.submittedDate} • GST/CIN: {req.gstCin}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Claim for ${req.companyName} Approved! Badge assigned.`, 'success')}
                  className="px-3 py-1.5 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => showToast(`Claim for ${req.companyName} Rejected.`, 'error')}
                  className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-xl"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audit Trail */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937] font-display">Recent System Audit Stream</h3>
        <div className="space-y-2 text-xs">
          {mockAuditLogs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1F2937]">{log.action}</span>
                <span className="text-gray-500 ml-2">{log.target}</span>
              </div>
              <span className="text-gray-400 font-tech">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
