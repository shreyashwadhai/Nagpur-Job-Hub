import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useModal } from "../../context/ModalContext";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 Visual Header */}
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-extrabold font-sans tracking-tight bg-gradient-to-r from-[#0B5D3B] via-[#127a50] to-[#F28C28] bg-clip-text text-transparent opacity-90 select-none">
            404
          </div>
          <div className="absolute -top-3 -right-3 p-3 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2 animate-bounce">
            <Icon
              icon="solar:ghost-bold-duotone"
              className="w-6 h-6 text-[#F28C28]"
            />
            <span className="text-xs font-bold text-gray-700 font-sans">
              NOT FOUND
            </span>
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
            Page Missing or Relocated
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
            The page or ecosystem resource you are looking for might have been
            updated, renamed, or moved within the Nagpur Hub Portal directory.
          </p>
        </div>

        {/* Quick Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, jobs, news, sectors..."
            className="w-full pl-10 pr-24 py-3 text-sm bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-[#F28C28] focus:ring-2 focus:ring-[#F28C28]/20 transition-all"
          />
          <Icon
            icon="solar:magnifer-linear"
            className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#0B5D3B] text-white text-xs font-semibold rounded-xl hover:bg-[#0B5D3B]/90 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#0B5D3B] hover:shadow-md transition-all group"
          >
            <Icon
              icon="solar:home-2-bold-duotone"
              className="w-5 h-5 text-[#0B5D3B] group-hover:scale-110 transition-transform"
            />
            <span className="text-xs font-semibold text-gray-800">
              Return Home
            </span>
          </Link>

          <Link
            to="/companies"
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#0B5D3B] hover:shadow-md transition-all group"
          >
            <Icon
              icon="solar:buildings-bold-duotone"
              className="w-5 h-5 text-[#0B5D3B] group-hover:scale-110 transition-transform"
            />
            <span className="text-xs font-semibold text-gray-800">
              Explore Companies
            </span>
          </Link>

          <Link
            to="/jobs"
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#F28C28] hover:shadow-md transition-all group"
          >
            <Icon
              icon="solar:case-round-bold-duotone"
              className="w-5 h-5 text-[#F28C28] group-hover:scale-110 transition-transform"
            />
            <span className="text-xs font-semibold text-gray-800">
              Nagpur Jobs
            </span>
          </Link>
        </div>

        {/* Ask AI Helper Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B5D3B]/5 via-emerald-500/5 to-[#F28C28]/10 border border-[#F28C28]/20 max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#0B5D3B] to-[#F28C28] text-white">
              <Icon icon="solar:bot-bold" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">
                Need help navigating?
              </p>
              <p className="text-[11px] text-gray-500">
                Ask Vitrio AI Assistant for instant direction.
              </p>
            </div>
          </div>
          <button
            onClick={() => openModal("ask-ecosystem")}
            className="px-3 py-1.5 text-xs font-bold text-[#F28C28] bg-white rounded-xl shadow-sm border border-[#F28C28]/30 hover:bg-[#F28C28] hover:text-white transition-colors flex-shrink-0"
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
};
