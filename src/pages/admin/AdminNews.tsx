import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { mockNews } from "../../data/mockNews";
import { useToast } from "../../context/ToastContext";
import type { NewsArticle } from "../../types";

export interface PendingNewsSubmission {
  id: string;
  title: string;
  submitterType: 'Company' | 'Institute';
  submitterName: string;
  submitterLogo: string;
  category: string;
  industry: string;
  nagpurImpact: 'High' | 'Medium' | 'Low';
  date: string;
  aiSummary: string;
  content: string;
  image: string;
  source: string;
  url: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
}

const initialPendingNews: PendingNewsSubmission[] = [
  {
    id: 'pnews-301',
    title: 'CtrlS Phase-2 Tier 4 Data Center Expansion Launched in MIHAN SEZ Nagpur',
    submitterType: 'Company',
    submitterName: 'CtrlS Edge Data Center',
    submitterLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&auto=format&fit=crop&q=80',
    category: 'Infrastructure',
    industry: 'Data Centres & Cloud Infra',
    nagpurImpact: 'High',
    date: '2026-09-15',
    aiSummary: 'CtrlS initiates construction on 50MW hyperscale server farm facility creating 400 advanced cloud operations jobs in MIHAN SEZ.',
    content: 'CtrlS Edge Data Center has broken ground on its Phase-2 expansion in MIHAN SEZ Nagpur. The 50MW facility features Tier 4 fault-tolerant design and direct green energy power purchase agreements with MSEDCL.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    source: 'CtrlS Enterprise PR Desk',
    url: 'https://ctrls.in/press/nagpur-phase-2-expansion',
    status: 'Pending Approval'
  },
  {
    id: 'pnews-302',
    title: 'VNIT Solar Formula Racing Student Team Wins National EV Championship',
    submitterType: 'Institute',
    submitterName: 'Visvesvaraya National Institute of Technology (VNIT)',
    submitterLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
    category: 'Academic R&D',
    industry: 'EV & Electric Mobility',
    nagpurImpact: 'Medium',
    date: '2026-09-14',
    aiSummary: 'VNIT student engineering team developed indigenous 48V electric drivetrain tested at Hingna MIDC track, securing 1st place overall.',
    content: 'The student formula racing team from VNIT Nagpur achieved top honors at the National Electric Vehicle Competition. Their 48V custom lithium-ion battery pack and lightweight carbon chassis were fabricated in collaboration with Hingna MIDC precision manufacturers.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
    source: 'VNIT PR & Media Cell',
    url: 'https://vnit.ac.in/news/formula-ev-win-2026',
    status: 'Pending Approval'
  },
  {
    id: 'pnews-303',
    title: 'Dassault Reliance Aerospace (DRAL) Ships 100th Falcon Jet Aero-Structure Component',
    submitterType: 'Company',
    submitterName: 'Dassault Reliance Aerospace (DRAL)',
    submitterLogo: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&auto=format&fit=crop&q=80',
    category: 'Growth',
    industry: 'Defence & Aerospace',
    nagpurImpact: 'High',
    date: '2026-09-12',
    aiSummary: 'Milestone achievement for Nagpur defence manufacturing cluster as local engineers achieve 99.8% precision quality rating.',
    content: 'DRAL Nagpur facility has dispatched its 100th Falcon 2000 aero-structure component assembly to France. The facility in MIHAN SEZ now employs over 850 skilled aerospace technicians and engineers from Vidarbha.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    source: 'DRAL Aerospace Communications',
    url: 'https://dral.in/news/100th-falcon-assembly',
    status: 'Pending Approval'
  },
  {
    id: 'pnews-304',
    title: 'IIIT Nagpur Launches Industry-Sponsored Cloud & AI Hackathon with InfoCepts',
    submitterType: 'Institute',
    submitterName: 'Indian Institute of Information Technology (IIIT Nagpur)',
    submitterLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&auto=format&fit=crop&q=80',
    category: 'Talent',
    industry: 'IT & Software Services',
    nagpurImpact: 'Medium',
    date: '2026-09-10',
    aiSummary: 'Annual hackathon invites 500+ engineering students to solve Vidarbha civic-tech and logistics telemetry challenges with ₹5 Lakh prize pool.',
    content: 'IIIT Nagpur in partnership with InfoCepts Technologies has announced the 2026 Vidarbha AI Hackathon. Participating student teams will build predictive analytics tools using real-time open data feeds.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    source: 'IIITN Placement Cell',
    url: 'https://iiitn.ac.in/events/ai-hackathon-2026',
    status: 'Pending Approval'
  }
];

export const AdminNews: React.FC = () => {
  const { showToast } = useToast();
  const [publishedNews, setPublishedNews] = useState<NewsArticle[]>(mockNews);
  const [pendingNews, setPendingNews] = useState<PendingNewsSubmission[]>(initialPendingNews);
  const [activeTab, setActiveTab] = useState<'pending' | 'published'>('pending');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<PendingNewsSubmission | NewsArticle | null>(null);

  // Manual Add Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Growth' | 'Talent' | 'Infrastructure' | 'Policy' | 'Investment' | 'CSR'>('Growth');
  const [newIndustry, setNewIndustry] = useState('IT & Software Services');
  const [newImpact, setNewImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSource, setNewSource] = useState('Nagpur Governance Press Desk');
  const [newUrl, setNewUrl] = useState('https://nagpurecosystem.org/news');
  const [_imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80');

  // Handle image file selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      showToast(`Image "${file.name}" selected for upload`, 'info');
    }
  };

  // Submit Manual News from Admin
  const handleCreateNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) {
      showToast('Please fill in required fields (Title & Summary)', 'error');
      return;
    }

    const createdArticle: NewsArticle = {
      id: `news-admin-${Date.now()}`,
      title: newTitle,
      aiSummary: newSummary,
      source: newSource,
      url: newUrl,
      date: new Date().toISOString().split('T')[0],
      industry: newIndustry,
      relevanceScore: 95,
      nagpurImpact: newImpact,
      theme: newCategory,
      content: newContent || newSummary,
      image: imagePreviewUrl
    };

    setPublishedNews([createdArticle, ...publishedNews]);
    showToast(`News article "${newTitle}" created and published live!`, 'success');

    // Reset Form
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setImageFile(null);
    setIsAddModalOpen(false);
  };

  // Approve Pending Submission from Company / Institute
  const handleApprovePending = (item: PendingNewsSubmission) => {
    const approvedArticle: NewsArticle = {
      id: `news-approved-${Date.now()}`,
      title: item.title,
      aiSummary: item.aiSummary,
      source: `${item.submitterName} (${item.submitterType})`,
      url: item.url,
      date: item.date,
      companyName: item.submitterName,
      industry: item.industry,
      relevanceScore: 92,
      nagpurImpact: item.nagpurImpact,
      theme: (item.category as any) || 'Growth',
      content: item.content,
      image: item.image
    };

    setPublishedNews([approvedArticle, ...publishedNews]);
    setPendingNews(pendingNews.filter((p) => p.id !== item.id));
    setPreviewArticle(null);
    showToast(`Submission from "${item.submitterName}" APPROVED and published live!`, 'success');
  };

  // Reject Pending Submission
  const handleRejectPending = (id: string, name: string) => {
    setPendingNews(pendingNews.filter((p) => p.id !== id));
    setPreviewArticle(null);
    showToast(`Submission from "${name}" REJECTED.`, 'error');
  };

  // Filtered lists
  const filteredPublished = publishedNews.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.source.toLowerCase().includes(search.toLowerCase()) ||
      n.industry.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || n.theme === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredPending = pendingNews.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.submitterName.toLowerCase().includes(search.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-1 rounded-md block w-fit mb-1 border border-[#F28C28]/20">
            Platform Media Governance
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
            News & Press Release Moderation Center
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Approve news submitted by Companies & Institutes, post custom press releases with images, and manage public feeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Icon icon="solar:add-circle-bold" className="w-4 h-4 text-[#FFD166]" />
            <span>Create & Publish News Article</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Pending Approvals vs Published Articles) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-[#F28C28] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
            <span>Pending Submissions ({pendingNews.length})</span>
            {pendingNews.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'published'
                ? 'bg-[#0B5D3B] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
            <span>Live Published News ({publishedNews.length})</span>
          </button>
        </div>

        {/* Search & Theme Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Icon icon="solar:magnifer-linear" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news by title or submitter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#F5F8F6] border border-gray-200 rounded-xl font-semibold text-gray-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Growth">Growth</option>
            <option value="Talent">Talent</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Policy">Policy</option>
            <option value="Investment">Investment</option>
            <option value="Academic R&D">Academic R&D</option>
          </select>
        </div>
      </div>

      {/* TAB CONTENT 1: PENDING SUBMISSIONS FOR APPROVAL */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {filteredPending.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center space-y-2">
              <Icon icon="solar:check-read-bold" className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-[#1F2937]">No Pending News Submissions</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                All submitted press releases from Companies and Institutes have been reviewed and published.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPending.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-[#F28C28] transition-colors"
                >
                  <div className="space-y-3">
                    {/* Submitter Entity Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.submitterLogo}
                          alt={item.submitterName}
                          className="w-9 h-9 rounded-xl object-cover border border-gray-200 bg-white"
                        />
                        <div>
                          <span className="font-bold text-xs text-[#1F2937] block leading-tight">
                            {item.submitterName}
                          </span>
                          <span className="text-[10px] text-gray-500 font-medium">
                            Submitted {item.date} • {item.industry}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.submitterType === 'Company'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {item.submitterType} Submission
                      </span>
                    </div>

                    {/* Article Image & Details */}
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-20 rounded-xl object-cover shrink-0 border border-gray-200 shadow-2xs"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#0B5D3B] uppercase tracking-wider">
                          {item.category} • Impact: {item.nagpurImpact}
                        </span>
                        <h4 className="font-bold text-xs text-[#1F2937] leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                          {item.aiSummary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewArticle(item)}
                      className="text-xs font-bold text-gray-600 hover:text-[#0B5D3B] flex items-center gap-1 cursor-pointer"
                    >
                      <Icon icon="solar:eye-bold" className="w-4 h-4" />
                      <span>Preview Full Article</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectPending(item.id, item.submitterName)}
                        className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprovePending(item)}
                        className="px-3 py-1.5 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-[#FFD166]" />
                        <span>Approve & Publish</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: LIVE PUBLISHED ARTICLES */}
      {activeTab === 'published' && (
        <div className="bg-white rounded-3xl border border-[#E5E9E6] shadow-sm overflow-hidden space-y-4 p-4">
          <div className="space-y-3">
            {filteredPublished.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 hover:border-[#0B5D3B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {n.image && (
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-20 h-16 rounded-xl object-cover shrink-0 border border-gray-200 shadow-2xs"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                        {n.theme}
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">
                        Published {n.date}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        • Source: {n.source}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#1F2937] leading-tight">{n.title}</h4>
                    <p className="text-xs text-gray-600 max-w-2xl line-clamp-1">{n.aiSummary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setPreviewArticle(n as any)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all cursor-pointer"
                    title="View Full Published Article"
                  >
                    <Icon icon="solar:eye-bold" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setPublishedNews(publishedNews.filter((art) => art.id !== n.id));
                      showToast(`Article "${n.title}" removed from feed`, 'info');
                    }}
                    className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Unpublish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE & PUBLISH NEWS MANUALLY FROM ADMIN */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#F28C28] text-white p-6 relative">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                </button>

                <h3 className="font-extrabold text-xl font-display text-white">
                  Create & Publish News Article
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Publish an official press release, policy update, or civic news item with image.
                </p>
              </div>

              {/* Modal Form Content */}
              <form onSubmit={handleCreateNewsSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Article Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MIHAN SEZ Expands 50MW Solar Data Center Grid..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B] text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Theme / Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="Growth">Growth</option>
                      <option value="Talent">Talent</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Policy">Policy</option>
                      <option value="Investment">Investment</option>
                      <option value="CSR">CSR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Industry Sector</label>
                    <input
                      type="text"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nagpur Impact Level</label>
                    <select
                      value={newImpact}
                      onChange={(e) => setNewImpact(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    >
                      <option value="High">High Impact</option>
                      <option value="Medium">Medium Impact</option>
                      <option value="Low">Low Impact</option>
                    </select>
                  </div>
                </div>

                {/* IMAGE UPLOAD SECTION */}
                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-3">
                  <label className="block font-bold text-xs uppercase tracking-wider text-[#0B5D3B] flex items-center gap-1.5">
                    <Icon icon="solar:gallery-bold" className="w-4 h-4 text-[#F28C28]" />
                    Featured News Image Upload
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-36 h-24 rounded-xl overflow-hidden border-2 border-gray-300 bg-gray-100 shrink-0 shadow-xs">
                      <img
                        src={imagePreviewUrl}
                        alt="News Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2 w-full">
                      <div>
                        <span className="text-[11px] text-gray-600 font-semibold block mb-1">
                          Upload image file from device:
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0B5D3B] file:text-white hover:file:bg-[#07472d] cursor-pointer"
                        />
                      </div>

                      <div className="pt-1 border-t border-gray-200">
                        <span className="text-[10px] text-gray-400 block mb-0.5">Or paste image URL directly:</span>
                        <input
                          type="text"
                          value={imagePreviewUrl}
                          onChange={(e) => setImagePreviewUrl(e.target.value)}
                          className="w-full px-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    AI Teaser / Short Summary <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief 2-sentence summary for headline cards..."
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Article Body Text</label>
                  <textarea
                    rows={4}
                    placeholder="Complete news press release content..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Source Name</label>
                    <input
                      type="text"
                      value={newSource}
                      onChange={(e) => setNewSource(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Source URL</label>
                    <input
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Publish News Article Live
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: PREVIEW ARTICLE DETAILS */}
      <AnimatePresence>
        {previewArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E9E6] overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="relative">
                <img
                  src={previewArticle.image}
                  alt={previewArticle.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-between">
                  <button
                    onClick={() => setPreviewArticle(null)}
                    className="self-end p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                  >
                    <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                  </button>

                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 bg-[#F28C28] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                      {(previewArticle as any).category || (previewArticle as any).theme}
                    </span>
                    <h3 className="font-extrabold text-lg text-white font-display leading-tight">
                      {previewArticle.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                <div className="flex items-center justify-between text-gray-500 border-b border-gray-100 pb-2">
                  <span>Source: {(previewArticle as any).submitterName || previewArticle.source}</span>
                  <span>Date: {previewArticle.date}</span>
                </div>

                <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-gray-200 space-y-1">
                  <h4 className="font-bold text-xs text-[#0B5D3B]">AI Summary</h4>
                  <p className="text-gray-700 font-medium">{previewArticle.aiSummary}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-gray-800">Article Content</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {previewArticle.content}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <a
                  href={previewArticle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Icon icon="solar:link-bold" className="w-4 h-4" />
                  <span>Open External Source Link</span>
                </a>

                <div className="flex gap-2">
                  {'submitterName' in previewArticle && (
                    <>
                      <button
                        onClick={() => handleRejectPending(previewArticle.id, (previewArticle as any).submitterName)}
                        className="px-3 py-1.5 bg-rose-100 text-rose-800 font-bold rounded-xl hover:bg-rose-200"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprovePending(previewArticle as PendingNewsSubmission)}
                        className="px-4 py-1.5 bg-[#0B5D3B] text-white font-bold rounded-xl hover:bg-[#07472d]"
                      >
                        Approve & Publish
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setPreviewArticle(null)}
                    className="px-4 py-1.5 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
