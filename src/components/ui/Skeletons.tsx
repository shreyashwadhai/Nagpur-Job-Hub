import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-[#E5E9E6] p-5 animate-pulse space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
        <div className="space-y-1">
          <div className="w-32 h-4 bg-gray-200 rounded" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-16 h-5 bg-gray-200 rounded-full" />
    </div>
    <div className="w-full h-12 bg-gray-100 rounded-xl" />
    <div className="flex gap-2">
      <div className="w-16 h-6 bg-gray-200 rounded" />
      <div className="w-20 h-6 bg-gray-200 rounded" />
    </div>
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="w-full bg-white rounded-2xl border border-[#E5E9E6] p-4 animate-pulse space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
        <div className="w-1/4 h-4 bg-gray-200 rounded" />
        <div className="w-1/6 h-4 bg-gray-200 rounded" />
        <div className="w-1/6 h-4 bg-gray-200 rounded" />
        <div className="w-1/12 h-6 bg-gray-200 rounded-full" />
      </div>
    ))}
  </div>
);
