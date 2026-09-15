import React from 'react';
import { mockNews } from '../../data/mockNews';
import { useToast } from '../../context/ToastContext';

export const AdminNews: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-display">News & Policy Moderation</h1>
        <p className="text-xs text-gray-500 mt-1">Review AI-summarized press releases and relevance scores.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-3">
        {mockNews.map((n) => (
          <div key={n.id} className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-[#1F2937]">{n.title}</h4>
              <p className="text-xs text-gray-500">Source: {n.source} • Impact: {n.nagpurImpact}</p>
            </div>
            <button
              onClick={() => showToast(`News article "${n.title}" published`, 'success')}
              className="px-3 py-1.5 bg-[#0B5D3B] text-white text-xs font-bold rounded-xl"
            >
              Publish Article
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
