import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useToast } from "../../context/ToastContext";
import { mockJobseekers, type JobseekerDetail } from "../../data/mockAdminFullData";

export const AdminUsers: React.FC = () => {
  const { showToast } = useToast();
  const [jobseekers, setJobseekers] = useState<JobseekerDetail[]>(mockJobseekers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedJobseeker, setSelectedJobseeker] = useState<JobseekerDetail | null>(null);

  const filtered = jobseekers.filter((js) => {
    const matchesSearch =
      js.name.toLowerCase().includes(search.toLowerCase()) ||
      js.email.toLowerCase().includes(search.toLowerCase()) ||
      js.headline.toLowerCase().includes(search.toLowerCase()) ||
      js.institute.toLowerCase().includes(search.toLowerCase()) ||
      js.primarySkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "All" || js.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleUserStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Placed" ? "Open for Work" : "Placed";
    setJobseekers((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: nextStatus as any } : j))
    );
    showToast(`Status updated to ${nextStatus}`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-1 rounded-md block w-fit mb-1">
            Talent Pool Governance
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            Jobseeker Directory & Candidate Analytics
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor registered jobseekers, verify qualifications, and inspect active job application pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-[#0B5D3B] flex items-center gap-2">
            <Icon icon="solar:user-bold" className="w-4 h-4 text-[#0B5D3B]" />
            <span>Total Candidates: {jobseekers.length}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Icon icon="solar:magnifer-linear" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by candidate name, skill, institute..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-gray-500 shrink-0">Status:</span>
          {["All", "Open for Work", "Active", "Placed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st
                  ? "bg-[#0B5D3B] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Jobseekers Table */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Candidate Profile</th>
                <th className="p-4">Qualification & Institute</th>
                <th className="p-4">Primary Skills</th>
                <th className="p-4">Applications</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((js) => (
                <tr key={js.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={js.avatar}
                        alt={js.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#0B5D3B]/20 shadow-xs"
                      />
                      <div>
                        <span className="font-bold text-sm text-[#1F2937] block leading-tight">
                          {js.name}
                        </span>
                        <span className="text-[11px] text-gray-500 block truncate max-w-[200px]">
                          {js.headline}
                        </span>
                        <span className="text-[10px] text-gray-400 block font-mono">
                          {js.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 space-y-0.5">
                    <span className="font-semibold text-gray-800 block">
                      {js.qualification}
                    </span>
                    <span className="text-[11px] text-gray-500 block max-w-[220px] truncate" title={js.institute}>
                      {js.institute}
                    </span>
                    <span className="text-[10px] text-[#0B5D3B] font-bold">
                      Exp: {js.yoe}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {js.primarySkills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 bg-emerald-50 text-[#0B5D3B] border border-emerald-200/60 text-[10px] font-bold rounded-md"
                        >
                          {sk}
                        </span>
                      ))}
                      {js.primarySkills.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                          +{js.primarySkills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-1 bg-amber-50 text-[#F28C28] border border-amber-200/60 text-[11px] font-bold rounded-lg inline-flex items-center gap-1">
                        <Icon icon="solar:case-bold" className="w-3.5 h-3.5" />
                        {js.appliedJobs.length} Applied
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Saved: {js.savedJobsCount} jobs
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 ${
                        js.status === "Open for Work"
                          ? "bg-emerald-100 text-emerald-800"
                          : js.status === "Placed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        js.status === "Open for Work" ? "bg-emerald-500 animate-pulse" : "bg-blue-500"
                      }`} />
                      {js.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedJobseeker(js)}
                        className="p-2 bg-[#0B5D3B]/10 hover:bg-[#0B5D3B] text-[#0B5D3B] hover:text-white rounded-xl transition-all cursor-pointer shadow-xs"
                        title="View Full Jobseeker Profile Details"
                      >
                        <Icon icon="solar:eye-bold" className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleUserStatus(js.id, js.status)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all cursor-pointer"
                        title="Toggle Placement Status"
                      >
                        <Icon icon="solar:settings-minimalistic-bold" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED JOBSEEKER MODAL */}
      <AnimatePresence>
        {selectedJobseeker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Banner */}
              <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#F28C28] text-white p-6 relative">
                <button
                  onClick={() => setSelectedJobseeker(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={selectedJobseeker.avatar}
                    alt={selectedJobseeker.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl font-display text-white">
                        {selectedJobseeker.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                        {selectedJobseeker.status}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-100 font-medium mt-0.5">
                      {selectedJobseeker.headline}
                    </p>
                    <p className="text-[11px] text-white/80 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Icon icon="solar:map-point-bold" className="w-3.5 h-3.5 text-[#FFD166]" />
                        {selectedJobseeker.location}
                      </span>
                      <span>•</span>
                      <span>Exp: {selectedJobseeker.yoe}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* Candidate Overview Summary */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                    <Icon icon="solar:user-speak-bold" className="w-4 h-4" />
                    Candidate Profile Summary
                  </h4>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {selectedJobseeker.bio}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-gray-600">
                    <div>
                      <span className="font-bold text-gray-800">Expected CTC:</span> {selectedJobseeker.expectedCtc}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">Preferred Zone:</span> {selectedJobseeker.preferredLocation}
                    </div>
                  </div>
                </div>

                {/* Contact Information & Social Profiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                      <Icon icon="solar:letter-bold" className="w-4 h-4" />
                      Contact Coordinates
                    </h4>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Icon icon="solar:mailbox-bold" className="w-4 h-4 text-gray-500" />
                      <span>{selectedJobseeker.email}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Icon icon="solar:phone-bold" className="w-4 h-4 text-gray-500" />
                      <span>{selectedJobseeker.phone}</span>
                    </p>
                  </div>

                  <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                      <Icon icon="solar:link-bold" className="w-4 h-4" />
                      Professional Profiles
                    </h4>
                    <div className="flex flex-col gap-1.5">
                      <a
                        href={selectedJobseeker.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Icon icon="solar:globus-bold" className="w-3.5 h-3.5" />
                        LinkedIn Profile Link
                      </a>
                      <a
                        href={selectedJobseeker.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-800 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Icon icon="solar:code-bold" className="w-3.5 h-3.5" />
                        GitHub Portfolio
                      </a>
                    </div>
                  </div>
                </div>

                {/* Qualification & Institute */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                    <Icon icon="solar:ruler-cross-pen-bold" className="w-4 h-4" />
                    Academic Qualification & Alma Mater
                  </h4>
                  <p className="text-sm font-bold text-gray-800">
                    {selectedJobseeker.qualification}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedJobseeker.institute}
                  </p>
                </div>

                {/* Primary Technical Stack Skills */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                    <Icon icon="solar:stars-bold" className="w-4 h-4 text-[#F28C28]" />
                    Verified Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedJobseeker.primarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white text-[#0B5D3B] border border-[#0B5D3B]/20 rounded-xl text-xs font-bold shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Candidate Job Applications History Table */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                    <Icon icon="solar:case-round-bold" className="w-4 h-4 text-[#F28C28]" />
                    <span>Candidate Job Application Records ({selectedJobseeker.appliedJobs.length})</span>
                  </h4>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="p-3">Job Opportunity</th>
                          <th className="p-3">Company</th>
                          <th className="p-3">Applied Date</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedJobseeker.appliedJobs.map((app) => (
                          <tr key={app.jobId} className="hover:bg-gray-50">
                            <td className="p-3 font-bold text-gray-800">{app.jobTitle}</td>
                            <td className="p-3 text-gray-600">{app.companyName}</td>
                            <td className="p-3 text-gray-500 font-mono">{app.appliedDate}</td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  app.status === "Interview Scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : app.status === "Shortlisted"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : app.status === "Offered"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <button
                  onClick={() =>
                    showToast(`Downloading resume ${selectedJobseeker.resumeName}`, "info")
                  }
                  className="px-4 py-2 bg-white text-gray-700 font-bold text-xs rounded-xl border border-gray-300 flex items-center gap-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Icon icon="solar:document-bold" className="w-4 h-4 text-[#F28C28]" />
                  <span>{selectedJobseeker.resumeName}</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      showToast(`Verification badge issued for ${selectedJobseeker.name}`, "success");
                      setSelectedJobseeker(null);
                    }}
                    className="px-4 py-2 bg-[#0B5D3B] text-white font-bold text-xs rounded-xl hover:bg-[#07472d] transition-colors cursor-pointer"
                  >
                    Verify Candidate Profile
                  </button>
                  <button
                    onClick={() => setSelectedJobseeker(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
