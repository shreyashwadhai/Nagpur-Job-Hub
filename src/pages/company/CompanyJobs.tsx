import React, { useState } from "react";
import { mockJobs } from "../../data/mockJobs";
import { mockCompanies } from "../../data/mockCompanies";
import { useToast } from "../../context/ToastContext";
import { Icon } from "@iconify/react";
import type { Job, WorkMode } from "../../types";

export const CompanyJobs: React.FC = () => {
  const company = mockCompanies[0];
  const { showToast } = useToast();

  const [jobsList, setJobsList] = useState<Job[]>(() =>
    mockJobs.filter((j) => j.companyId === company.id)
  );

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [jobFormData, setJobFormData] = useState({
    title: "",
    experience: "3 - 5 Years",
    workMode: "On-site" as WorkMode,
    salaryRange: "₹8 - 14 LPA",
    sezZone: company.sezZone || "MIHAN SEZ",
    skills: "React, Node.js, PostgreSQL",
    description: "",
    requirements: "Degree in Computer Science, 3+ years experience with React and Node.js.",
    eligibility: "B.E / B.Tech / M.Tech in CS/IT",
    isFresherFriendly: false,
    status: "Active" as "Active" | "Closed"
  });

  const handleOpenPostModal = () => {
    setEditingJob(null);
    setJobFormData({
      title: "",
      experience: "3 - 5 Years",
      workMode: "On-site",
      salaryRange: "₹8 - 14 LPA",
      sezZone: company.sezZone || "MIHAN SEZ",
      skills: "React, Node.js, PostgreSQL",
      description: "We are hiring for a key engineering position at our facility in MIHAN SEZ Nagpur.",
      requirements: "Degree in CS/IT, strong software design principles.",
      eligibility: "B.E / B.Tech / MCA",
      isFresherFriendly: false,
      status: "Active"
    });
    setIsPostModalOpen(true);
  };

  const handleOpenEditModal = (job: Job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      experience: job.experience,
      workMode: job.workMode,
      salaryRange: job.salaryRange,
      sezZone: job.sezZone,
      skills: job.skills.join(", "),
      description: job.description,
      requirements: job.requirements.join("\n"),
      eligibility: job.eligibility,
      isFresherFriendly: job.isFresherFriendly,
      status: job.status
    });
    setIsPostModalOpen(true);
  };

  const handleToggleStatus = (jobId: string) => {
    setJobsList((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const newStatus = j.status === "Active" ? "Closed" : "Active";
          showToast(`Job "${j.title}" is now ${newStatus === "Active" ? "ACTIVE" : "INACTIVE / CLOSED"}`, "info");
          return { ...j, status: newStatus };
        }
        return j;
      })
    );
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      showToast("Please enter Job Title.", "error");
      return;
    }

    const skillsArray = jobFormData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const reqsArray = jobFormData.requirements
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    if (editingJob) {
      setJobsList((prev) =>
        prev.map((j) =>
          j.id === editingJob.id
            ? {
                ...j,
                title: jobFormData.title,
                experience: jobFormData.experience,
                workMode: jobFormData.workMode,
                salaryRange: jobFormData.salaryRange,
                sezZone: jobFormData.sezZone,
                skills: skillsArray,
                description: jobFormData.description,
                requirements: reqsArray,
                eligibility: jobFormData.eligibility,
                isFresherFriendly: jobFormData.isFresherFriendly,
                status: jobFormData.status
              }
            : j
        )
      );
      showToast(`Job listing "${jobFormData.title}" updated successfully!`, "success");
    } else {
      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: jobFormData.title,
        companyId: company.id,
        companyName: company.name,
        companyLogo: company.logo,
        location: company.location,
        sezZone: jobFormData.sezZone,
        experience: jobFormData.experience,
        workMode: jobFormData.workMode,
        skills: skillsArray,
        source: "Direct Company Listing",
        postedDate: new Date().toISOString().split("T")[0],
        salaryRange: jobFormData.salaryRange,
        description: jobFormData.description,
        requirements: reqsArray,
        eligibility: jobFormData.eligibility,
        isFresherFriendly: jobFormData.isFresherFriendly,
        status: jobFormData.status
      };
      setJobsList((prev) => [newJob, ...prev]);
      showToast(`New Job Listing "${newJob.title}" posted successfully!`, "success");
    }

    setIsPostModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            Manage Job Listings ({jobsList.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Post and moderate active engineering & tech positions in {company.sezZone}.
          </p>
        </div>
        <button
          onClick={handleOpenPostModal}
          className="px-4 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* Job Listings Cards */}
      <div className="space-y-4">
        {jobsList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E5E9E6] text-gray-500 text-xs">
            No job listings found. Click "Post New Opportunity" above to create your first listing.
          </div>
        ) : (
          jobsList.map((j) => (
            <div
              key={j.id}
              className={`bg-white p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
                j.status === "Active" ? "border-[#E5E9E6]" : "border-gray-200 bg-gray-50/60 opacity-80"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-base text-[#1F2937]">{j.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    j.status === "Active"
                      ? "bg-emerald-100 text-[#0B5D3B]"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {j.status}
                  </span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                    {j.workMode}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {j.salaryRange} • {j.experience} • {j.sezZone} • Posted {j.postedDate}
                </p>
                <div className="flex gap-1.5 pt-1 flex-wrap">
                  {j.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-[#F5F8F6] px-2 py-0.5 rounded text-gray-700 font-semibold border border-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Toggle & Edit Action */}
              <div className="flex items-center gap-4 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                {/* Active / Inactive Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">
                    {j.status === "Active" ? "Active" : "Inactive"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(j.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      j.status === "Active" ? "bg-[#0B5D3B]" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={j.status === "Active"}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        j.status === "Active" ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEditModal(j)}
                  className="p-2 text-gray-600 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 bg-[#F5F8F6] border border-gray-200 rounded-xl transition-colors cursor-pointer"
                  title="Edit Job Opportunity"
                >
                  <Icon icon="solar:pen-bold" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* JOB POSTING & EDIT MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-xl font-display">
                {editingJob ? `Edit Job: ${editingJob.title}` : "Post New Job Opportunity"}
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                {editingJob ? "Update job listing details" : "Publish job posting to Nagpur Job Seekers Feed"}
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveJob} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Data Engineer / Full Stack React Developer"
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Experience Requirement</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 - 5 Years"
                    value={jobFormData.experience}
                    onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Work Mode</label>
                  <select
                    value={jobFormData.workMode}
                    onChange={(e) => setJobFormData({ ...jobFormData, workMode: e.target.value as WorkMode })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹8 - 14 LPA"
                    value={jobFormData.salaryRange}
                    onChange={(e) => setJobFormData({ ...jobFormData, salaryRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">SEZ Zone / Location</label>
                  <select
                    value={jobFormData.sezZone}
                    onChange={(e) => setJobFormData({ ...jobFormData, sezZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                  >
                    <option value="MIHAN SEZ">MIHAN SEZ</option>
                    <option value="Hingna MIDC">Hingna MIDC</option>
                    <option value="Butibori Industrial Area">Butibori Industrial Area</option>
                    <option value="IT Park Parsodi">IT Park Parsodi</option>
                    <option value="Kalmeshwar">Kalmeshwar MIDC</option>
                    <option value="Central Nagpur">Central Nagpur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Required Skills (Comma Separated)</label>
                <input
                  type="text"
                  required
                  placeholder="React, Node.js, Python, PostgreSQL"
                  value={jobFormData.skills}
                  onChange={(e) => setJobFormData({ ...jobFormData, skills: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  placeholder="Overview of the job role and responsibilities..."
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Requirements (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="Bachelor degree in CS/IT&#10;3+ years experience&#10;Strong SQL knowledge"
                  value={jobFormData.requirements}
                  onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={jobFormData.isFresherFriendly}
                    onChange={(e) => setJobFormData({ ...jobFormData, isFresherFriendly: e.target.checked })}
                    className="rounded border-gray-300 text-[#0B5D3B] focus:ring-[#0B5D3B]"
                  />
                  <span>Fresher Friendly Position</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">Status:</span>
                  <select
                    value={jobFormData.status}
                    onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value as any })}
                    className="px-2.5 py-1 bg-[#F5F8F6] border border-gray-200 rounded-lg text-xs font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed / Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-white" />
                  <span>{editingJob ? "Save Changes" : "Publish Job Posting"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
