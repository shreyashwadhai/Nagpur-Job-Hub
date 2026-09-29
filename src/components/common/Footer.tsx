import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useModal } from "../../context/ModalContext";
import AppLogo from "../../assets/app_logo.webp";

export const Footer: React.FC = () => {
  const { openModal } = useModal();

  return (
    <footer className="bg-[#0B5D3B] text-white border-t-4 border-[#F28C28]">
      {/* Main Footer Container */}
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-white rounded-xl flex items-center justify-center p-1 shadow-md">
                <img
                  src={AppLogo}
                  alt="Nagpur Ecosystem Logo"
                  className="w-20 h-14 object-contain"
                />
              </div>
              <div>
                <span className="font-sans font-extrabold text-lg text-white tracking-wide block leading-tight">
                  NAGPUR INDUSTRIAL ECOSYSTEM
                </span>
                <span className="block text-[11px] font-tech text-[#FF9F43]">
                  Digital Source of Truth • Vidarbha Enterprise Intelligence
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed max-w-md">
              A modern civic-tech and enterprise intelligence platform unifying
              Nagpur’s industrial zones, tech campuses in MIHAN SEZ, defence
              manufacturing, logistics, academic institutions, and workforce
              growth.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openModal("submit-update")}
                className="px-4 py-2 rounded-xl bg-[#F28C28] hover:bg-[#FF9F43] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
                Submit Company / News Update
              </button>
              <button
                onClick={() => openModal("claim-company")}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium flex items-center gap-2 transition-all"
              >
                <Icon
                  icon="solar:verified-check-bold"
                  className="w-4 h-4 text-[#FF9F43]"
                />
                Claim Your Company Profile
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FF9F43] mb-4">
              Core Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-200 font-medium">
              <li>
                <Link
                  to="/companies"
                  className="hover:text-white transition-colors"
                >
                  Explore Companies
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white transition-colors">
                  Nagpur Career Opportunities
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  Industrial News & Policies
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="hover:text-white transition-colors"
                >
                  Analytics & Market Intelligence
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="hover:text-white transition-colors"
                >
                  Key Sector Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className="hover:text-white transition-colors"
                >
                  Academic & Skill Gap Radar
                </Link>
              </li>
            </ul>
          </div>

          {/* Industrial Zones */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FF9F43] mb-4">
              Nagpur Industrial Zones
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-200 font-medium">
              <li>
                <Link
                  to="/companies?sez=MIHAN+SEZ"
                  className="hover:text-white transition-colors"
                >
                  MIHAN SEZ & Tech Park
                </Link>
              </li>
              <li>
                <Link
                  to="/companies?sez=Hingna+MIDC"
                  className="hover:text-white transition-colors"
                >
                  Hingna MIDC Industrial Area
                </Link>
              </li>
              <li>
                <Link
                  to="/companies?sez=Butibori+Industrial+Area"
                  className="hover:text-white transition-colors"
                >
                  Butibori Heavy MIDC
                </Link>
              </li>
              <li>
                <Link
                  to="/companies?sez=IT+Park+Parsodi"
                  className="hover:text-white transition-colors"
                >
                  IT Park Parsodi Cluster
                </Link>
              </li>
              <li>
                <Link
                  to="/companies?sez=Kalmeshwar"
                  className="hover:text-white transition-colors"
                >
                  Kalmeshwar Logistics Hub
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">
                  Interactive Geographic Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Governance */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FF9F43] mb-4">
              Governance & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-200 font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Civic Initiative
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Admin Verification Portal
                </Link>
              </li>
              <li>
                <a
                  href="#data-methodology"
                  onClick={() => openModal("ask-ecosystem")}
                  className="hover:text-white transition-colors"
                >
                  AI Data Verification Policy
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@nagpurecosystem.org"
                  className="hover:text-white transition-colors"
                >
                  Contact Platform Desk
                </a>
              </li>
              <li>
                <span className="text-gray-400">Open Data Standard v2.4</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dark Bottom Bar matching the reference screenshot */}
      <div className="bg-[#052618] border-t border-white/10 py-4">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-300">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-gray-300 font-medium">
            <Link
              to="/about"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Icon
                icon="solar:users-group-two-rounded-bold"
                className="w-4 h-4 text-[#FF9F43]"
              />
              <span>About Civic Initiative</span>
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Icon
                icon="solar:shield-check-bold"
                className="w-4 h-4 text-[#FF9F43]"
              />
              <span>Admin Verification Portal</span>
            </Link>
            <button
              onClick={() => openModal("ask-ecosystem")}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Icon
                icon="solar:document-text-bold"
                className="w-4 h-4 text-[#FF9F43]"
              />
              <span>AI Data Verification Policy</span>
            </button>
            <a
              href="mailto:support@nagpurecosystem.org"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Icon
                icon="solar:letter-bold"
                className="w-4 h-4 text-[#FF9F43]"
              />
              <span>Contact Platform Desk</span>
            </a>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Icon
                icon="solar:server-bold"
                className="w-4 h-4 text-[#FF9F43]"
              />
              <span>Open Data Standard v2.4</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-center md:text-right text-[11px] text-gray-400">
            <span>
              © 2026 Nagpur Industrial Ecosystem. Built for Vidarbha Growth &
              Innovation.
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#FF9F43]">
              <Icon icon="solar:map-point-wave-bold" className="w-3.5 h-3.5" />
              Nagpur Zero Mile Hub • MH India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
