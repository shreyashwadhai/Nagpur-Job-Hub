import React, { useState } from "react";
import { mockCompanies } from "../../data/mockCompanies";
import { mockAuditLogs } from "../../data/mockAdminData";
import { KPICard } from "../../components/ui/Cards";
import { useToast } from "../../context/ToastContext";
import { useVerification } from "../../context/VerificationContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { VerificationRequest } from "../../types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const {
    verificationRequests,
    approveVerificationRequest,
    rejectVerificationRequest,
  } = useVerification();

  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);

  const pendingVerifications = verificationRequests.filter(
    (v) => v.status === "Pending",
  );

  const handleApprove = (req: VerificationRequest) => {
    approveVerificationRequest(req.id);
    showToast(
      `Claim for "${req.companyName}" Approved! Official badge assigned.`,
      "success",
    );
  };

  const handleReject = (req: VerificationRequest) => {
    rejectVerificationRequest(req.id);
    showToast(`Claim for "${req.companyName}" Rejected.`, "error");
  };

  // Chart Data: Registered Users & Entities Breakdown (Jobseekers, Companies, Institutes)
  const registeredPieData = {
    labels: ["Jobseekers", "Companies", "Institutes"],
    datasets: [
      {
        data: [14250, 485, 340],
        backgroundColor: ["#0B5D3B", "#F28C28", "#3B82F6"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1600,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { family: "Inter", size: 11, weight: "bold" as const },
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0,
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between" data-aos="fade-down">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-0.5 rounded">
            System Administration
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans mt-0.5">
            Nagpur Ecosystem Governance
          </h1>
        </div>
        <button
          onClick={() =>
            showToast("System Cache & Scraper Sync Cleared", "success")
          }
          className="px-4 py-2 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
        >
          Force API Scraper Sync
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" data-aos="fade-up">
        <KPICard
          title="Total Entities"
          value={mockCompanies.length}
          icon="solar:buildings-bold-duotone"
          index={0}
        />
        <KPICard
          title="Pending Verifications"
          value={pendingVerifications.length}
          icon="solar:clock-circle-bold-duotone"
          index={1}
        />
        <KPICard
          title="Active Job Feeds"
          value="3,690"
          icon="solar:case-round-bold-duotone"
          index={2}
        />
        <KPICard
          title="Scraper Health"
          value="100%"
          icon="solar:server-bold-duotone"
          index={3}
        />
      </div>

      {/* QUICK SECTION NAVIGATION HUB */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" data-aos="fade-up">
        <span className="text-xs font-bold text-[#1F2937] uppercase tracking-wider flex items-center gap-1.5">
          <Icon icon="solar:tuning-square-2-bold" className="w-4 h-4 text-[#F28C28]" />
          <span>Governance Quick Portals:</span>
        </span>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Link
            to="/admin/users"
            className="px-4 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Icon icon="solar:users-group-two-rounded-bold" className="w-4 h-4" />
            <span>Jobseekers Directory</span>
          </Link>
          <Link
            to="/admin/companies"
            className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Icon icon="solar:buildings-bold" className="w-4 h-4" />
            <span>Company Directory</span>
          </Link>
          <Link
            to="/admin/institutes"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Icon icon="solar:ruler-cross-pen-bold" className="w-4 h-4" />
            <span>Institute Directory</span>
          </Link>
        </div>
      </div>

      {/* 2-COLUMN SECTION: LEFT PIE CHART & RIGHT PENDING CLAIMS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-aos="fade-up">
        {/* Left Side: Registered Users Pie Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:pie-chart-bold"
                className="w-5 h-5 text-[#0B5D3B]"
              />
              <span>Registered User Base Distribution</span>
            </h3>
            <span className="text-[10px] font-bold text-[#0B5D3B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live Ecosystem
            </span>
          </div>

          <div className="h-60 relative flex items-center justify-center">
            <Pie data={registeredPieData} options={pieOptions} />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center text-xs">
            <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <span className="block text-[10px] font-bold text-[#0B5D3B]">
                Jobseekers
              </span>
              <span className="font-extrabold text-sm text-[#1F2937]">
                {registeredPieData.datasets[0].data[0]}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
              <span className="block text-[10px] font-bold text-[#F28C28]">
                Companies
              </span>
              <span className="font-extrabold text-sm text-[#1F2937]">
                {registeredPieData.datasets[0].data[1]}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100">
              <span className="block text-[10px] font-bold text-blue-600">
                Institutes
              </span>
              <span className="font-extrabold text-sm text-[#1F2937]">
                {registeredPieData.datasets[0].data[2]}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Pending Claim Verification Requests */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:shield-check-bold"
                className="w-5 h-5 text-[#F28C28]"
              />
              <span>
                Pending Claim Verification Requests (
                {pendingVerifications.length})
              </span>
            </h3>
            <Link
              to="/admin/verification"
              className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1"
            >
              <span>View Full Queue</span>
              <Icon
                icon="solar:alt-arrow-right-linear"
                className="w-3.5 h-3.5"
              />
            </Link>
          </div>

          {pendingVerifications.length === 0 ? (
            <div className="text-center py-12 bg-[#F5F8F6] rounded-2xl border border-dashed border-gray-200 text-xs text-gray-500 my-auto">
              <Icon
                icon="solar:check-circle-bold-duotone"
                className="w-8 h-8 text-emerald-600 mx-auto mb-1.5"
              />
              <span>All claim requests have been verified and processed.</span>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
              {pendingVerifications.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-[#F5F8F6] hover:bg-emerald-50/20 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="font-bold text-sm text-[#0B5D3B] hover:underline flex items-center gap-1.5 cursor-pointer text-left"
                      title="Click to view full company details"
                    >
                      <span>{req.companyName}</span>
                      <Icon
                        icon="solar:square-arrow-out-up-right-bold"
                        className="w-3.5 h-3.5 text-[#0B5D3B]"
                      />
                    </button>
                    <p className="text-gray-600">
                      Requester:{" "}
                      <span className="font-semibold text-gray-800">
                        {req.requesterName}
                      </span>{" "}
                      ({req.requesterEmail})
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span>Submitted {req.submittedDate}</span>
                      <span>•</span>
                      <span>GST/CIN: {req.gstCin}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {/* <button
                      onClick={() => setSelectedRequest(req)}
                      className="px-2.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                    >
                      Details
                    </button> */}
                    <button
                      onClick={() => handleApprove(req)}
                      className="px-3 py-1.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req)}
                      className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Audit Trail */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937] font-sans">
          Recent System Audit Stream
        </h3>
        <div className="space-y-2 text-xs">
          {mockAuditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-gray-50 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-[#1F2937]">{log.action}</span>
                <span className="text-gray-500 ml-2">{log.target}</span>
              </div>
              <span className="text-gray-400 font-sans">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANY FULL DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setSelectedRequest(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-xl font-display">
                {selectedRequest.companyName}
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Claim Registration Details • Status: {selectedRequest.status}
              </p>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B]">
                  Company Info
                </h4>
                <p>
                  <span className="text-gray-500 font-medium">Industry:</span>{" "}
                  {selectedRequest.industry || "IT & Services"}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">SEZ Zone:</span>{" "}
                  {selectedRequest.sezZone || "MIHAN SEZ"}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Website:</span>{" "}
                  {selectedRequest.website || "N/A"}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Headcount:</span>{" "}
                  {selectedRequest.employeeBand || "50-200"}
                </p>
                {selectedRequest.overview && (
                  <p>
                    <span className="text-gray-500 font-medium">Overview:</span>{" "}
                    {selectedRequest.overview}
                  </p>
                )}
              </div>

              <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B]">
                  Representative & Proof
                </h4>
                <p>
                  <span className="text-gray-500 font-medium">Requester:</span>{" "}
                  {selectedRequest.requesterName} ({selectedRequest.designation}
                  )
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Email:</span>{" "}
                  {selectedRequest.requesterEmail}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">
                    GSTIN / CIN:
                  </span>{" "}
                  <span className="font-mono">{selectedRequest.gstCin}</span>
                </p>
                <p>
                  <span className="text-gray-500 font-medium">
                    Proof Document:
                  </span>{" "}
                  {selectedRequest.documentName}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-white text-gray-700 font-bold rounded-xl border border-gray-300"
              >
                Close
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleReject(selectedRequest);
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 bg-rose-100 text-rose-800 font-bold rounded-xl"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    handleApprove(selectedRequest);
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 bg-[#0B5D3B] text-white font-bold rounded-xl"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
