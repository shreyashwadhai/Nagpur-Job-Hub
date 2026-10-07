import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useToast } from "../../context/ToastContext";

export const InstituteProfile: React.FC = () => {
  const { showToast } = useToast();

  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80"
  );

  const [instituteData, setInstituteData] = useState({
    name: "Visvesvaraya National Institute of Technology (VNIT Nagpur)",
    shortName: "VNIT Nagpur",
    type: "Tier-1 Technical Institute of National Importance",
    location: "South Ambazari Road, Bajaj Nagar, Nagpur - 440010",
    establishedYear: 1960,
    studentCount: 4850,
    facultyCount: 320,
    mouCount: 14,
    website: "https://vnit.ac.in",
    contactEmail: "placements@vnit.ac.in",
    phone: "+91 712 280 1361",
    overview:
      "VNIT Nagpur is an Institute of National Importance established in 1960. It offers 11 undergraduate and 30 postgraduate programs across Engineering, Technology, Architecture, and Applied Sciences with state-of-the-art research labs and active industry MoUs across Vidarbha.",
    keyPrograms: [
      "B.Tech Computer Science & Engineering",
      "B.Tech Electronics & Communication",
      "B.Tech Mechanical Engineering",
      "M.Tech Data Science & AI",
      "Ph.D Defence & Aerospace Composites"
    ],
    mouPartners: [
      "Persistent Systems",
      "InfoCepts Technologies",
      "Dassault Reliance Aerospace (DRAL)",
      "Solar Industries India",
      "TCS Innovation Labs"
    ]
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...instituteData });
  const [partnerInputText, setPartnerInputText] = useState("");

  const handleAddPartnerChip = (textToAdd: string) => {
    const trimmed = textToAdd.trim().replace(/,/g, "");
    if (trimmed && !editForm.mouPartners.includes(trimmed)) {
      setEditForm((prev) => {
        const updated = [...prev.mouPartners, trimmed];
        return {
          ...prev,
          mouPartners: updated,
          mouCount: updated.length,
        };
      });
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
    setEditForm((prev) => {
      const updated = prev.mouPartners.filter((p) => p !== partnerToRemove);
      return {
        ...prev,
        mouPartners: updated,
        mouCount: updated.length,
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size must be less than 5MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
          showToast("Institute campus image updated successfully!", "success");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerInputText.trim()) {
      handleAddPartnerChip(partnerInputText);
      setPartnerInputText("");
    }
    setInstituteData({ ...editForm });
    showToast("Institute profile details saved successfully!", "success");
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded inline-block mb-1">
            Academic Profile Management
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Institute Profile & Campus Identity
          </h1>
          <p className="text-xs text-gray-500">
            Manage your institute's public identity, campus photos, courses, MoUs and placement stats.
          </p>
        </div>

        <button
          onClick={() => {
            setEditForm({ ...instituteData });
            setIsEditModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="solar:pen-bold" className="w-4 h-4" />
          <span>Edit Institute Profile</span>
        </button>
      </div>

      {/* CAMPUS IMAGE & PROFILE CARD */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden space-y-6 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Image Upload Box */}
          <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={imageUrl}
              alt={instituteData.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
              <Icon icon="solar:camera-add-bold" className="w-8 h-8 mb-2 text-emerald-300" />
              <p className="text-xs font-bold text-center">Click to Upload New Campus Image</p>
              <span className="text-[10px] text-gray-200 mt-0.5">JPG, PNG, WebP up to 5MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-[#0B5D3B] shadow-xs">
              Campus Photo
            </div>
          </div>

          {/* Institute Basic Info */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#F28C28] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                {instituteData.type}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] font-display mt-2 leading-tight">
                {instituteData.name}
              </h2>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Icon icon="solar:map-point-bold" className="w-4 h-4 text-[#F28C28]" />
                <span>{instituteData.location}</span>
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200/80 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Est. Year</span>
                <span className="font-bold text-gray-800">{instituteData.establishedYear}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Students</span>
                <span className="font-bold text-[#0B5D3B]">{instituteData.studentCount.toLocaleString()}+</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Faculty</span>
                <span className="font-bold text-gray-800">{instituteData.facultyCount}+</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Active MoUs</span>
                <span className="font-bold text-[#F28C28]">{instituteData.mouCount} Companies</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600 pt-1 flex-wrap">
              <a
                href={instituteData.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-bold text-blue-600 hover:underline"
              >
                <Icon icon="solar:globus-bold" className="w-4 h-4 text-blue-600" />
                <span>{instituteData.website}</span>
              </a>
              <span className="flex items-center gap-1">
                <Icon icon="solar:letter-bold" className="w-4 h-4 text-[#0B5D3B]" />
                <span>{instituteData.contactEmail}</span>
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="solar:phone-bold" className="w-4 h-4 text-[#F28C28]" />
                <span>{instituteData.phone}</span>
              </span>
            </div>
          </div>
        </div>

        {/* OVERVIEW & PROGRAMS DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-gray-100 text-xs">
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-1.5">
              <Icon icon="solar:info-circle-bold" className="w-4 h-4 text-[#0B5D3B]" />
              <span>Institute Overview & Mission</span>
            </h3>
            <p className="text-gray-700 leading-relaxed font-sans">{instituteData.overview}</p>

            <div className="pt-2">
              <h4 className="font-bold text-xs text-gray-800 mb-2">Key Programs Offered:</h4>
              <div className="flex flex-wrap gap-1.5">
                {instituteData.keyPrograms.map((prog) => (
                  <span key={prog} className="px-3 py-1 rounded-xl bg-[#F5F8F6] text-[#0B5D3B] font-semibold border border-gray-200">
                    {prog}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F8F6] p-5 rounded-2xl border border-gray-200 space-y-3">
            <h3 className="font-bold text-sm text-[#1F2937] flex items-center gap-1.5">
              <Icon icon="solar:verified-check-bold" className="w-4 h-4 text-[#F28C28]" />
              <span>Industry MoU Partners</span>
            </h3>
            <p className="text-gray-500 text-[11px]">
              Active collaborative research & campus hiring partners in Nagpur.
            </p>

            <div className="space-y-1.5 pt-1">
              {instituteData.mouPartners.map((partner) => (
                <div key={partner} className="p-2.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                  <span className="font-bold text-gray-800">{partner}</span>
                  <span className="text-[10px] font-bold text-[#0B5D3B] bg-emerald-50 px-2 py-0.5 rounded">MoU Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT INSTITUTE PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-xl font-display">Edit Institute Profile</h3>
              <p className="text-xs text-emerald-100 mt-0.5">Update institute branding, details & placement stats</p>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Institute Full Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Institute Type</label>
                  <input
                    type="text"
                    required
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Established Year</label>
                  <input
                    type="number"
                    required
                    value={editForm.establishedYear}
                    onChange={(e) => setEditForm({ ...editForm, establishedYear: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Campus Address / Location</label>
                <input
                  type="text"
                  required
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Student Count</label>
                  <input
                    type="number"
                    required
                    value={editForm.studentCount}
                    onChange={(e) => setEditForm({ ...editForm, studentCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Faculty Count</label>
                  <input
                    type="number"
                    required
                    value={editForm.facultyCount}
                    onChange={(e) => setEditForm({ ...editForm, facultyCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Active MoUs</label>
                  <input
                    type="number"
                    required
                    value={editForm.mouCount}
                    onChange={(e) => setEditForm({ ...editForm, mouCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Institute Overview</label>
                <textarea
                  rows={4}
                  required
                  value={editForm.overview}
                  onChange={(e) => setEditForm({ ...editForm, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              {/* CORPORATE PARTNERS CHIP INPUT */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Corporate Partners & Industry MoUs
                </label>
                <div className="p-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus-within:border-[#0B5D3B] transition-colors">
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center mb-1.5">
                    {editForm.mouPartners.map((partner) => (
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Website URL</label>
                  <input
                    type="text"
                    required
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={editForm.contactEmail}
                    onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
