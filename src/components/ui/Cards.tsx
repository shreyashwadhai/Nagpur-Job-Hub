import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import type { Company, Industry, Job, NewsArticle } from '../../types';
import { ImpactBadge, VerificationBadge } from './Badges';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';

export const KPICard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: string;
  accentColor?: string;
}> = ({ title, value, change, isPositive = true, icon }) => (
  <div className="bg-white p-5 rounded-2xl border border-[#E5E9E6] shadow-soft hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-tech mt-1">
          {value}
        </h3>
        {change && (
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
            <span
              className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                isPositive ? 'bg-[#0B5D3B]/10 text-[#0B5D3B]' : 'bg-red-500/10 text-red-600'
              }`}
            >
              <Icon icon={isPositive ? 'solar:graph-up-bold' : 'solar:graph-down-bold'} className="w-3.5 h-3.5" />
              {change}
            </span>
            <span className="text-gray-400 font-normal">vs last period</span>
          </div>
        )}
      </div>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5F8F6] to-gray-100 flex items-center justify-center text-[#F28C28] group-hover:scale-110 transition-transform shadow-inner">
        <Icon icon={icon} className="w-6 h-6" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F28C28] to-[#0B5D3B]" />
  </div>
);

export const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
  const { openModal } = useModal();

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E6] p-5 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <Link
                to={`/companies/${company.id}`}
                className="font-bold text-base text-[#1F2937] hover:text-[#0B5D3B] transition-colors line-clamp-1"
              >
                {company.name}
              </Link>
              <p className="text-xs text-gray-500 font-medium">{company.industry}</p>
            </div>
          </div>
          <VerificationBadge status={company.verificationStatus} />
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
          {company.overview}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F8F6] p-3 rounded-xl mb-4 border border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-700">
            <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4 text-[#F28C28]" />
            <span className="truncate">{company.sezZone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700">
            <Icon icon="solar:users-group-two-rounded-bold-duotone" className="w-4 h-4 text-[#0B5D3B]" />
            <span>{company.employeeBand}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {company.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <button
          onClick={() => openModal('claim-company', company)}
          className="text-[11px] font-semibold text-[#F28C28] hover:text-[#FF9F43] flex items-center gap-1 transition-colors"
        >
          <Icon icon="solar:shield-check-bold" className="w-3.5 h-3.5" />
          Claim Entity
        </button>

        <Link
          to={`/companies/${company.id}`}
          className="px-3.5 py-1.5 rounded-xl bg-[#0B5D3B] hover:bg-[#087F5B] text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
        >
          <span>View Profile</span>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const { isJobSaved, saveJob, unsaveJob } = useAuth();
  const { openModal } = useModal();
  const { showToast } = useToast();
  const saved = isJobSaved(job.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsaveJob(job.id);
      showToast('Job removed from saved items', 'info');
    } else {
      saveJob(job.id);
      showToast('Job saved successfully!', 'success');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E6] p-5 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-10 h-10 rounded-xl object-cover border border-gray-100"
            />
            <div>
              <Link
                to={`/jobs/${job.id}`}
                className="font-bold text-base text-[#1F2937] hover:text-[#F28C28] transition-colors line-clamp-1"
              >
                {job.title}
              </Link>
              <Link to={`/companies/${job.companyId}`} className="text-xs text-[#0B5D3B] font-semibold hover:underline">
                {job.companyName}
              </Link>
            </div>
          </div>
          <button
            onClick={handleSave}
            aria-label={saved ? "Unsave opportunity" : "Save opportunity"}
            className={`p-2 rounded-xl border transition-colors ${
              saved
                ? 'bg-[#F28C28] text-white border-[#F28C28]'
                : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-[#F28C28] hover:border-[#F28C28]'
            }`}
          >
            <Icon icon={saved ? 'solar:bookmark-bold' : 'solar:bookmark-linear'} className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
          <span className="flex items-center gap-1 bg-[#F5F8F6] px-2.5 py-1 rounded-lg border border-gray-200/60">
            <Icon icon="solar:map-point-bold" className="w-3.5 h-3.5 text-[#F28C28]" />
            {job.sezZone}
          </span>
          <span className="flex items-center gap-1 bg-[#F5F8F6] px-2.5 py-1 rounded-lg border border-gray-200/60">
            <Icon icon="solar:case-minimalistic-bold" className="w-3.5 h-3.5 text-[#0B5D3B]" />
            {job.experience}
          </span>
          <span className="flex items-center gap-1 bg-[#F5F8F6] px-2.5 py-1 rounded-lg border border-gray-200/60 font-semibold text-[#0B5D3B]">
            {job.salaryRange}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
              {skill}
            </span>
          ))}
          {job.isFresherFriendly && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B5D3B]/10 text-[#0B5D3B] border border-[#0B5D3B]/20">
              Fresher Friendly
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
        <span className="text-gray-400 text-[11px]">Posted {job.postedDate}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('apply-job', job)}
            className="px-3.5 py-1.5 rounded-xl bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold transition-all shadow-sm"
          >
            Quick Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export const NewsCard: React.FC<{ news: NewsArticle }> = ({ news }) => (
  <div className="bg-white rounded-2xl border border-[#E5E9E6] p-5 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
    <div>
      {news.image && (
        <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <ImpactBadge impact={news.nagpurImpact} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-2">
        <span className="font-semibold text-[#0B5D3B]">{news.industry}</span>
        <span>{news.date}</span>
      </div>

      <Link
        to={`/news/${news.id}`}
        className="font-bold text-base text-[#1F2937] hover:text-[#F28C28] transition-colors line-clamp-2 leading-snug mb-3"
      >
        {news.title}
      </Link>

      <div className="bg-[#F5F8F6] p-3 rounded-xl border border-gray-200/70 mb-4">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700 mb-1">
          <Icon icon="solar:stars-minimalistic-bold" className="w-3.5 h-3.5" />
          <span>AI Executive Summary</span>
        </div>
        <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
          {news.aiSummary}
        </p>
      </div>
    </div>

    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
      <span className="text-gray-500 font-medium">Source: {news.source}</span>
      <Link
        to={`/news/${news.id}`}
        className="text-[#0B5D3B] font-bold hover:underline flex items-center gap-1"
      >
        Read Full Story
        <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
      </Link>
    </div>
  </div>
);

export const IndustryCard: React.FC<{ industry: Industry }> = ({ industry }) => (
  <Link
    to={`/industries/${industry.id}`}
    className="bg-white rounded-2xl border border-[#E5E9E6] p-6 shadow-soft hover:shadow-xl hover:border-[#F28C28] transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F28C28] group-hover:text-white transition-all shadow-sm">
        <Icon icon={industry.icon} className="w-6 h-6" />
      </div>
      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0B5D3B]/10 text-[#0B5D3B]">
        {industry.growthRate}
      </span>
    </div>

    <h3 className="font-bold text-lg text-[#1F2937] group-hover:text-[#F28C28] transition-colors mb-2">
      {industry.name}
    </h3>
    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
      {industry.description}
    </p>

    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 text-center text-xs">
      <div>
        <span className="block font-bold text-[#1F2937] font-tech">{industry.totalCompanies}</span>
        <span className="text-[10px] text-gray-400">Companies</span>
      </div>
      <div>
        <span className="block font-bold text-[#0B5D3B] font-tech">{industry.totalJobs}</span>
        <span className="text-[10px] text-gray-400">Open Jobs</span>
      </div>
      <div>
        <span className="block font-bold text-[#F28C28] font-tech">{(industry.totalEmployment / 1000).toFixed(1)}k</span>
        <span className="text-[10px] text-gray-400">Workforce</span>
      </div>
    </div>
  </Link>
);
