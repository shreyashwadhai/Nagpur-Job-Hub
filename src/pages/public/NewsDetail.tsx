import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { mockNews } from '../../data/mockNews';
import { mockCompanies } from '../../data/mockCompanies';
import { ImpactBadge } from '../../components/ui/Badges';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = mockNews.find((n) => n.id === id) || mockNews[0];
  const company = mockCompanies.find((c) => c.id === news.companyId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <Breadcrumb />

      <div className="bg-white rounded-3xl border border-[#E5E9E6] p-6 sm:p-10 shadow-soft space-y-6">
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <ImpactBadge impact={news.nagpurImpact} />
            <span className="text-xs font-semibold text-gray-400">{news.date}</span>
            <span className="text-xs font-bold text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded">
              {news.industry}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1F2937] font-display leading-tight">
            {news.title}
          </h1>

          <p className="text-xs text-gray-500 font-medium">
            Source: <a href={news.url} target="_blank" rel="noreferrer" className="text-[#F28C28] hover:underline font-bold">{news.source}</a>
          </p>
        </div>

        {/* AI Key Takeaways Card */}
        <div className="bg-gradient-to-r from-[#0B5D3B]/10 to-[#F28C28]/10 p-5 rounded-2xl border border-[#0B5D3B]/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B5D3B]">
            <Icon icon="solar:stars-minimalistic-bold" className="w-4 h-4 text-[#F28C28]" />
            <span>AI Executive Summary & Policy Takeaways</span>
          </div>
          <p className="text-xs text-gray-800 leading-relaxed font-medium">
            {news.aiSummary}
          </p>
        </div>

        {news.image && (
          <div className="rounded-2xl overflow-hidden shadow-md max-h-96">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed font-sans whitespace-pre-line space-y-4">
          {news.content}
        </div>

        {/* Entity Mention Links */}
        {company && (
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between bg-[#F5F8F6] p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400">Featured Enterprise</span>
                <h4 className="font-bold text-sm text-[#1F2937]">{company.name}</h4>
              </div>
            </div>
            <Link
              to={`/companies/${company.id}`}
              className="px-3.5 py-1.5 rounded-xl bg-[#0B5D3B] hover:bg-[#087F5B] text-white text-xs font-bold transition-colors"
            >
              View Profile
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
