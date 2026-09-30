import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useToast } from "../../context/ToastContext";

interface CourseProgram {
  id: string;
  title: string;
  category: "Degree Program" | "Diploma" | "Certification" | "Skill Workshop";
  duration: string;
  seats: number;
  eligibility: string;
  feesOrStipend: string;
  partnerCompanies: string[];
  description: string;
  status: "Active" | "Admissions Open" | "Enrollment Closed";
}

export const InstituteCourses: React.FC = () => {
  const { showToast } = useToast();

  const [courses, setCourses] = useState<CourseProgram[]>([
    {
      id: "c-1",
      title: "Post-Graduate Program in Cloud Data Engineering",
      category: "Certification",
      duration: "6 Months",
      seats: 50,
      eligibility: "B.E. / B.Tech / MCA",
      feesOrStipend: "₹45,000",
      partnerCompanies: ["InfoCepts", "Persistent Systems"],
      description: "Comprehensive hands-on training in hyperscale data warehousing, Snowflake, Databricks & PySpark.",
      status: "Admissions Open"
    },
    {
      id: "c-2",
      title: "B.Tech in Artificial Intelligence & Machine Learning",
      category: "Degree Program",
      duration: "4 Years",
      seats: 120,
      eligibility: "10+2 PCM (JEE Main Score)",
      feesOrStipend: "₹1,85,000 / Year",
      partnerCompanies: ["TCS", "Persistent Systems", "HCL Tech"],
      description: "AICTE-approved 4-year degree curriculum focused on deep learning, computer vision, and neural networks.",
      status: "Active"
    },
    {
      id: "c-[#3]",
      title: "EV Powertrain & Lithium Battery Tech Workshop",
      category: "Skill Workshop",
      duration: "4 Weeks",
      seats: 60,
      eligibility: "Diploma / B.E Electrical & Mechanical",
      feesOrStipend: "Free (Govt Subsidized)",
      partnerCompanies: ["Mahindra Last Mile", "Kinetic Green"],
      description: "Vocational hands-on lab training on EV motor control, BMS architecture and battery safety.",
      status: "Admissions Open"
    },
    {
      id: "c-4",
      title: "Aerostructures Manufacturing & NDT Diploma",
      category: "Diploma",
      duration: "1 Year",
      seats: 40,
      eligibility: "B.Sc Physics / B.E Mechanical",
      feesOrStipend: "₹60,000",
      partnerCompanies: ["DRAL Rafale", "Solar Industries"],
      description: "Precision aerospace composite tooling and Non-Destructive Testing for defense manufacturing in MIHAN SEZ.",
      status: "Active"
    }
  ]);

  const [activeTab, setActiveTab] = useState<string>("All");
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseProgram | null>(null);
  const [viewingCourse, setViewingCourse] = useState<CourseProgram | null>(null);

  const [partnerChips, setPartnerChips] = useState<string[]>(["Persistent Systems", "InfoCepts"]);
  const [partnerInputText, setPartnerInputText] = useState("");

  const handleAddPartnerChip = (textToAdd: string) => {
    const trimmed = textToAdd.trim().replace(/,/g, "");
    if (trimmed && !partnerChips.includes(trimmed)) {
      setPartnerChips((prev) => [...prev, trimmed]);
    }
  };

  const handlePartnerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (partnerInputText.trim()) {
        handleAddPartnerChip(partnerInputText);
        setPartnerInputText("");
      }
    }
  };

  const handlePartnerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.includes(",")) {
      const parts = val.split(",");
      parts.forEach((part) => {
        if (part.trim()) {
          handleAddPartnerChip(part);
        }
      });
      setPartnerInputText("");
    } else {
      setPartnerInputText(val);
    }
  };

  const handleRemovePartnerChip = (partnerToRemove: string) => {
    setPartnerChips((prev) => prev.filter((p) => p !== partnerToRemove));
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "Certification" as CourseProgram["category"],
    duration: "6 Months",
    seats: 40,
    eligibility: "B.E / B.Tech / B.Sc IT",
    feesOrStipend: "₹40,000",
    description: "",
    status: "Admissions Open" as CourseProgram["status"]
  });

  const filteredCourses = courses.filter((c) => {
    if (activeTab === "All") return true;
    return c.category === activeTab;
  });

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setPartnerChips(["Persistent Systems", "InfoCepts"]);
    setPartnerInputText("");
    setFormData({
      title: "",
      category: "Certification",
      duration: "6 Months",
      seats: 40,
      eligibility: "B.E / B.Tech / B.Sc IT",
      feesOrStipend: "₹40,000",
      description: "",
      status: "Admissions Open"
    });
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (c: CourseProgram) => {
    setEditingCourse(c);
    setPartnerChips([...c.partnerCompanies]);
    setPartnerInputText("");
    setFormData({
      title: c.title,
      category: c.category,
      duration: c.duration,
      seats: c.seats,
      eligibility: c.eligibility,
      feesOrStipend: c.feesOrStipend,
      description: c.description,
      status: c.status
    });
    setIsAddEditModalOpen(true);
  };

  const handleOpenViewModal = (c: CourseProgram) => {
    setViewingCourse(c);
    setIsViewModalOpen(true);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast(`Course "${title}" deleted successfully.`, "info");
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast("Please enter Course Title.", "error");
      return;
    }

    let finalPartners = [...partnerChips];
    if (partnerInputText.trim() && !finalPartners.includes(partnerInputText.trim())) {
      finalPartners.push(partnerInputText.trim());
    }

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((item) =>
          item.id === editingCourse.id
            ? {
                ...item,
                title: formData.title,
                category: formData.category,
                duration: formData.duration,
                seats: Number(formData.seats) || 30,
                eligibility: formData.eligibility,
                feesOrStipend: formData.feesOrStipend,
                partnerCompanies: finalPartners,
                description: formData.description,
                status: formData.status
              }
            : item
        )
      );
      showToast(`Course "${formData.title}" updated successfully!`, "success");
    } else {
      const newCourse: CourseProgram = {
        id: `c-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        duration: formData.duration,
        seats: Number(formData.seats) || 30,
        eligibility: formData.eligibility,
        feesOrStipend: formData.feesOrStipend,
        partnerCompanies: finalPartners,
        description: formData.description || "Course details and curriculum for students.",
        status: formData.status
      };
      setCourses((prev) => [newCourse, ...prev]);
      showToast(`New Course "${newCourse.title}" created successfully!`, "success");
    }

    setIsAddEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-0.5 rounded inline-block mb-1">
            Academia Management
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Academic Courses & Programs
          </h1>
          <p className="text-xs text-gray-500">
            Manage degree programs, certifications, diplomas and vocational skill workshops.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4 text-[#FF9F43]" />
          <span>Add Course & Program</span>
        </button>
      </div>

      {/* Filter Tabs & Table Container */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5 bg-[#F5F8F6] p-1 rounded-2xl border border-gray-200">
            {(["All", "Degree Program", "Diploma", "Certification", "Skill Workshop"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0B5D3B] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-gray-500">
            Showing {filteredCourses.length} Programs
          </span>
        </div>

        {/* COURSES TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-[#E5E9E6]">
              <tr>
                <th className="px-4 py-3.5">Course / Program Title</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Duration & Seats</th>
                <th className="px-4 py-3.5">Fee / Stipend</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9E6]">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No courses found in this category.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-bold text-[#1F2937] text-sm">{c.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Eligibility: {c.eligibility}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#0B5D3B]/10 text-[#0B5D3B]">
                        {c.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-700 font-medium">
                      <p>{c.duration}</p>
                      <span className="text-[11px] text-gray-400 font-mono">{c.seats} Intake Seats</span>
                    </td>
                    <td className="px-4 py-4 font-bold text-[#0B5D3B]">
                      {c.feesOrStipend}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        c.status === "Active" || c.status === "Admissions Open"
                          ? "bg-emerald-100 text-[#0B5D3B] border border-emerald-300"
                          : "bg-gray-200 text-gray-600"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* VIEW ACTION */}
                        <button
                          onClick={() => handleOpenViewModal(c)}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-[#0B5D3B] hover:bg-gray-100 cursor-pointer"
                          title="View Course Details"
                        >
                          <Icon icon="solar:eye-bold" className="w-4 h-4" />
                        </button>

                        {/* EDIT ACTION */}
                        <button
                          onClick={() => handleOpenEditModal(c)}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                          title="Edit Course"
                        >
                          <Icon icon="solar:pen-bold" className="w-4 h-4" />
                        </button>

                        {/* DELETE ACTION */}
                        <button
                          onClick={() => handleDeleteCourse(c.id, c.title)}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Course"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT COURSE MODAL */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-xl font-display">
                {editingCourse ? "Edit Course & Program" : "Add New Course & Program"}
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Fill in course information to publish on the Nagpur Institute Portal
              </p>
            </div>

            <form onSubmit={handleSaveCourse} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Course / Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Post-Graduate Program in Cloud Data Engineering"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  >
                    <option value="Degree Program">Degree Program</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certification">Certification</option>
                    <option value="Skill Workshop">Skill Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Months / 4 Years"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Intake Seats</label>
                  <input
                    type="number"
                    required
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Fees or Stipend</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹45,000 / Free Subsidized"
                    value={formData.feesOrStipend}
                    onChange={(e) => setFormData({ ...formData, feesOrStipend: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.E / B.Tech / B.Sc IT / Final Year Students"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              {/* CORPORATE PARTNERS CHIP INPUT */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Corporate Partners
                </label>
                <div className="p-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus-within:border-[#0B5D3B] transition-colors">
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center mb-1.5">
                    {partnerChips.map((partner) => (
                      <span
                        key={partner}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] text-xs font-semibold border border-emerald-200"
                      >
                        <span>{partner}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePartnerChip(partner)}
                          className="hover:text-red-600 transition-colors cursor-pointer p-0.5"
                          title="Remove partner"
                        >
                          <Icon icon="solar:close-circle-bold" className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type company name and press Comma (,) or Enter to add chip..."
                    value={partnerInputText}
                    onChange={handlePartnerInputChange}
                    onKeyDown={handlePartnerKeyDown}
                    onBlur={() => {
                      if (partnerInputText.trim()) {
                        handleAddPartnerChip(partnerInputText);
                        setPartnerInputText("");
                      }
                    }}
                    className="w-full bg-transparent text-xs focus:outline-none py-1 px-1 border-t border-gray-200/80 pt-2 text-gray-800 placeholder:text-gray-400"
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Type partner company name and press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-[9px] font-mono">Comma (,)</kbd> or <kbd className="px-1 py-0.5 bg-gray-200 rounded text-[9px] font-mono">Enter ↵</kbd> to convert into chip. Click <span className="text-red-500 font-bold">×</span> on chip to remove.
                </p>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Course Description & Details</label>
                <textarea
                  rows={3}
                  placeholder="Overview of curriculum, modules, and practical projects..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                >
                  <option value="Active">Active</option>
                  <option value="Admissions Open">Admissions Open</option>
                  <option value="Enrollment Closed">Enrollment Closed</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  <span>{editingCourse ? "Update Program" : "Publish Program"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW COURSE DETAILS MODAL */}
      {isViewModalOpen && viewingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-white/20 uppercase tracking-wider text-emerald-100">
                {viewingCourse.category}
              </span>
              <h3 className="font-bold text-xl font-display mt-1">{viewingCourse.title}</h3>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-gray-500 block font-medium">Duration:</span>
                  <span className="font-bold text-gray-800">{viewingCourse.duration}</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-medium">Intake Capacity:</span>
                  <span className="font-bold text-gray-800">{viewingCourse.seats} Seats</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-medium">Fees / Stipend:</span>
                  <span className="font-bold text-[#0B5D3B]">{viewingCourse.feesOrStipend}</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-medium">Current Status:</span>
                  <span className="font-bold text-emerald-700">{viewingCourse.status}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block font-bold mb-1">Eligibility Criteria:</span>
                <p className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{viewingCourse.eligibility}</p>
              </div>

              {viewingCourse.description && (
                <div>
                  <span className="text-gray-500 block font-bold mb-1">Course Curriculum Overview:</span>
                  <p className="text-gray-700 leading-relaxed font-sans">{viewingCourse.description}</p>
                </div>
              )}

              <div>
                <span className="text-gray-500 block font-bold mb-1.5">Corporate Industry Partners:</span>
                <div className="flex flex-wrap gap-1.5">
                  {viewingCourse.partnerCompanies.map((comp) => (
                    <span key={comp} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#0B5D3B] font-semibold border border-emerald-200">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-5 py-2 bg-[#0B5D3B] text-white font-bold rounded-xl cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
