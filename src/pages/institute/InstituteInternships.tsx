import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useToast } from "../../context/ToastContext";

interface CandidateApplicant {
  id: string;
  name: string;
  email: string;
  degreeBranch: string;
  cgpa: string;
  appliedDate: string;
  skills: string[];
  status: "Pending" | "Approved" | "Rejected";
}

interface PlacementDrive {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  type: "Campus Drive" | "Summer Internship" | "Industry Co-Op" | "Apprenticeship";
  stipendOrCtc: string;
  duration: string;
  eligibility: string;
  location: string;
  status: "Active" | "Closed";
  applicants: CandidateApplicant[];
}

export const InstituteInternships: React.FC = () => {
  const { showToast } = useToast();

  const [drives, setDrives] = useState<PlacementDrive[]>([
    {
      id: "drive-1",
      title: "VNIT & Persistent Systems Campus Placement Drive 2026",
      companyName: "Persistent Systems",
      companyLogo: "https://images.unsplash.com/photo-1542744094-3a31b272c490?w=120&auto=format&fit=crop&q=80",
      type: "Campus Drive",
      stipendOrCtc: "₹9.5 - 14 LPA",
      duration: "Full-Time Placement",
      eligibility: "Final Year B.Tech CSE / IT (7.5+ CGPA)",
      location: "IT Park Parsodi, Nagpur",
      status: "Active",
      applicants: [
        {
          id: "app-101",
          name: "Saurabh Deshmukh",
          email: "saurabh.d@vnit.ac.in",
          degreeBranch: "B.Tech CSE (8.9 CGPA)",
          cgpa: "8.9",
          appliedDate: "2026-09-12",
          skills: ["React", "Java", "Data Structures"],
          status: "Pending"
        },
        {
          id: "app-102",
          name: "Ananya Joshi",
          email: "ananya.j@vnit.ac.in",
          degreeBranch: "B.Tech IT (9.2 CGPA)",
          cgpa: "9.2",
          appliedDate: "2026-09-14",
          skills: ["Python", "SQL", "Cloud AWS"],
          status: "Approved"
        },
        {
          id: "app-103",
          name: "Rohan Kulkarni",
          email: "rohan.k@vnit.ac.in",
          degreeBranch: "B.Tech ECE (7.8 CGPA)",
          cgpa: "7.8",
          appliedDate: "2026-09-15",
          skills: ["C++", "Embedded Systems"],
          status: "Pending"
        }
      ]
    },
    {
      id: "drive-2",
      title: "DRAL Aerospace Assembly & Tooling Internship",
      companyName: "Dassault Reliance Aerospace (DRAL)",
      companyLogo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&auto=format&fit=crop&q=80",
      type: "Industry Co-Op",
      stipendOrCtc: "Stipend ₹25,000 / Month",
      duration: "6 Months Co-Op",
      eligibility: "B.E. Mechanical / Aerospace / Electrical",
      location: "MIHAN SEZ, Nagpur",
      status: "Active",
      applicants: [
        {
          id: "app-201",
          name: "Pranav Patil",
          email: "pranav.p@vnit.ac.in",
          degreeBranch: "B.Tech Mechanical (8.4 CGPA)",
          cgpa: "8.4",
          appliedDate: "2026-09-10",
          skills: ["SolidWorks", "CATIA", "Aerostructures"],
          status: "Approved"
        },
        {
          id: "app-202",
          name: "Neha Wankhede",
          email: "neha.w@vnit.ac.in",
          degreeBranch: "B.Tech Electrical (8.1 CGPA)",
          cgpa: "8.1",
          appliedDate: "2026-09-11",
          skills: ["PLC Programming", "CAD"],
          status: "Pending"
        }
      ]
    },
    {
      id: "drive-3",
      title: "Mahindra Last Mile EV Powertrain Apprenticeship",
      companyName: "Mahindra EV",
      companyLogo: "https://images.unsplash.com/photo-1558441719-443b38605a85?w=120&auto=format&fit=crop&q=80",
      type: "Apprenticeship",
      stipendOrCtc: "Stipend ₹20,000 / Month",
      duration: "1 Year Apprenticeship",
      eligibility: "Diploma / B.E Mechanical & Electrical",
      location: "Hingna MIDC, Nagpur",
      status: "Active",
      applicants: [
        {
          id: "app-301",
          name: "Vikram Gaikwad",
          email: "vikram.g@vnit.ac.in",
          degreeBranch: "Diploma Electrical (8.0 CGPA)",
          cgpa: "8.0",
          appliedDate: "2026-09-08",
          skills: ["EV Battery Management", "AutoCAD"],
          status: "Pending"
        }
      ]
    }
  ]);

  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);
  const [isPostDriveModalOpen, setIsPostDriveModalOpen] = useState(false);

  const [driveForm, setDriveForm] = useState({
    title: "",
    companyName: "",
    type: "Campus Drive" as PlacementDrive["type"],
    stipendOrCtc: "₹8 - 12 LPA",
    duration: "Full-Time Placement",
    eligibility: "Final Year B.Tech CSE / IT / ECE",
    location: "MIHAN SEZ, Nagpur"
  });

  const handleApproveApplicant = (driveId: string, applicantId: string, applicantName: string) => {
    setDrives((prev) =>
      prev.map((d) => {
        if (d.id === driveId) {
          const updatedApplicants = d.applicants.map((a) =>
            a.id === applicantId ? { ...a, status: "Approved" as const } : a
          );
          return { ...d, applicants: updatedApplicants };
        }
        return d;
      })
    );

    if (selectedDrive && selectedDrive.id === driveId) {
      setSelectedDrive((prev) =>
        prev
          ? {
              ...prev,
              applicants: prev.applicants.map((a) =>
                a.id === applicantId ? { ...a, status: "Approved" as const } : a
              )
            }
          : null
      );
    }

    showToast(`Applicant "${applicantName}" APPROVED for placement drive!`, "success");
  };

  const handleRejectApplicant = (driveId: string, applicantId: string, applicantName: string) => {
    setDrives((prev) =>
      prev.map((d) => {
        if (d.id === driveId) {
          const updatedApplicants = d.applicants.map((a) =>
            a.id === applicantId ? { ...a, status: "Rejected" as const } : a
          );
          return { ...d, applicants: updatedApplicants };
        }
        return d;
      })
    );

    if (selectedDrive && selectedDrive.id === driveId) {
      setSelectedDrive((prev) =>
        prev
          ? {
              ...prev,
              applicants: prev.applicants.map((a) =>
                a.id === applicantId ? { ...a, status: "Rejected" as const } : a
              )
            }
          : null
      );
    }

    showToast(`Applicant "${applicantName}" REJECTED for placement drive.`, "error");
  };

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveForm.title.trim() || !driveForm.companyName.trim()) {
      showToast("Please fill in Drive Title and Partner Company Name.", "error");
      return;
    }

    const newDrive: PlacementDrive = {
      id: `drive-${Date.now()}`,
      title: driveForm.title,
      companyName: driveForm.companyName,
      companyLogo: "https://images.unsplash.com/photo-1542744094-3a31b272c490?w=120&auto=format&fit=crop&q=80",
      type: driveForm.type,
      stipendOrCtc: driveForm.stipendOrCtc,
      duration: driveForm.duration,
      eligibility: driveForm.eligibility,
      location: driveForm.location,
      status: "Active",
      applicants: []
    };

    setDrives((prev) => [newDrive, ...prev]);
    showToast(`Placement Drive "${newDrive.title}" published!`, "success");
    setIsPostDriveModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded inline-block mb-1">
            Placements & Co-Ops
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Internships & Campus Placement Drives
          </h1>
          <p className="text-xs text-gray-500">
            View active industry placement drives, review student applicants, and manage approvals.
          </p>
        </div>

        <button
          onClick={() => setIsPostDriveModalOpen(true)}
          className="px-4 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
          <span>Post Placement Drive</span>
        </button>
      </div>

      {/* DRIVES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drives.map((d) => (
          <div
            key={d.id}
            className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded">
                  {d.type}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0B5D3B] border border-emerald-200">
                  {d.applicants.length} Applicants
                </span>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src={d.companyLogo}
                  alt={d.companyName}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-base text-[#1F2937] leading-snug group-hover:text-[#0B5D3B] transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-xs text-[#F28C28] font-semibold">{d.companyName}</p>
                </div>
              </div>

              <div className="bg-[#F5F8F6] p-3 rounded-2xl border border-gray-200/80 space-y-1 text-xs">
                <p className="font-bold text-[#0B5D3B]">{d.stipendOrCtc}</p>
                <p className="text-gray-600">{d.duration} • {d.location}</p>
                <p className="text-gray-500 text-[11px]">Eligibility: {d.eligibility}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedDrive(d)}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Icon icon="solar:users-group-two-rounded-bold" className="w-4 h-4" />
              <span>View Applicants ({d.applicants.length})</span>
            </button>
          </div>
        ))}
      </div>

      {/* APPLICANTS LIST MODAL */}
      {selectedDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setSelectedDrive(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-white/20 uppercase tracking-wider text-emerald-100">
                {selectedDrive.companyName} Placement Drive
              </span>
              <h3 className="font-bold text-xl font-display mt-0.5">{selectedDrive.title}</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Total Applicants: {selectedDrive.applicants.length} Candidate(s)
              </p>
            </div>

            {/* Modal Body / Table */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {selectedDrive.applicants.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No applicants registered for this drive yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F8F6] text-gray-700 font-bold border-b border-[#E5E9E6]">
                      <tr>
                        <th className="px-4 py-3">Applicant Name & Email</th>
                        <th className="px-4 py-3">Degree & CGPA</th>
                        <th className="px-4 py-3">Applied Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E9E6]">
                      {selectedDrive.applicants.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3.5">
                            <p className="font-bold text-[#1F2937]">{app.name}</p>
                            <p className="text-[11px] text-blue-600">{app.email}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="font-semibold text-gray-800">{app.degreeBranch}</p>
                            <div className="flex gap-1 mt-0.5">
                              {app.skills.map((s) => (
                                <span key={s} className="text-[9px] bg-gray-100 px-1.5 py-0.2 rounded text-gray-600">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-gray-500 font-mono">
                            {app.appliedDate}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              app.status === "Approved"
                                ? "bg-emerald-100 text-[#0B5D3B] border border-emerald-300"
                                : app.status === "Rejected"
                                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                                  : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {app.status !== "Approved" && (
                                <button
                                  onClick={() => handleApproveApplicant(selectedDrive.id, app.id, app.name)}
                                  className="px-2.5 py-1 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                                >
                                  <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>
                              )}

                              {app.status !== "Rejected" && (
                                <button
                                  onClick={() => handleRejectApplicant(selectedDrive.id, app.id, app.name)}
                                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                                >
                                  <Icon icon="solar:close-circle-bold" className="w-3.5 h-3.5 text-rose-600" />
                                  <span>Reject</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedDrive(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST NEW DRIVE MODAL */}
      {isPostDriveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#E5E9E6] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
              <button
                onClick={() => setIsPostDriveModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-xl font-display">Post Placement Drive</h3>
              <p className="text-xs text-emerald-100 mt-0.5">Publish campus hiring drive for VNIT students</p>
            </div>

            <form onSubmit={handleCreateDrive} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Drive Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TCS Campus Hiring Drive 2026"
                  value={driveForm.title}
                  onChange={(e) => setDriveForm({ ...driveForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Partner Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TCS / InfoCepts / Persistent"
                  value={driveForm.companyName}
                  onChange={(e) => setDriveForm({ ...driveForm, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Type</label>
                  <select
                    value={driveForm.type}
                    onChange={(e) => setDriveForm({ ...driveForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl"
                  >
                    <option value="Campus Drive">Campus Drive</option>
                    <option value="Summer Internship">Summer Internship</option>
                    <option value="Industry Co-Op">Industry Co-Op</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">CTC / Stipend</label>
                  <input
                    type="text"
                    required
                    placeholder="₹8 - 12 LPA"
                    value={driveForm.stipendOrCtc}
                    onChange={(e) => setDriveForm({ ...driveForm, stipendOrCtc: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  required
                  placeholder="Final Year CSE/IT (7.5+ CGPA)"
                  value={driveForm.eligibility}
                  onChange={(e) => setDriveForm({ ...driveForm, eligibility: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostDriveModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Publish Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
