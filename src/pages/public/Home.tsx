import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { mockCompanies } from '../../data/mockCompanies';
import { mockJobs } from '../../data/mockJobs';
import { mockNews } from '../../data/mockNews';
import { mockIndustries } from '../../data/mockIndustries';
import { CompanyCard, IndustryCard, JobCard, KPICard, NewsCard } from '../../components/ui/Cards';
import { MapboxMap } from '../../components/map/MapboxMap';
import { AIInsightsCard } from '../../components/ai/AIInsightsCard';
import { useModal } from '../../context/ModalContext';
import { StatCounter } from '../../components/ui/StatCounter';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F5F8F6] to-transparent pt-8 pb-12 rounded-b-3xl border-b border-[#E5E9E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F28C28]/10 text-[#F28C28] border border-[#F28C28]/30 text-xs font-semibold">
                <Icon icon="solar:stars-minimalistic-bold" className="w-4 h-4 text-[#F28C28]" />
                <span>Nagpur Civic-Tech & Enterprise Intelligence Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] font-display tracking-tight leading-[1.15]">
                Discover Nagpur’s <br />
                <span className="text-[#F28C28] bg-gradient-to-r from-[#F28C28] to-[#FF9F43] bg-clip-text text-transparent">
                  Industrial Ecosystem
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl font-sans">
                Explore companies, career opportunities, industry intelligence, MIHAN SEZ footprint, and economic growth across Nagpur.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/companies"
                  className="px-6 py-3.5 rounded-2xl bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#F28C28]/25 hover:scale-[1.02] transition-all"
                >
                  <Icon icon="solar:buildings-bold" className="w-5 h-5" />
                  <span>Explore Companies</span>
                </Link>

                <Link
                  to="/insights"
                  className="px-6 py-3.5 rounded-2xl bg-[#0B5D3B] hover:bg-[#087F5B] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#0B5D3B]/20 hover:scale-[1.02] transition-all"
                >
                  <Icon icon="solar:chart-2-bold" className="w-5 h-5 text-[#FF9F43]" />
                  <span>View Industry Insights</span>
                </Link>

                <button
                onClick={()=> navigate("/jobs")}
                  className="px-4 py-3.5 rounded-2xl bg-white hover:bg-gray-50 border border-[#E5E9E6] text-gray-800 text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Icon icon="fluent:briefcase-search-24-filled" className="w-5 h-5 text-[#F28C28]" />
                  <span>Quick Apply</span>
                </button>
              </div>

              {/* Quick Search Suggestions */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 flex-wrap">
                <span className="font-semibold text-gray-700">Popular Zones:</span>
                <button onClick={() => navigate('/companies?sez=MIHAN+SEZ')} className="hover:text-[#F28C28] underline">MIHAN SEZ</button>
                <span>•</span>
                <button onClick={() => navigate('/companies?sez=Hingna+MIDC')} className="hover:text-[#F28C28] underline">Hingna MIDC</button>
                <span>•</span>
                <button onClick={() => navigate('/companies?sez=Butibori+Industrial+Area')} className="hover:text-[#F28C28] underline">Butibori</button>
                <span>•</span>
                <button onClick={() => navigate('/companies?sez=IT+Park+Parsodi')} className="hover:text-[#F28C28] underline">IT Park Parsodi</button>
              </div>

            </div>

            {/* Hero Map Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <MapboxMap companies={mockCompanies} height="380px" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 text-[11px] font-bold text-[#0B5D3B] flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#0B5D3B] animate-ping" />
                  <span>Live Telemetry Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KPI STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <KPICard title="Tech & Industrial Firms" value="820+" change="+14.2%" icon="solar:buildings-bold-duotone" />
          <KPICard title="Estimated Employment" value="112,500" change="+18.5%" icon="solar:users-group-two-rounded-bold-duotone" />
          <KPICard title="Active Jobs" value="3,690" change="+22.0%" icon="solar:case-round-bold-duotone" />
          <KPICard title="New Companies (2025)" value="64" change="+32%" icon="solar:add-circle-bold-duotone" />
          <KPICard title="Hiring Growth Momentum" value="+24.8%" change="Strong" icon="solar:graph-up-bold-duotone" />
        </div>
      </section>

      {/* AI EXECUTIVE INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIInsightsCard />
      </section>

      {/* GROWING COMPANIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-tech font-bold uppercase text-[#F28C28]">Curated Directory</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-display">Fastest Growing Nagpur Companies</h2>
          </div>
          <Link to="/companies" className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1">
            <span>View All <StatCounter value="820+" /> Companies</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompanies.slice(0, 6).map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      </section>

      {/* LATEST CAREER OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-tech font-bold uppercase text-[#0B5D3B]">Talent & Recruitment</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-display">Latest Opportunities in Nagpur</h2>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-[#F28C28] hover:underline flex items-center gap-1">
            <span>Explore All <StatCounter value="3,690" /> Jobs</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.slice(0, 6).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </section>

      {/* KEY SECTOR DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-tech font-bold uppercase text-[#F28C28]">Sector Clusters</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-display">Nagpur Industrial Sectors</h2>
          </div>
          <Link to="/industries" className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1">
            <span>View All Sectors</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIndustries.slice(0, 6).map((ind) => (
            <IndustryCard key={ind.id} industry={ind} />
          ))}
        </div>
      </section>

      {/* NAGPUR INDUSTRY NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-tech font-bold uppercase text-[#0B5D3B]">Intelligence & News</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-display">Nagpur Industrial News & Policy</h2>
          </div>
          <Link to="/news" className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1">
            <span>View All News</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.slice(0, 3).map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <span className="text-xs font-tech font-bold uppercase px-3 py-1 rounded bg-[#F28C28] text-white">
              Civic Enterprise Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Are you operating an industrial facility in Nagpur?
            </h2>
            <p className="text-sm text-gray-200 max-w-xl">
              Claim your official corporate profile, verify domain authorization, post job openings, and gain exposure across Nagpur’s digital source of truth.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 z-10 w-full sm:w-auto">
            <button
              onClick={() => openModal('claim-company')}
              className="px-6 py-3.5 rounded-2xl bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold text-sm transition-all shadow-lg text-center"
            >
              Claim Company Profile
            </button>
            <button
              onClick={() => openModal('submit-update')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all text-center"
            >
              Submit Update
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
