import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CompanyAnalytics: React.FC = () => {
  const viewsData = [
    { day: 'Mon', views: 320, applies: 45 },
    { day: 'Tue', views: 450, applies: 62 },
    { day: 'Wed', views: 520, applies: 80 },
    { day: 'Thu', views: 610, applies: 95 },
    { day: 'Fri', views: 580, applies: 75 },
    { day: 'Sat', views: 340, applies: 38 },
    { day: 'Sun', views: 290, applies: 25 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-display">Candidate Engagement Analytics</h1>
        <p className="text-xs text-gray-500 mt-1">Profile views and application click-through rates.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-[#1F2937]">Weekly Profile Views vs Applications</h3>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="views" name="Profile Views" stroke="#0B5D3B" fill="#0B5D3B" fillOpacity={0.2} strokeWidth={3} />
              <Area type="monotone" dataKey="applies" name="Job Applications" stroke="#F28C28" fill="#F28C28" fillOpacity={0.3} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
