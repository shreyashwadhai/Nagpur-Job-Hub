import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { KPICard } from '../../components/ui/Cards';
import { useModal } from '../../context/ModalContext';

export const InstituteDashboard: React.FC = () => {
  const { openModal } = useModal();
  const [courses, setCourses] = useState([
    {
      id: 'c-1',
      title: 'Post-Graduate Program in Cloud Data Engineering',
      category: 'Certification',
      duration: '6 Months',
      eligibility: 'B.E./B.Tech/B.Sc IT',
      feesOrStipend: '₹45,000',
      postedDate: '2026-02-15',
      status: 'Active',
      enrolled: 42,
    },
    {
      id: 'c-2',
      title: 'VNIT & Persistent Systems Campus Placement Drive 2026',
      category: 'Internship Drive',
      duration: '1 Year Internship',
      eligibility: 'Final Year CSE/IT',
      feesOrStipend: 'Stipend ₹25,000/mo',
      postedDate: '2026-03-01',
      status: 'Active',
      enrolled: 180,
    },
    {
      id: 'c-3',
      title: 'EV Powertrain & Battery Tech Vocational Workshop',
      category: 'Skill Workshop',
      duration: '4 Weeks',
      eligibility: 'Diploma / BE Mechanical & Electrical',
      feesOrStipend: 'Free (Govt Subsidized)',
      postedDate: '2026-01-20',
      status: 'Active',
      enrolled: 95,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div>
          <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-1 rounded-md inline-block mb-1">
            Institute Portal
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">VNIT & Technical Academia Hub</h1>
          <p className="text-xs text-gray-500">Manage degree programs, vocational skills, internships, and corporate MoUs across Nagpur.</p>
        </div>
        <button
          onClick={() => openModal('post-course')}
          className="px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#087F5B] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4 text-[#FF9F43]" />
          <span>Post Course / Campus Drive</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Programs & Drives" value={courses.length} icon="solar:ruler-cross-pen-bold-duotone" />
        <KPICard title="Registered Students" value="1,420" change="+18%" icon="solar:users-group-two-rounded-bold-duotone" />
        <KPICard title="Corporate MoUs" value="14" change="Verified" icon="solar:verified-check-bold-duotone" />
        <KPICard title="Placed Graduates" value="86.4%" change="+4.2%" icon="solar:graph-up-bold-duotone" />
      </div>

      {/* Posted Programs & Internships Table */}
      <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E9E6] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#1F2937]">Posted Academic Programs & Campus Placement Drives</h3>
            <p className="text-xs text-gray-500">Visible to students, job seekers, and hiring enterprises across Nagpur ecosystem.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B]">
            {courses.length} Active Listings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8F6] text-gray-600 font-semibold border-b border-[#E5E9E6]">
              <tr>
                <th className="px-6 py-3.5">Title & Category</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Eligibility</th>
                <th className="px-6 py-3.5">Fee / Stipend</th>
                <th className="px-6 py-3.5">Applicants</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9E6]">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#1F2937] text-sm">{c.title}</p>
                    <span className="text-[10px] font-tech font-bold uppercase text-[#F28C28]">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{c.duration}</td>
                  <td className="px-6 py-4 text-gray-600">{c.eligibility}</td>
                  <td className="px-6 py-4 font-bold text-[#0B5D3B]">{c.feesOrStipend}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0B5D3B]/10 text-[#0B5D3B]">
                      {c.enrolled} Enrolled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg text-gray-500 hover:text-[#0B5D3B] hover:bg-gray-100">
                        <Icon icon="solar:pen-bold" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCourses(courses.filter((item) => item.id !== c.id))}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
