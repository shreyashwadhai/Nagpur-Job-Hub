import React from 'react';
import { Icon } from '@iconify/react';

export const AIInsightsCard: React.FC = () => {
  const insights = [
    {
      title: 'MIHAN SEZ Cloud Acceleration',
      text: 'MIHAN SEZ recorded a 45% Year on year increase in datacenter capacity allocations, driving high demand for Snowflake, PySpark, and AWS cloud security engineers.',
      tag: 'Tech Growth'
    },
    {
      title: 'Defence Precision Hub Expansion',
      text: 'Defence & Aerospace manufacturing in Hingna and Butibori expanded workforce by 24.1%, driven by export orders for DRAL Rafale parts and Solar Industries munitions.',
      tag: 'Defence Export'
    },
    {
      title: 'EV Component Localization',
      text: 'Maharashtra EV Policy 2.0 has incentivized 8 new battery pack & 3W powertrain assembly suppliers along the Samruddhi Expressway corridor.',
      tag: 'Clean Energy'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0B5D3B] to-[#087F5B] text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F28C28] flex items-center justify-center text-white">
            <Icon icon="solar:stars-minimalistic-bold" className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-lg font-display">AI Key Executive Insights</h3>
            <p className="text-[11px] text-gray-200">Real-time data observations generated from Nagpur ecosystem telemetry</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-tech font-bold uppercase tracking-wider">
          LIVE MODEL V2.4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#F28C28] text-white mb-2 inline-block">
              {item.tag}
            </span>
            <h4 className="font-bold text-sm text-white mb-1">{item.title}</h4>
            <p className="text-xs text-gray-200 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
