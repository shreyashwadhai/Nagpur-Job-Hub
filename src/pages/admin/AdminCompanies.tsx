import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { mockCompanies } from "../../data/mockCompanies";
import { mockJobs } from "../../data/mockJobs";
import { mockCompanyDrivePartnerships } from "../../data/mockAdminFullData";
import { VerificationBadge } from "../../components/ui/Badges";
import { useToast } from "../../context/ToastContext";
import { useVerification } from "../../context/VerificationContext";
import type { Company } from "../../types";

export const AdminCompanies: React.FC = () => {
  const [companiesList, setCompaniesList] = useState<Company[]>(mockCompanies);
  const [search, setSearch] = useState("");
  const [sezFilter, setSezFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { showToast } = useToast();
  const { verificationRequests, approveVerificationRequest, rejectVerificationRequest } = useVerification();

  // Add Company Form State
  const [compName, setCompName] = useState("");
  const [compIndustry, setCompIndustry] = useState("IT & Software Services");
  const [compSez, setCompSez] = useState<'MIHAN SEZ' | 'Hingna MIDC' | 'Butibori Industrial Area' | 'IT Park Parsodi' | 'Kalmeshwar' | 'Central Nagpur'>('MIHAN SEZ');
  const [compLocation, _setCompLocation] = useState("MIHAN SEZ, Nagpur");
  const [compHeadcount, setCompHeadcount] = useState("50-200");
  const [compEntryYear, setCompEntryYear] = useState<number>(2024);
  const [compBusinessFocus, setCompBusinessFocus] = useState("");
  const [compOverview, setCompOverview] = useState("");
  const [compWebsite, setCompWebsite] = useState("https://");
  const [compEmail, setCompEmail] = useState("");
  const [compPhone, _setCompPhone] = useState("+91 712 ");
  const [compLeaderName, setCompLeaderName] = useState("");
  const [compLeaderTitle, setCompLeaderTitle] = useState("Managing Director");
  const [compVerificationStatus, setCompVerificationStatus] = useState<'verified' | 'estimated' | 'pending'>('verified');
  const [compLogoUrl, setCompLogoUrl] = useState("https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop&q=80");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      showToast(`Logo file "${file.name}" selected`, "info");
    }
  };

  const handleAddCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim()) {
      showToast("Company Name is required", "error");
      return;
    }

    const newCompId = compName.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const newCompany: Company = {
      id: newCompId,
      name: compName,
      logo: compLogoUrl,
      verified: compVerificationStatus === 'verified',
      verificationStatus: compVerificationStatus,
      industry: compIndustry,
      industryId: compIndustry.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      location: compLocation,
      sezZone: compSez,
      employeeBand: compHeadcount,
      entryYear: Number(compEntryYear) || 2024,
      businessFocus: compBusinessFocus || `${compIndustry} solutions and services in ${compSez}`,
      overview: compOverview || `${compName} is a premier enterprise entity operating in ${compSez} Nagpur.`,
      localLeadership: {
        name: compLeaderName || "Corporate Director",
        title: compLeaderTitle
      },
      growthTrajectory: [
        { year: 2024, headcount: 50 },
        { year: 2026, headcount: 180 }
      ],
      website: compWebsite,
      coordinates: { lat: 21.08, lng: 79.05 },
      contactEmail: compEmail || `contact@${newCompId}.in`,
      phone: compPhone,
      tags: [compIndustry, compSez, "Nagpur Industrial Hub"]
    };

    setCompaniesList([newCompany, ...companiesList]);
    showToast(`Company "${compName}" registered successfully!`, "success");

    // Reset Form
    setCompName("");
    setCompBusinessFocus("");
    setCompOverview("");
    setCompLeaderName("");
    setIsAddModalOpen(false);
  };

  const filtered = companiesList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.sezZone.toLowerCase().includes(search.toLowerCase());

    const matchesSez = sezFilter === "All" || c.sezZone === sezFilter;
    return matchesSearch && matchesSez;
  });

  // Calculate stats per company
  const getCompanyJobs = (companyId: string) => {
    return mockJobs.filter((j) => j.companyId === companyId || j.companyName.toLowerCase() === companyId.toLowerCase());
  };

  const getCompanyApplicantsCount = (companyId: string) => {
    const jobs = getCompanyJobs(companyId);
    return jobs.reduce((acc, _, idx) => acc + (idx + 1) * 28 + 14, 18);
  };

  const getCompanyDrives = (companyId: string) => {
    return mockCompanyDrivePartnerships.filter(
      (d) => d.companyId === companyId || d.companyId.includes(companyId.split("-")[0])
    );
  };

  const getPendingRequestForCompany = (companyName: string) => {
    return verificationRequests.find((v) => v.companyName.toLowerCase() === companyName.toLowerCase());
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-1 rounded-md block w-fit mb-1 border border-[#F28C28]/20">
            Enterprise Directory Moderation
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            Registered Company Entities & Industry Telemetry
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Audit registered enterprise profiles, active job feeds, university joint drives, and verification claims.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4 text-white" />
          <span>Register New Entity</span>
        </button>
      </div>

      {/* Search & SEZ Filter Controls */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Icon icon="solar:magnifer-linear" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search company by name or industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-gray-500 shrink-0">Zone:</span>
          {["All", "MIHAN SEZ", "Hingna MIDC", "Butibori Industrial Area", "IT Park Parsodi"].map((z) => (
            <button
              key={z}
              onClick={() => setSezFilter(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                sezFilter === z
                  ? "bg-[#F28C28] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Registered Company Entity</th>
                <th className="p-4">SEZ Zone / Location</th>
                <th className="p-4">Active Job Postings</th>
                <th className="p-4">Total Candidate Applicants</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => {
                const activeJobs = getCompanyJobs(c.id);
                const applicantCount = getCompanyApplicantsCount(c.id);
                const pendingReq = getPendingRequestForCompany(c.name);

                return (
                  <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-200 shadow-xs bg-white"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-[#1F2937] block leading-tight">
                              {c.name}
                            </span>
                            {pendingReq && (
                              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold animate-pulse">
                                Pending Claim
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-500 block">
                            {c.industry} • Headcount: {c.employeeBand}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-gray-800 block">
                        {c.sezZone}
                      </span>
                      <span className="text-[10px] text-gray-500 block truncate max-w-[180px]">
                        {c.location}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-emerald-50 text-[#0B5D3B] border border-emerald-200/60 text-xs font-bold rounded-xl inline-flex items-center gap-1">
                        <Icon icon="solar:case-bold" className="w-3.5 h-3.5" />
                        {activeJobs.length} Active Jobs
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-orange-50 text-[#F28C28] border border-orange-200/60 text-xs font-bold rounded-xl inline-flex items-center gap-1">
                        <Icon icon="solar:users-group-two-rounded-bold" className="w-3.5 h-3.5" />
                        {applicantCount} Applicants
                      </span>
                    </td>

                    <td className="p-4">
                      <VerificationBadge status={c.verificationStatus} />
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedCompany(c)}
                        className="p-2 bg-[#F28C28]/10 hover:bg-[#F28C28] text-[#F28C28] hover:text-white rounded-xl transition-all cursor-pointer shadow-xs font-bold flex items-center gap-1 mx-auto"
                        title="View All Details About Company"
                      >
                        <Icon icon="solar:eye-bold" className="w-4 h-4" />
                        <span className="text-[11px]">View Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: REGISTER NEW COMPANY ENTITY MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#F28C28] text-white p-6 relative">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                </button>

                <h3 className="font-extrabold text-xl font-display text-white">
                  Register New Enterprise Entity
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Add a company profile directly into Nagpur's industrial telemetry graph.
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleAddCompanySubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Advanced Systems Limited..."
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28] font-semibold text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Industry Sector</label>
                    <select
                      value={compIndustry}
                      onChange={(e) => setCompIndustry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="IT & Software Services">IT & Software Services</option>
                      <option value="Defence & Aerospace">Defence & Aerospace</option>
                      <option value="Data Centres & Cloud Infra">Data Centres & Cloud Infra</option>
                      <option value="Logistics & Warehousing">Logistics & Warehousing</option>
                      <option value="EV & Electric Mobility">EV & Electric Mobility</option>
                      <option value="AgriTech & Bio-Processing">AgriTech & Bio-Processing</option>
                      <option value="Heavy Engineering">Heavy Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SEZ Zone / Location Cluster</label>
                    <select
                      value={compSez}
                      onChange={(e) => setCompSez(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="MIHAN SEZ">MIHAN SEZ</option>
                      <option value="Hingna MIDC">Hingna MIDC</option>
                      <option value="Butibori Industrial Area">Butibori Industrial Area</option>
                      <option value="IT Park Parsodi">IT Park Parsodi</option>
                      <option value="Kalmeshwar">Kalmeshwar</option>
                      <option value="Central Nagpur">Central Nagpur</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Employee Headcount</label>
                    <select
                      value={compHeadcount}
                      onChange={(e) => setCompHeadcount(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="10-50">10-50 Employees</option>
                      <option value="50-200">50-200 Employees</option>
                      <option value="200-500">200-500 Employees</option>
                      <option value="500-2000">500-2000 Employees</option>
                      <option value="2000+">2000+ Employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Entry / Estd Year</label>
                    <input
                      type="number"
                      value={compEntryYear}
                      onChange={(e) => setCompEntryYear(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Verification Status</label>
                    <select
                      value={compVerificationStatus}
                      onChange={(e) => setCompVerificationStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="verified">Verified Official Badge</option>
                      <option value="estimated">Estimated Directory</option>
                      <option value="pending">Pending Claim Verification</option>
                    </select>
                  </div>
                </div>

                {/* LOGO UPLOAD & PREVIEW */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-3">
                  <label className="block font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                    <Icon icon="solar:gallery-bold" className="w-4 h-4 text-[#F28C28]" />
                    Company Logo Upload
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={compLogoUrl}
                      alt="Company Logo Preview"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-gray-300 bg-white shrink-0 shadow-xs"
                    />

                    <div className="space-y-2 w-full">
                      <div>
                        <span className="text-[11px] text-gray-600 font-semibold block mb-1">
                          Upload image file:
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#F28C28] file:text-white hover:file:bg-[#FF9F43] cursor-pointer"
                        />
                      </div>

                      <div className="pt-1 border-t border-gray-200">
                        <span className="text-[10px] text-gray-400 block mb-0.5">Or paste image URL:</span>
                        <input
                          type="text"
                          value={compLogoUrl}
                          onChange={(e) => setCompLogoUrl(e.target.value)}
                          className="w-full px-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Business Focus / Short Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyperscale Edge Data Center & Cloud Services"
                    value={compBusinessFocus}
                    onChange={(e) => setCompBusinessFocus(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Company Overview Description</label>
                  <textarea
                    rows={3}
                    placeholder="Full operational overview and Vidarbha expansion plans..."
                    value={compOverview}
                    onChange={(e) => setCompOverview(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Website URL</label>
                    <input
                      type="text"
                      value={compWebsite}
                      onChange={(e) => setCompWebsite(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      placeholder="hr@company.com"
                      value={compEmail}
                      onChange={(e) => setCompEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Local Director / Leadership Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={compLeaderName}
                      onChange={(e) => setCompLeaderName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Title / Designation</label>
                    <input
                      type="text"
                      value={compLeaderTitle}
                      onChange={(e) => setCompLeaderTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Register Company Entity
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: FULL COMPANY DETAILS MODAL */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#F28C28] text-white p-6 relative">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-lg bg-white"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl font-display text-white">
                        {selectedCompany.name}
                      </h3>
                      <VerificationBadge status={selectedCompany.verificationStatus} />
                    </div>
                    <p className="text-xs text-emerald-100 font-medium mt-0.5">
                      {selectedCompany.industry} • SEZ: {selectedCompany.sezZone}
                    </p>
                    <p className="text-[11px] text-white/80 mt-1">
                      {selectedCompany.businessFocus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* Company Overview Card */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                    <Icon icon="solar:buildings-bold" className="w-4 h-4" />
                    Company Overview & Infrastructure
                  </h4>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {selectedCompany.overview}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-gray-200 text-gray-600">
                    <div>
                      <span className="font-bold text-gray-800 block">Headcount:</span> {selectedCompany.employeeBand}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Established:</span> {selectedCompany.entryYear}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Leadership:</span> {selectedCompany.localLeadership.name} ({selectedCompany.localLeadership.title})
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Website:</span>{" "}
                      <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>

                {/* 1. Active Jobs Posted List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                      <Icon icon="solar:case-bold" className="w-4 h-4 text-[#0B5D3B]" />
                      <span>Active Jobs Posted ({getCompanyJobs(selectedCompany.id).length})</span>
                    </h4>
                  </div>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="p-3">Job Title</th>
                          <th className="p-3">Work Mode</th>
                          <th className="p-3">Experience</th>
                          <th className="p-3">Salary Band</th>
                          <th className="p-3">Posted Date</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {getCompanyJobs(selectedCompany.id).length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500 italic">
                              No active job postings recorded.
                            </td>
                          </tr>
                        ) : (
                          getCompanyJobs(selectedCompany.id).map((job) => (
                            <tr key={job.id} className="hover:bg-gray-50">
                              <td className="p-3 font-bold text-gray-800">{job.title}</td>
                              <td className="p-3 text-gray-600">{job.workMode}</td>
                              <td className="p-3 text-gray-600">{job.experience}</td>
                              <td className="p-3 font-semibold text-[#0B5D3B]">{job.salaryRange}</td>
                              <td className="p-3 text-gray-500 font-mono">{job.postedDate}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  {job.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Conducting Drives & Programs with Institutes */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                    <Icon icon="solar:ruler-cross-pen-bold" className="w-4 h-4 text-[#F28C28]" />
                    <span>Institute Campus Drives & Joint Programs ({getCompanyDrives(selectedCompany.id).length})</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getCompanyDrives(selectedCompany.id).length === 0 ? (
                      <div className="col-span-2 p-4 bg-[#F5F8F6] rounded-2xl text-center text-gray-500 italic border border-dashed border-gray-200">
                        No active campus drives or joint institute programs registered yet.
                      </div>
                    ) : (
                      getCompanyDrives(selectedCompany.id).map((drive) => (
                        <div
                          key={drive.id}
                          className="p-3.5 bg-[#F5F8F6] rounded-2xl border border-gray-200 space-y-1.5 hover:border-[#F28C28] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#1F2937]">{drive.driveTitle}</span>
                            <span className="px-2 py-0.5 rounded bg-[#F28C28]/10 text-[#F28C28] text-[9px] font-bold">
                              {drive.programType}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-1 text-gray-600">
                            <img
                              src={drive.partnerInstituteLogo}
                              alt={drive.partnerInstitute}
                              className="w-5 h-5 rounded-md object-cover border border-gray-200"
                            />
                            <span className="text-[11px] font-medium">{drive.partnerInstitute}</span>
                          </div>

                          <div className="flex items-center justify-between pt-1 text-[10px] text-gray-500 border-t border-gray-200/60">
                            <span>Date: {drive.date}</span>
                            <span className="font-bold text-[#0B5D3B]">{drive.totalApplicants} Applicants</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 3. Display Company Approval Pending Requests */}
                {(() => {
                  const req = getPendingRequestForCompany(selectedCompany.name);
                  if (!req) return null;

                  return (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <Icon icon="solar:shield-check-bold" className="w-4 h-4 text-[#F28C28]" />
                          Pending Claim Request for {selectedCompany.name}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                          Action Required
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                        <div>
                          <span className="font-bold">Requester:</span> {req.requesterName} ({req.designation})
                        </div>
                        <div>
                          <span className="font-bold">Email:</span> {req.requesterEmail}
                        </div>
                        <div>
                          <span className="font-bold">GST / CIN:</span> <span className="font-mono">{req.gstCin}</span>
                        </div>
                        <div>
                          <span className="font-bold">Document:</span> {req.documentName}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-amber-200/60 justify-end">
                        <button
                          onClick={() => {
                            rejectVerificationRequest(req.id);
                            showToast(`Claim for ${req.companyName} Rejected`, "error");
                            setSelectedCompany(null);
                          }}
                          className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Reject Request
                        </button>
                        <button
                          onClick={() => {
                            approveVerificationRequest(req.id);
                            showToast(`Claim for ${req.companyName} Approved! Official badge assigned.`, "success");
                            setSelectedCompany(null);
                          }}
                          className="px-3 py-1.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Approve Claim Request
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  Contact: {selectedCompany.contactEmail} • {selectedCompany.phone}
                </span>

                <button
                  onClick={() => setSelectedCompany(null)}
                  className="px-4 py-2 bg-[#0B5D3B] text-white font-bold text-xs rounded-xl hover:bg-[#07472d] transition-colors cursor-pointer"
                >
                  Close Company Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
