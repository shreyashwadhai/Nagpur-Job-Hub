import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { mockJobs } from '../../data/mockJobs';
import { JobCard } from '../../components/ui/Cards';
import { PageHeader } from '../../components/common/PageHeader';
import { useModal } from '../../context/ModalContext';

export const Jobs: React.FC = () => {
  const { openModal } = useModal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSez, setSelectedSez] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [fresherOnly, setFresherOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesQuery =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSez = selectedSez === 'All' || job.sezZone === selectedSez;
      const matchesMode = selectedMode === 'All' || job.workMode === selectedMode;
      const matchesFresher = !fresherOnly || job.isFresherFriendly;

      return matchesQuery && matchesSez && matchesMode && matchesFresher;
    });
  }, [searchQuery, selectedSez, selectedMode, fresherOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <PageHeader
        title="Nagpur Career Opportunities"
        subtitle="Explore high-growth tech engineering, aerospace design, EV calibration, and operations jobs across Nagpur."
        badge="Career Discovery Engine"
        actions={
          <button
            onClick={() => openModal('ask-ecosystem')}
            className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Icon icon="solar:stars-minimalistic-bold" className="w-4 h-4" />
            <span>Ask AI Job Match</span>
          </button>
        }
      />

      {/* FILTER BAR */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5E9E6] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search title, skills (e.g. React, PySpark, CATIA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
            <Icon icon="solar:magnifer-linear" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            <select
              value={selectedSez}
              onChange={(e) => setSelectedSez(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              <option value="All">All Locations & SEZs</option>
              <option value="MIHAN SEZ">MIHAN SEZ</option>
              <option value="IT Park Parsodi">IT Park Parsodi</option>
              <option value="Hingna MIDC">Hingna MIDC</option>
              <option value="Butibori Industrial Area">Butibori Industrial Area</option>
            </select>

            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              <option value="All">All Work Modes</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-[#F5F8F6] px-3 py-2 rounded-xl border border-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={fresherOnly}
                onChange={(e) => setFresherOnly(e.target.checked)}
                className="rounded text-[#0B5D3B] focus:ring-[#0B5D3B]"
              />
              <span>Fresher Friendly</span>
            </label>
          </div>
        </div>
      </div>

      {/* JOBS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600 font-medium">
            Showing <span className="font-bold text-[#1F2937]">{filteredJobs.length}</span> open positions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </div>

      {/* CAREER INSIGHTS SECTION */}
      <div className="bg-gradient-to-r from-[#0B5D3B] to-[#087F5B] text-white p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-bold text-xl font-display">Nagpur Career Insights</h3>
            <p className="text-xs text-gray-200">Real-time skill demand & hiring momentum analysis</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-tech font-bold">LIVE TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#FF9F43] uppercase font-tech">Top Hiring Skill</span>
            <h4 className="font-extrabold text-lg text-white">Snowflake & PySpark</h4>
            <p className="text-xs text-gray-200">Data engineering demand up 52% YoY in MIHAN SEZ campus hubs.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#FF9F43] uppercase font-tech">Fresher Retention</span>
            <h4 className="font-extrabold text-lg text-white">VNIT / IIITN Campus MoUs</h4>
            <p className="text-xs text-gray-200">Persistent Systems & InfoCepts absorb 400+ graduates annually in Parsodi.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#FF9F43] uppercase font-tech">Defence Aerospace</span>
            <h4 className="font-extrabold text-lg text-white">CATIA V6 & Aerostructures</h4>
            <p className="text-xs text-gray-200">DRAL and Solar Industries expanding precision metal recruitment.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
