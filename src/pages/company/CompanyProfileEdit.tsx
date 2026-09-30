import React, { useState } from "react";
import { mockCompanies } from "../../data/mockCompanies";
import { useToast } from "../../context/ToastContext";
import { Icon } from "@iconify/react";

export const CompanyProfileEdit: React.FC = () => {
  const company = mockCompanies[0];
  const { showToast } = useToast();

  const [logoUrl, setLogoUrl] = useState(company.logo);
  const [formData, setFormData] = useState({
    name: company.name,
    overview: company.overview,
    businessFocus: company.businessFocus,
    website: company.website,
    contactEmail: company.contactEmail,
    phone: company.phone,
    employeeBand: company.employeeBand,
    sezZone: company.sezZone,
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size must be less than 5MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setLogoUrl(reader.result as string);
          showToast("New company logo uploaded successfully!", "success");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      "Company profile details and logo updated successfully!",
      "success",
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded">
            Enterprise Settings
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans mt-0.5">
            Edit Company Profile
          </h1>
          <p className="text-xs text-gray-500">
            Update your corporate branding, logo, and facility details shown in
            the Nagpur Directory.
          </p>
        </div>
        <a
          href={`/companies/${company.id}`}
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-2 bg-[#F5F8F6] hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors"
        >
          <span>Preview Public Profile</span>
          <Icon
            icon="solar:square-share-line-bold"
            className="w-4 h-4 text-gray-500"
          />
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* LOGO & BRANDING SECTION */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
            <Icon
              icon="solar:gallery-bold"
              className="w-5 h-5 text-[#0B5D3B]"
            />
            <span>Company Brand Logo</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#F5F8F6] rounded-2xl border border-gray-200">
            <div className="relative group">
              <img
                src={logoUrl}
                alt={formData.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-[#0B5D3B]/20 bg-white"
              />
              <label className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold">
                <Icon icon="solar:camera-add-bold" className="w-6 h-6 mb-1" />
                <span>Change Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2 text-center sm:text-left min-w-0 flex-1">
              <h4 className="font-bold text-sm text-[#1F2937]">
                Upload New Corporate Logo
              </h4>
              <p className="text-xs text-gray-500">
                Recommended resolution: 400x400px. Supports PNG, JPG, WebP up to
                5MB.
              </p>

              <div className="flex items-center gap-3 justify-center sm:justify-start pt-1">
                <label className="px-4 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5">
                  <Icon icon="solar:upload-track-bold" className="w-4 h-4" />
                  <span>Upload Logo Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>

                {logoUrl !== company.logo && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoUrl(company.logo);
                      showToast("Logo reset to default.", "info");
                    }}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
            <Icon
              icon="solar:buildings-bold"
              className="w-5 h-5 text-[#0B5D3B]"
            />
            <span>Corporate Operational Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Company Entity Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Industrial SEZ Zone
              </label>
              <select
                value={formData.sezZone}
                onChange={(e) =>
                  setFormData({ ...formData, sezZone: e.target.value as any })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              >
                <option value="MIHAN SEZ">MIHAN SEZ</option>
                <option value="Hingna MIDC">Hingna MIDC</option>
                <option value="Butibori Industrial Area">
                  Butibori Industrial Area
                </option>
                <option value="IT Park Parsodi">IT Park Parsodi</option>
                <option value="Kalmeshwar">Kalmeshwar MIDC</option>
                <option value="Central Nagpur">Central Nagpur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Core Business Focus
            </label>
            <input
              type="text"
              required
              value={formData.businessFocus}
              onChange={(e) =>
                setFormData({ ...formData, businessFocus: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Corporate Overview & Facility Description *
            </label>
            <textarea
              rows={4}
              required
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Website URL
              </label>
              <input
                type="text"
                required
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Icon
                icon="solar:check-circle-bold"
                className="w-4 h-4 text-white"
              />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
