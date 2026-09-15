import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { mockCompanies } from '../../data/mockCompanies';
import { mockJobs } from '../../data/mockJobs';
import { CompanyCard, JobCard } from '../ui/Cards';
import { Modal } from '../ui/Modal';
import { useModal } from '../../context/ModalContext';

export const AskEcosystemDrawer: React.FC = () => {
  const { modalType, isOpen, closeModal } = useModal();
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    text: string;
    matchedCompanies: typeof mockCompanies;
    matchedJobs: typeof mockJobs;
  } | null>(null);

  const samplePrompts = [
    "Which companies are hiring React developers in Nagpur?",
    "Show defence aerospace contractors in Hingna MIDC",
    "What are top EV component manufacturers in Butibori?",
    "List IT firms in MIHAN SEZ with over 1,000 employees"
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      const q = searchQuery.toLowerCase();
      let matchedComp = mockCompanies.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.sezZone.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
      let matchedJ = mockJobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.sezZone.toLowerCase().includes(q)
      );

      // Fallback fallback matched items for rich output
      if (matchedComp.length === 0) matchedComp = mockCompanies.slice(0, 2);
      if (matchedJ.length === 0) matchedJ = mockJobs.slice(0, 2);

      setAiResponse({
        text: `Analysis complete for query "${searchQuery}". Found ${matchedComp.length} matched enterprise entities and ${matchedJ.length} active opportunities in Nagpur's industrial telemetry graph.`,
        matchedCompanies: matchedComp,
        matchedJobs: matchedJ
      });
      setIsThinking(false);
    }, 800);
  };

  if (modalType !== 'ask-ecosystem') return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Ask Ecosystem AI Assistant"
      subtitle="Conversational Intelligence powered by Nagpur Industrial Telemetry"
      size="xl"
    >
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ask anything (e.g. Who is hiring React developers in MIHAN SEZ?)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && query.trim() && handleSearch(query)}
            className="w-full pl-11 pr-24 py-3 bg-[#F5F8F6] border-2 border-[#F28C28]/40 focus:border-[#F28C28] rounded-2xl text-sm focus:outline-none focus:bg-white transition-all text-[#1F2937]"
          />
          <Icon icon="solar:stars-minimalistic-bold" className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F28C28]" />
          <button
            onClick={() => query.trim() && handleSearch(query)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Query
          </button>
        </div>

        {/* Sample Prompts */}
        {!aiResponse && !isThinking && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Suggested Intelligence Queries:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSearch(prompt)}
                  className="text-left text-xs p-3 rounded-xl bg-gray-50 hover:bg-[#0B5D3B]/10 hover:text-[#0B5D3B] border border-gray-200 transition-colors flex items-start gap-2"
                >
                  <Icon icon="solar:round-alt-arrow-right-bold" className="w-4 h-4 text-[#F28C28] mt-0.5 flex-shrink-0" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F28C28]/20 text-[#F28C28] flex items-center justify-center mx-auto animate-bounce">
              <Icon icon="solar:stars-minimalistic-bold" className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Synthesizing Nagpur Industrial Data Layer...</p>
          </div>
        )}

        {/* AI Output */}
        {aiResponse && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B5D3B]/10 via-[#F28C28]/10 to-transparent border border-[#0B5D3B]/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B5D3B] mb-1">
                <Icon icon="solar:check-read-bold" className="w-4 h-4" />
                <span>AI Structured Response</span>
              </div>
              <p className="text-xs text-gray-800 leading-relaxed font-medium">{aiResponse.text}</p>
            </div>

            {/* Matched Companies */}
            {aiResponse.matchedCompanies.length > 0 && (
              <div>
                <h4 className="font-bold text-sm text-[#1F2937] mb-3 flex items-center gap-2">
                  <Icon icon="solar:buildings-bold" className="w-4 h-4 text-[#0B5D3B]" />
                  <span>Matched Enterprise Entities</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiResponse.matchedCompanies.map((c) => (
                    <CompanyCard key={c.id} company={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Matched Jobs */}
            {aiResponse.matchedJobs.length > 0 && (
              <div>
                <h4 className="font-bold text-sm text-[#1F2937] mb-3 flex items-center gap-2">
                  <Icon icon="solar:case-bold" className="w-4 h-4 text-[#F28C28]" />
                  <span>Matched Open Jobs</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiResponse.matchedJobs.map((j) => (
                    <JobCard key={j.id} job={j} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
