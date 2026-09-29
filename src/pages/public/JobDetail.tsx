import React from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { mockJobs } from "../../data/mockJobs";
import { mockCompanies } from "../../data/mockCompanies";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isJobSaved, saveJob, unsaveJob, isJobApplied } = useAuth();
  const { openModal } = useModal();
  const { showToast } = useToast();

  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];
  const company =
    mockCompanies.find((c) => c.id === job.companyId) || mockCompanies[0];
  const saved = isJobSaved(job.id);
  const applied = isJobApplied(job.id);

  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
      showToast("Opportunity removed from saved list", "info");
    } else {
      saveJob(job.id);
      showToast("Opportunity saved successfully!", "success");
    }
  };

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <Breadcrumb />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] p-6 sm:p-8 shadow-soft relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-md"
            />
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-tech uppercase bg-[#0B5D3B]/10 text-[#0B5D3B]">
                {job.workMode} Position
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans mt-1">
                {job.title}
              </h1>
              <Link
                to={`/companies/${job.companyId}`}
                className="text-sm font-semibold text-[#F28C28] hover:underline"
              >
                {job.companyName} • {job.location}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSaveToggle}
              className={`p-3 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                saved
                  ? "bg-[#F28C28] text-white border-[#F28C28]"
                  : "bg-[#F5F8F6] text-gray-700 border-gray-200 hover:text-[#F28C28]"
              }`}
            >
              <Icon
                icon={saved ? "solar:bookmark-bold" : "solar:bookmark-linear"}
                className="w-4 h-4"
              />
              <span>{saved ? "Saved" : "Save Job"}</span>
            </button>

            <button
              onClick={() => openModal("apply-job", job)}
              disabled={applied}
              className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                applied
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#0B5D3B] hover:bg-[#087F5B] text-white"
              }`}
            >
              <Icon
                icon={
                  applied ? "solar:check-circle-bold" : "solar:send-square-bold"
                }
                className="w-4 h-4"
              />
              <span>{applied ? "Application Submitted" : "Apply Now"}</span>
            </button>
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">
              Salary Band
            </span>
            <span className="font-extrabold text-[#0B5D3B] font-tech text-sm">
              {job.salaryRange}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">
              Experience Level
            </span>
            <span className="font-bold text-[#1F2937]">{job.experience}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">
              Industrial SEZ
            </span>
            <span className="font-bold text-[#1F2937]">{job.sezZone}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">
              Source Feed
            </span>
            <span className="font-bold text-[#F28C28]">{job.source}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Job Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-lg text-[#1F2937] mb-2 font-sans">
                Job Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1F2937] mb-3 font-sans">
                Key Requirements & Technical Qualifications
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="w-4 h-4 text-[#0B5D3B] mt-0.5 flex-shrink-0"
                    />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1F2937] mb-2 font-sans">
                Educational Eligibility
              </h3>
              <p className="text-xs text-gray-700 bg-[#F5F8F6] p-3 rounded-xl border border-gray-200 font-medium">
                {job.eligibility}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xs uppercase text-gray-400 mb-2">
                Required Technical Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] text-xs font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Company Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#1F2937]">
              Company Overview
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={company.logo}
                alt={company.name}
                className="w-12 h-12 rounded-xl object-cover border border-gray-100"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1F2937]">
                  {company.name}
                </h4>
                <p className="text-xs text-gray-500">{company.industry}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 line-clamp-3">
              {company.overview}
            </p>
            <Link
              to={`/companies/${company.id}`}
              className="w-full py-2 bg-[#F5F8F6] hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl block text-center transition-colors"
            >
              View Full Corporate Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
