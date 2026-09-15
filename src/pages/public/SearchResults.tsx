import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockCompanies } from '../../data/mockCompanies';
import { mockJobs } from '../../data/mockJobs';
import { mockNews } from '../../data/mockNews';
import { mockIndustries } from '../../data/mockIndustries';
import { CompanyCard, JobCard, NewsCard } from '../../components/ui/Cards';
import { PageHeader } from '../../components/common/PageHeader';
import { Icon } from '@iconify/react';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'all' | 'companies' | 'jobs' | 'news' | 'industries'>('all');

  const matchedCompanies = useMemo(() => {
    return mockCompanies.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.industry.toLowerCase().includes(query.toLowerCase()) ||
        c.sezZone.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const matchedJobs = useMemo(() => {
    return mockJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.companyName.toLowerCase().includes(query.toLowerCase()) ||
        j.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const matchedNews = useMemo(() => {
    return mockNews.filter(
      (n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.aiSummary.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const matchedIndustries = useMemo(() => {
    return mockIndustries.filter(
      (ind) =>
        ind.name.toLowerCase().includes(query.toLowerCase()) ||
        ind.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalResults = matchedCompanies.length + matchedJobs.length + matchedNews.length + matchedIndustries.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <PageHeader
        title={`Search Results for "${query}"`}
        subtitle={`Found ${totalResults} matching entities across Nagpur Industrial Ecosystem telemetry.`}
        badge="Global Search"
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E9E6] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all' ? 'bg-[#0B5D3B] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Results ({totalResults})
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'companies' ? 'bg-[#0B5D3B] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Companies ({matchedCompanies.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jobs' ? 'bg-[#0B5D3B] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Jobs ({matchedJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'news' ? 'bg-[#0B5D3B] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          News ({matchedNews.length})
        </button>
      </div>

      {/* Results Content */}
      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'companies') && matchedCompanies.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#1F2937]">Matched Companies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedCompanies.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'jobs') && matchedJobs.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#1F2937]">Matched Openings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'news') && matchedNews.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#1F2937]">Matched News Coverage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedNews.map((n) => (
                <NewsCard key={n.id} news={n} />
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 space-y-2">
            <Icon icon="solar:magnifer-bug-bold" className="w-12 h-12 text-[#F28C28] mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">No Matching Results</h3>
            <p className="text-xs text-gray-500">Try searching for keywords like "InfoCepts", "MIHAN", "React", or "Defence".</p>
          </div>
        )}
      </div>
    </div>
  );
};
