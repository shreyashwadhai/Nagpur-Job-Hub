import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useModal } from '../../context/ModalContext';

export const FloatingAIAgent: React.FC = () => {
  const { openModal, isOpen, modalType } = useModal();
  const [_isHovered, setIsHovered] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Show a friendly pop-up greeting bubble after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const isModalOpen = isOpen && modalType === 'ask-ecosystem';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Pop-up AI Greeting / Helper Tooltip */}
      {showGreeting && !isModalOpen && (
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-white/95 backdrop-blur-md border border-[#F28C28]/30 rounded-2xl shadow-xl shadow-[#F28C28]/15 animate-in fade-in slide-in-from-right-4 duration-500 max-w-xs relative group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(false);
            }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs flex items-center justify-center transition-colors shadow-sm"
            title="Dismiss"
          >
            &times;
          </button>
          
          <div className="w-2.5 h-2.5 rounded-full bg-[#F28C28] animate-ping flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#1F2937] leading-tight">
              Nagpur AI Assistant
            </p>
            <p className="text-[11px] text-gray-500 leading-tight">
              Looking for jobs, companies or insights? Ask me!
            </p>
          </div>
        </div>
      )}

      {/* Floating Animated AI Agent Button */}
      <button
        onClick={() => openModal('ask-ecosystem')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Ask AI Assistant"
        className={`relative group flex items-center justify-center p-1 rounded-full transition-all duration-300 focus:outline-none ${
          isModalOpen ? 'scale-95 ring-4 ring-[#F28C28]/40' : 'hover:scale-105 active:scale-95'
        }`}
      >
        {/* Outer Pulsing Glow Aura */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0B5D3B] via-[#F28C28] to-[#FF9F43] opacity-75 blur-md group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />

        {/* Radar Ring Animation */}
        <div className="absolute -inset-2 rounded-full border border-[#F28C28]/40 animate-ping pointer-events-none opacity-40" />

        {/* Main Agent Button Surface */}
        <div className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0B5D3B] via-[#127a50] to-[#F28C28] text-white shadow-xl shadow-[#0B5D3B]/30 border border-white/20 overflow-hidden">
          
          {/* Animated Background Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* AI Agent Avatar Logo with Rings */}
          <div className="relative w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 flex-shrink-0 shadow-inner">
            {/* Spinning Light Ring */}
            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin opacity-60" />
            
            {/* Bot Icon */}
            <Icon
              icon="solar:bot-bold-duotone"
              className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />

            {/* AI Active Status Dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white" />
            </span>
          </div>

          {/* AI Agent Label Text */}
          <div className="flex flex-col text-left pr-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold tracking-wide leading-none text-white drop-shadow-sm">
                Ask AI Agent
              </span>
              <Icon icon="solar:stars-minimalistic-bold" className="w-3.5 h-3.5 text-[#FFD166] animate-pulse" />
            </div>
            <span className="text-[9px] font-medium text-white/80 leading-tight">
              Ecosystem Help Bot
            </span>
          </div>

        </div>
      </button>
    </div>
  );
};
