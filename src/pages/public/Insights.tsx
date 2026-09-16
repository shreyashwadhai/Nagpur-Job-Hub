import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { AIInsightsCard } from '../../components/ai/AIInsightsCard';
import { useModal } from '../../context/ModalContext';

export const Insights: React.FC = () => {
  const { openModal } = useModal();
  const [timeRange, setTimeRange] = useState('2021-2026');

  const yearlyAdditionsData = [
    { year: '2021', companies: 38, jobs: 920 },
    { year: '2022', companies: 45, jobs: 1250 },
    { year: '2023', companies: 52, jobs: 1800 },
    { year: '2024', companies: 58, jobs: 2400 },
    { year: '2025', companies: 64, jobs: 3100 },
    { year: '2026 (YTD)', companies: 72, jobs: 3690 }
  ];

  const mihanVsNonMihanData = [
    { area: 'MIHAN SEZ', companies: 180, jobs: 1450, workforce: 38500 },
    { area: 'Hingna MIDC', companies: 240, jobs: 890, workforce: 28000 },
    { area: 'Butibori MIDC', companies: 210, jobs: 750, workforce: 29500 },
    { area: 'IT Park Parsodi', companies: 95, jobs: 420, workforce: 12500 },
    { area: 'Kalmeshwar', companies: 95, jobs: 180, workforce: 4000 }
  ];

  const industryMixData = [
    { name: 'IT & Software', value: 240, color: '#0B5D3B' },
    { name: 'Manufacturing', value: 310, color: '#F28C28' },
    { name: 'Logistics', value: 115, color: '#FF9F43' },
    { name: 'Agri-Tech', value: 62, color: '#087F5B' },
    { name: 'Defence & Aero', value: 48, color: '#1F2937' },
    { name: 'EV Mobility', value: 35, color: '#8B5CF6' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <PageHeader
        title="Nagpur Analytics & Market Intelligence"
        subtitle="Empirical data telemetry tracking company formation, hiring momentum, SEZ expansion, and skill trends across Vidarbha."
        badge="Enterprise Intelligence Hub"
        actions={
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#E5E9E6] rounded-xl focus:outline-none focus:border-[#F28C28]"
            >
              <option value="2021-2026">2021 - 2026 Horizon</option>
              <option value="2025-2026">Recent 12 Months</option>
            </select>
            <button
              onClick={() => openModal('export-insights')}
              className="px-4 py-2 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Icon icon="solar:download-square-bold" className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        }
      />

      {/* AI KEY INSIGHTS */}
      <AIInsightsCard />

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Company Additions & Job Growth */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#1F2937] font-display">Year-wise Company & Hiring Trajectory</h3>
              <p className="text-xs text-gray-500">Growth momentum across Nagpur industrial nodes</p>
            </div>
            <span className="text-xs font-bold text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-1 rounded-md font-tech">+24.8% Year on year</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyAdditionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="companies" name="New Companies" fill="#F28C28" radius={[6, 6, 0, 0]} />
                <Bar dataKey="jobs" name="Open Positions" fill="#0B5D3B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: MIHAN vs Non-MIHAN Zone Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#1F2937] font-display">SEZ & MIDC Zone Comparison</h3>
              <p className="text-xs text-gray-500">Distribution of companies across Nagpur industrial zones</p>
            </div>
            <span className="text-xs font-bold text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-1 rounded-md font-tech">MIHAN Leading</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mihanVsNonMihanData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="area" type="category" stroke="#94a3b8" fontSize={11} width={110} />
                <Tooltip />
                <Bar dataKey="workforce" name="Workforce Strength" fill="#0B5D3B" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Sector Breakdown Pie */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#1F2937] font-display">Industry Mix Composition</h3>
              <p className="text-xs text-gray-500">Percentage distribution of 820+ registered entities</p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {industryMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Hiring Momentum Line */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#1F2937] font-display">Monthly Hiring Momentum (2025-2026)</h3>
              <p className="text-xs text-gray-500">Active postings aggregated by source scrapers</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyAdditionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" stroke="#F28C28" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
