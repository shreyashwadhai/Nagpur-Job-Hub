import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useToast } from "../../context/ToastContext";
import { mockInstitutes, type InstituteDetail } from "../../data/mockAdminFullData";

export const AdminInstitutes: React.FC = () => {
  const { showToast } = useToast();
  const [institutes, setInstitutes] = useState<InstituteDetail[]>(mockInstitutes);
  const [search, setSearch] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState<InstituteDetail | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Institute Form State
  const [instName, setInstName] = useState("");
  const [instShortName, setInstShortName] = useState("");
  const [instType, setInstType] = useState("Autonomous Engineering College");
  const [instLocation, setInstLocation] = useState("Wardha Road, Nagpur");
  const [instAddress, setInstAddress] = useState("");
  const [instEstd, setInstEstd] = useState<number>(1995);
  const [instAccreditation, setInstAccreditation] = useState("NAAC A+ Grade • NBA Accredited");
  const [instDean, setInstDean] = useState("");
  const [instEmail, setInstEmail] = useState("");
  const [instPhone, setInstPhone] = useState("+91 712 ");
  const [instWebsite, setInstWebsite] = useState("https://");
  const [instPublicActive, setInstPublicActive] = useState(true);
  const [instStudentsCount, setInstStudentsCount] = useState<number>(3200);
  const [instLogoUrl, setInstLogoUrl] = useState("https://images.unsplash.com/photo-1562774053-701939374585?w=200&auto=format&fit=crop&q=80");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      showToast(`Institute logo "${file.name}" selected`, "info");
    }
  };

  const handleAddInstituteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName.trim() || !instShortName.trim()) {
      showToast("Institute Name and Acronym are required", "error");
      return;
    }

    const newInstId = `inst-${Date.now()}`;

    const newInstitute: InstituteDetail = {
      id: newInstId,
      name: instName,
      shortName: instShortName,
      logo: instLogoUrl,
      type: instType,
      location: instLocation,
      address: instAddress || `${instLocation}, Nagpur - 440010`,
      establishedYear: Number(instEstd) || 2000,
      accreditation: instAccreditation,
      deanName: instDean || "Dr. Academic Director",
      contactEmail: instEmail || `placement@${instShortName.toLowerCase()}.ac.in`,
      phone: instPhone,
      website: instWebsite,
      isPublicActive: instPublicActive,
      enrolledStudentsCount: Number(instStudentsCount) || 2500,
      courses: [
        { id: `c-${Date.now()}-1`, name: "B.Tech Computer Science & Engineering", degree: "Undergraduate", duration: "4 Years", enrolledCount: 420, applicantsCount: 120, status: "Active" },
        { id: `c-${Date.now()}-2`, name: "B.Tech Data Science & AI", degree: "Undergraduate", duration: "4 Years", enrolledCount: 300, applicantsCount: 95, status: "Active" }
      ],
      campusDrives: [
        { id: `drv-${Date.now()}-1`, driveTitle: `${instShortName} Inaugural Campus Placement Drive`, partnerCompany: "InfoCepts Technologies", partnerCompanyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=80&auto=format&fit=crop&q=80", targetBatch: "Batch 2026 B.Tech", totalApplicants: 180, date: "2026-10-30", status: "Scheduled" }
      ],
      newsAndUpdates: [
        { id: `inews-${Date.now()}-1`, title: `${instShortName} Establishes New AI & Robotics Center of Excellence`, date: new Date().toISOString().split("T")[0], category: "Campus Expansion", status: "Approved", isPublicVisible: true }
      ]
    };

    setInstitutes([newInstitute, ...institutes]);
    showToast(`Institute "${instName}" registered successfully!`, "success");

    // Reset Form
    setInstName("");
    setInstShortName("");
    setInstAddress("");
    setInstDean("");
    setIsAddModalOpen(false);
  };

  const filtered = institutes.filter(
    (inst) =>
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.shortName.toLowerCase().includes(search.toLowerCase()) ||
      inst.location.toLowerCase().includes(search.toLowerCase()) ||
      inst.type.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle Public Visibility of Institute
  const toggleInstitutePublicStatus = (id: string, currentPublicState: boolean) => {
    setInstitutes((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, isPublicActive: !currentPublicState } : inst
      )
    );
    const newStatus = !currentPublicState ? "Active (Public)" : "Inactive (Hidden)";
    showToast(`Institute public visibility toggled to ${newStatus}`, !currentPublicState ? "success" : "warning");
  };

  // Toggle Public Visibility of Specific News Post
  const toggleNewsPublicStatus = (instId: string, newsId: string, currentVisible: boolean) => {
    setInstitutes((prev) =>
      prev.map((inst) => {
        if (inst.id !== instId) return inst;
        return {
          ...inst,
          newsAndUpdates: inst.newsAndUpdates.map((news) =>
            news.id === newsId
              ? {
                  ...news,
                  isPublicVisible: !currentVisible,
                  status: !currentVisible ? "Approved" : "Pending Review"
                }
              : news
          )
        };
      })
    );

    if (selectedInstitute && selectedInstitute.id === instId) {
      setSelectedInstitute((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          newsAndUpdates: prev.newsAndUpdates.map((news) =>
            news.id === newsId
              ? {
                  ...news,
                  isPublicVisible: !currentVisible,
                  status: !currentVisible ? "Approved" : "Pending Review"
                }
              : news
          )
        };
      });
    }

    showToast(
      `News post visibility toggled to ${!currentVisible ? "Publicly Active" : "Inactive / Pending"}`,
      !currentVisible ? "success" : "info"
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md block w-fit mb-1 border border-blue-200/60">
            Academic & Institution Governance
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            Registered Institutes & Academic Directory
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage Nagpur colleges, active degree programs, enrolled student counts, campus placement drives, and news moderation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Icon icon="solar:add-circle-bold" className="w-4 h-4 text-white" />
            <span>Register New Institute</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Icon icon="solar:magnifer-linear" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search institute by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-all"
          />
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Displaying {filtered.length} of {institutes.length} Nagpur Institutes
        </span>
      </div>

      {/* Institutes Table */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Institute Entity</th>
                <th className="p-4">Category & Location</th>
                <th className="p-4">Active Courses</th>
                <th className="p-4">Enrolled Students</th>
                <th className="p-4">Campus Drives</th>
                <th className="p-4">Public Visibility</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((inst) => (
                <tr key={inst.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={inst.logo}
                        alt={inst.name}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-200 shadow-xs bg-white"
                      />
                      <div>
                        <span className="font-bold text-sm text-[#1F2937] block leading-tight">
                          {inst.name}
                        </span>
                        <span className="text-[11px] text-blue-600 font-semibold block">
                          {inst.shortName} • Estd {inst.establishedYear}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-gray-800 block">
                      {inst.type}
                    </span>
                    <span className="text-[10px] text-gray-500 block truncate max-w-[180px]">
                      {inst.location}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-bold rounded-xl inline-flex items-center gap-1">
                      <Icon icon="solar:notebook-bold" className="w-3.5 h-3.5" />
                      {inst.courses.length} Courses
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-emerald-50 text-[#0B5D3B] border border-emerald-200/60 text-xs font-bold rounded-xl inline-flex items-center gap-1">
                      <Icon icon="solar:users-group-two-rounded-bold" className="w-3.5 h-3.5" />
                      {inst.enrolledStudentsCount.toLocaleString()} Students
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-orange-50 text-[#F28C28] border border-orange-200/60 text-xs font-bold rounded-xl inline-flex items-center gap-1">
                      <Icon icon="solar:case-bold" className="w-3.5 h-3.5" />
                      {inst.campusDrives.length} Drives
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleInstitutePublicStatus(inst.id, inst.isPublicActive)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        inst.isPublicActive
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                      }`}
                      title="Click to toggle public active/inactive visibility status"
                    >
                      <span className={`w-2 h-2 rounded-full ${inst.isPublicActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                      <span>{inst.isPublicActive ? "Active" : "Inactive"}</span>
                    </button>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedInstitute(inst)}
                      className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl transition-all cursor-pointer shadow-xs font-bold flex items-center gap-1 mx-auto"
                      title="View Full Details About Institute"
                    >
                      <Icon icon="solar:eye-bold" className="w-4 h-4" />
                      <span className="text-[11px]">View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: REGISTER NEW INSTITUTE MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-[#0B5D3B] text-white p-6 relative">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                </button>

                <h3 className="font-extrabold text-xl font-display text-white">
                  Register New Academic Institute
                </h3>
                <p className="text-xs text-blue-100 mt-0.5">
                  Add an academic institution profile to Nagpur's education & placement directory.
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleAddInstituteSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Institute Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Symbiosis Institute of Technology Nagpur..."
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 font-semibold text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Short Name / Acronym <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SIT Nagpur"
                      value={instShortName}
                      onChange={(e) => setInstShortName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 font-semibold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Institute Type / Category</label>
                    <select
                      value={instType}
                      onChange={(e) => setInstType(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="Tier-1 National Institute">Tier-1 National Institute</option>
                      <option value="Autonomous Engineering College">Autonomous Engineering College</option>
                      <option value="Deemed Technical University">Deemed Technical University</option>
                      <option value="Skill & Vocational Academy">Skill & Vocational Academy</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Enrolled Students Count</label>
                    <input
                      type="number"
                      value={instStudentsCount}
                      onChange={(e) => setInstStudentsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Established Year</label>
                    <input
                      type="number"
                      value={instEstd}
                      onChange={(e) => setInstEstd(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Public Visibility Status</label>
                    <select
                      value={instPublicActive ? "true" : "false"}
                      onChange={(e) => setInstPublicActive(e.target.value === "true")}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="true">Active (Public View)</option>
                      <option value="false">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>

                {/* LOGO UPLOAD SECTION */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-3">
                  <label className="block font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <Icon icon="solar:gallery-bold" className="w-4 h-4 text-[#F28C28]" />
                    Institute Logo / Shield Upload
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={instLogoUrl}
                      alt="Institute Logo Preview"
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
                          className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-700 file:text-white hover:file:bg-blue-800 cursor-pointer"
                        />
                      </div>

                      <div className="pt-1 border-t border-gray-200">
                        <span className="text-[10px] text-gray-400 block mb-0.5">Or paste image URL:</span>
                        <input
                          type="text"
                          value={instLogoUrl}
                          onChange={(e) => setInstLogoUrl(e.target.value)}
                          className="w-full px-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Campus Location / Area in Nagpur</label>
                  <input
                    type="text"
                    placeholder="e.g. MIHAN Educational Zone, Nagpur"
                    value={instLocation}
                    onChange={(e) => setInstLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Postal Address</label>
                  <input
                    type="text"
                    placeholder="Campus address details..."
                    value={instAddress}
                    onChange={(e) => setInstAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Accreditation / NIRF / NAAC Rating</label>
                  <input
                    type="text"
                    placeholder="e.g. NAAC A++ Grade • NIRF Rank #42"
                    value={instAccreditation}
                    onChange={(e) => setInstAccreditation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Director / Placement Officer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={instDean}
                      onChange={(e) => setInstDean(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Placement Contact Email</label>
                    <input
                      type="email"
                      placeholder="placements@institute.ac.in"
                      value={instEmail}
                      onChange={(e) => setInstEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={instPhone}
                      onChange={(e) => setInstPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Official Website URL</label>
                    <input
                      type="text"
                      value={instWebsite}
                      onChange={(e) => setInstWebsite(e.target.value)}
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
                    className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Register Institute Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: FULL INSTITUTE DETAILS MODAL */}
      <AnimatePresence>
        {selectedInstitute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-[#0B5D3B] text-white p-6 relative">
                <button
                  onClick={() => setSelectedInstitute(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={selectedInstitute.logo}
                    alt={selectedInstitute.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-lg bg-white"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl font-display text-white">
                        {selectedInstitute.name}
                      </h3>
                      <button
                        onClick={() => toggleInstitutePublicStatus(selectedInstitute.id, selectedInstitute.isPublicActive)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                          selectedInstitute.isPublicActive
                            ? "bg-emerald-500/20 text-emerald-200 border-emerald-400"
                            : "bg-rose-500/20 text-rose-200 border-rose-400"
                        }`}
                      >
                        {selectedInstitute.isPublicActive ? "Active Public Profile" : "Inactive / Hidden"}
                      </button>
                    </div>
                    <p className="text-xs text-blue-100 font-medium mt-0.5">
                      {selectedInstitute.type} • Accreditation: {selectedInstitute.accreditation}
                    </p>
                    <p className="text-[11px] text-white/80 mt-1">
                      {selectedInstitute.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* Institute Overview Info */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <Icon icon="solar:buildings-bold" className="w-4 h-4" />
                    Institute Profile & Governance Coordinates
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-gray-700">
                    <div>
                      <span className="font-bold text-gray-800 block">Established:</span> {selectedInstitute.establishedYear}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Head / Dean:</span> {selectedInstitute.deanName}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Placement Email:</span> {selectedInstitute.contactEmail}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Official Site:</span>{" "}
                      <a href={selectedInstitute.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold">
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* 1. Active Degree & Courses List */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                    <Icon icon="solar:notebook-bold" className="w-4 h-4 text-blue-600" />
                    <span>Active Degree Programs & Courses ({selectedInstitute.courses.length})</span>
                  </h4>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="p-3">Course / Degree Program</th>
                          <th className="p-3">Degree Level</th>
                          <th className="p-3">Duration</th>
                          <th className="p-3">Enrolled Students</th>
                          <th className="p-3">Internship Applicants</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedInstitute.courses.map((course) => (
                          <tr key={course.id} className="hover:bg-gray-50">
                            <td className="p-3 font-bold text-gray-800">{course.name}</td>
                            <td className="p-3 text-gray-600">{course.degree}</td>
                            <td className="p-3 text-gray-600">{course.duration}</td>
                            <td className="p-3 font-bold text-[#0B5D3B]">{course.enrolledCount} Students</td>
                            <td className="p-3 font-bold text-[#F28C28]">{course.applicantsCount} Applicants</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                {course.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Campus Drives & Programs List with Applicants */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                    <Icon icon="solar:case-bold" className="w-4 h-4 text-[#F28C28]" />
                    <span>Campus Placement Drives & Internship Programs ({selectedInstitute.campusDrives.length})</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedInstitute.campusDrives.map((drive) => (
                      <div
                        key={drive.id}
                        className="p-3.5 bg-[#F5F8F6] rounded-2xl border border-gray-200 space-y-1.5 hover:border-blue-600 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1F2937]">{drive.driveTitle}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[9px] font-bold">
                            {drive.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-1 text-gray-600">
                          <img
                            src={drive.partnerCompanyLogo}
                            alt={drive.partnerCompany}
                            className="w-5 h-5 rounded-md object-cover border border-gray-200 bg-white"
                          />
                          <span className="text-[11px] font-semibold">{drive.partnerCompany}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px] text-gray-500 border-t border-gray-200/60">
                          <span>Target: {drive.targetBatch}</span>
                          <span className="font-bold text-[#F28C28]">{drive.totalApplicants} Applicants</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Posted News & Updates with Approve/Pending Status & Public Active/Inactive Toggle */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1F2937] flex items-center gap-2">
                    <Icon icon="solar:document-text-bold" className="w-4 h-4 text-blue-600" />
                    <span>Institute News & Announcements Moderation ({selectedInstitute.newsAndUpdates.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {selectedInstitute.newsAndUpdates.map((news) => (
                      <div
                        key={news.id}
                        className="p-3.5 bg-[#F5F8F6] rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-[#1F2937] block">
                            {news.title}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500">
                            <span>Category: {news.category}</span>
                            <span>•</span>
                            <span>Posted {news.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              news.status === "Approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {news.status}
                          </span>

                          <button
                            onClick={() =>
                              toggleNewsPublicStatus(selectedInstitute.id, news.id, news.isPublicVisible)
                            }
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              news.isPublicVisible
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            title="Toggle Public Active / Inactive Visibility for this post"
                          >
                            <Icon
                              icon={news.isPublicVisible ? "solar:eye-bold" : "solar:eye-closed-bold"}
                              className="w-3.5 h-3.5"
                            />
                            <span>{news.isPublicVisible ? "Publicly Active" : "Inactive (Draft)"}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  Contact: {selectedInstitute.phone}
                </span>

                <button
                  onClick={() => setSelectedInstitute(null)}
                  className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Close Institute Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
