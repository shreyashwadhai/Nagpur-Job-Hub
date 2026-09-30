import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useToast } from "../../context/ToastContext";

interface InstituteNewsArticle {
  id: string;
  title: string;
  theme: "Growth" | "Talent" | "Infrastructure" | "Policy" | "Investment" | "CSR";
  summary: string;
  content: string;
  submittedDate: string;
  adminStatus: "Pending Review" | "Approved" | "Declined";
  isActive: boolean;
}

export const InstituteNews: React.FC = () => {
  const { showToast } = useToast();

  const [articles, setArticles] = useState<InstituteNewsArticle[]>([
    {
      id: "news-101",
      title: "VNIT Solar Formula Racing Student Team Wins National EV Mobility Challenge 2026",
      theme: "Talent",
      summary: "Student team engineered indigenous 48V electric drivetrain tested at Hingna MIDC track.",
      content: "Student engineers at VNIT Nagpur designed and assembled a high-performance EV drivetrain, securing 1st place in the National Green Energy Mobility Challenge.",
      submittedDate: "2026-09-10",
      adminStatus: "Approved",
      isActive: true
    },
    {
      id: "news-102",
      title: "VNIT Signs MoU with Dassault Reliance Aerospace for Defence Composites R&D",
      theme: "Policy",
      summary: "Joint research lab established at MIHAN SEZ for aerospace carbon fiber testing.",
      content: "Visvesvaraya National Institute of Technology signed a strategic MoU with DRAL to launch a joint defense research laboratory focused on aviation composites.",
      submittedDate: "2026-09-14",
      adminStatus: "Approved",
      isActive: true
    },
    {
      id: "news-103",
      title: "VNIT Campus Placement Drive Reaches Record 86% Offer Rate in Q3",
      theme: "Growth",
      summary: "Over 890 students placed across IT, Aerospace and EV manufacturing companies.",
      content: "The 2026 campus placement drive recorded over 890 offers from top hiring partners including InfoCepts, Persistent Systems, TCS, and DRAL.",
      submittedDate: "2026-09-28",
      adminStatus: "Pending Review",
      isActive: false
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    theme: "Talent" as InstituteNewsArticle["theme"],
    summary: "",
    content: "",
    imageUrl: ""
  });

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.summary.trim()) {
      showToast("Please fill in Title and News Summary.", "error");
      return;
    }

    const newArticle: InstituteNewsArticle = {
      id: `news-${Date.now()}`,
      title: formData.title,
      theme: formData.theme,
      summary: formData.summary,
      content: formData.content || formData.summary,
      submittedDate: new Date().toISOString().split("T")[0],
      adminStatus: "Pending Review",
      isActive: false
    };

    setArticles((prev) => [newArticle, ...prev]);
    showToast(`News article "${newArticle.title}" submitted to Admin Review Queue!`, "success");

    setFormData({
      title: "",
      theme: "Talent",
      summary: "",
      content: "",
      imageUrl: ""
    });
  };

  const handleToggleActive = (id: string, currentStatus: boolean, adminStatus: string) => {
    if (adminStatus !== "Approved") {
      showToast("Article must be APPROVED by Admin before setting to Active.", "error");
      return;
    }

    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextActive = !currentStatus;
          showToast(
            `Article "${art.title}" is now ${nextActive ? "ACTIVE (Visible in Public Feed)" : "INACTIVE"}`,
            "info"
          );
          return { ...art, isActive: nextActive };
        }
        return art;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0B5D3B] bg-[#0B5D3B]/10 px-2.5 py-0.5 rounded inline-block mb-1">
            Media & News Moderation
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Submit Institute News & Press Releases
          </h1>
          <p className="text-xs text-gray-500">
            Upload campus news articles into Admin Review Queue & toggle active visibility for approved stories.
          </p>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT: SUBMIT FORM (Left) & NEWS QUEUE TABLE (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SUBMIT NEWS FORM */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
            <Icon icon="solar:document-add-bold" className="w-5 h-5 text-[#0B5D3B]" />
            <span>Post New Article to Admin Queue</span>
          </h3>

          <form onSubmit={handleSubmitNews} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Article Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. VNIT Signs MoU with Persistent Systems for AI Lab"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">News Theme / Tag</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              >
                <option value="Talent">Talent & Student Success</option>
                <option value="Growth">Growth & Placement Record</option>
                <option value="Infrastructure">Infrastructure & Labs</option>
                <option value="Policy">Policy & Campus MoUs</option>
                <option value="Investment">Investment & R&D Grants</option>
                <option value="CSR">CSR & Social Impact</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">AI Executive Summary *</label>
              <textarea
                rows={2}
                required
                placeholder="Brief 2-line summary of the news story..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Full Article Content</label>
              <textarea
                rows={4}
                placeholder="Detailed press release content and announcement details..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Icon icon="solar:upload-track-bold" className="w-4 h-4" />
              <span>Submit to Admin Review Queue</span>
            </button>
          </form>
        </div>

        {/* SUBMITTED NEWS QUEUE & ACTIVE TOGGLE LIST */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon icon="solar:document-text-bold" className="w-5 h-5 text-[#F28C28]" />
              <span>Submitted News Queue & Active Status</span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B5D3B]">
              {articles.length} Articles
            </span>
          </div>

          <div className="space-y-3">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-200 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0B5D3B] bg-[#0B5D3B]/10 px-2 py-0.5 rounded">
                      {art.theme}
                    </span>
                    <h4 className="font-bold text-sm text-[#1F2937] mt-1 leading-snug">
                      {art.title}
                    </h4>
                  </div>

                  {/* Admin Approval Status Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                    art.adminStatus === "Approved"
                      ? "bg-emerald-100 text-[#0B5D3B] border border-emerald-300"
                      : art.adminStatus === "Declined"
                        ? "bg-rose-100 text-rose-800 border border-rose-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}>
                    {art.adminStatus}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed font-sans">{art.summary}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200/70">
                  <span className="text-[11px] font-mono text-gray-400">
                    Submitted: {art.submittedDate}
                  </span>

                  {/* Active / Inactive Toggle Switch */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold ${art.isActive ? "text-[#0B5D3B]" : "text-gray-400"}`}>
                      {art.isActive ? "Active (Public)" : "Inactive"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(art.id, art.isActive, art.adminStatus)}
                      disabled={art.adminStatus !== "Approved"}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        art.isActive ? "bg-[#0B5D3B]" : "bg-gray-300"
                      } ${art.adminStatus !== "Approved" ? "opacity-50 cursor-not-allowed" : ""}`}
                      role="switch"
                      aria-checked={art.isActive}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          art.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
