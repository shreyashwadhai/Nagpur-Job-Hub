import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useModal } from '../../context/ModalContext';

export const InstituteCourses: React.FC = () => {
  const { openModal } = useModal();
  const [_filter, _setFilter] = useState('All');

  const programs = [
    {
      id: 'p-1',
      title: 'B.Tech Data Science & AI',
      type: 'Degree Program',
      seats: 120,
      duration: '4 Years',
      partnerCompanies: ['Persistent Systems', 'InfoCepts', 'TCS'],
      status: 'Admissions Open',
    },
    {
      id: 'p-2',
      title: 'Aerostructures Manufacturing Certification',
      type: 'Certification',
      seats: 45,
      duration: '3 Months',
      partnerCompanies: ['DRAL Rafale', 'Solar Industries'],
      status: 'Active',
    },
    {
      id: 'p-3',
      title: 'EV Powertrain & Battery Assembly Internship',
      type: 'Internship Drive',
      seats: 60,
      duration: '6 Months',
      partnerCompanies: ['Mahindra Last Mile Mobility', 'Kinetic Green'],
      status: 'Applications Open',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Academic Courses & Campus Drives</h1>
          <p className="text-xs text-gray-500">Post degree courses, certifications, vocational training & corporate placement drives.</p>
        </div>
        <button
          onClick={() => openModal('post-course')}
          className="px-4 py-2.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
          <span>Add New Program / Drive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-soft hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-tech font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-1 rounded-md">
                {p.type}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {p.status}
              </span>
            </div>

            <h3 className="font-bold text-lg text-[#1F2937] leading-snug">{p.title}</h3>

            <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F8F6] p-3 rounded-xl">
              <div>
                <span className="text-gray-400 block text-[10px]">Duration</span>
                <span className="font-semibold text-gray-700">{p.duration}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Seats</span>
                <span className="font-semibold text-gray-700">{p.seats} Seats</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-gray-500 block mb-1">Corporate Partners:</span>
              <div className="flex flex-wrap gap-1">
                {p.partnerCompanies.map((c) => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 font-medium text-gray-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
