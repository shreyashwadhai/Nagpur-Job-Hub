import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types";
import AppLogo from "../../assets/app_logo.webp";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navLinks = [
    {
      label: "Explore Companies",
      path: "/companies",
      icon: "solar:buildings-bold-duotone",
    },
    { label: "Jobs", path: "/jobs", icon: "solar:case-round-bold-duotone" },
    { label: "News", path: "/news", icon: "solar:document-text-bold-duotone" },
    // { label: 'Insights', path: '/insights', icon: 'solar:chart-2-bold-duotone' },
    {
      label: "Industries",
      path: "/industries",
      icon: "solar:box-minimalistic-bold-duotone",
    },
    {
      label: "Ecosystem Map",
      path: "/map",
      icon: "solar:map-point-bold-duotone",
    },
    {
      label: "Skills & Academia",
      path: "/skills",
      icon: "solar:ruler-cross-pen-bold-duotone",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const roleOptions: {
    label: string;
    value: UserRole;
    icon: string;
    path: string;
  }[] = [
    {
      label: "Job Seeker View",
      value: "jobseeker",
      icon: "solar:user-bold",
      path: "/user/dashboard",
    },
    {
      label: "Company Portal",
      value: "company",
      icon: "solar:buildings-bold",
      path: "/company/dashboard",
    },
    {
      label: "Institute Portal",
      value: "institute",
      icon: "solar:ruler-cross-pen-bold",
      path: "/institute/dashboard",
    },
    {
      label: "Admin Intelligence",
      value: "admin",
      icon: "solar:shield-check-bold",
      path: "/admin/dashboard",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E9E6] shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Branding */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <img src={AppLogo} alt="" className="w-20 h-16" />
            {/* <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg text-[#0B5D3B] tracking-tight leading-none">
                  NAGPUR
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#F28C28]/10 text-[#F28C28] border border-[#F28C28]/20">
                  ECOSYSTEM
                </span>
              </div>
              <span className="text-[11px] text-[#6B7280] font-medium block leading-tight">
                Digital Source of Truth
              </span>
            </div> */}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs px-2 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#0B5D3B]/10 text-[#0B5D3B] font-semibold"
                      : "text-[#1F2937] hover:bg-gray-100 hover:text-[#0B5D3B]"
                  }`}
                >
                  {/* <Icon icon={link.icon} className={`w-4 h-4 ${isActive ? 'text-[#0B5D3B]' : 'text-[#6B7280]'}`} /> */}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Global Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Global Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:block w-48 lg:w-64"
            >
              <input
                type="text"
                placeholder="Search companies, jobs, news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 py-1.5 text-xs bg-[#F5F8F6] border border-[#E5E9E6] rounded-xl focus:outline-none focus:border-[#F28C28] focus:bg-white text-[#1F2937] placeholder-gray-400 transition-all"
              />
              <Icon
                icon="solar:magnifer-linear"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </form>

            {/* Vitric IQ AI Button */}
            <a
              href="https://ai-interview.vitric.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center justify-center focus:outline-none"
              title="Vitric IQ - AI Ecosystem Intelligence"
            >
              {/* Outer Glowing Pulsing Aura */}
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#6CBDDE] via-[#6CBDDE] to-[#6366F1] opacity-70 blur-[3px] group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse" />

              {/* Glassmorphic Button Surface */}
              <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1d46] text-white border border-white/20 shadow-md backdrop-blur-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                {/* Animated Light Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                {/* AI Brain Icon Container */}
                <div className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-tr from-[#174885] to-[#6CBDDE] text-white shadow-inner">
                  <Icon
                    icon="hugeicons:brain-circuit"
                    className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Active AI Status Pulse */}
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-slate-900" />
                  </span>
                </div>

                {/* Brand Typography & Badge */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    VITRIC
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-tech font-black tracking-wider uppercase rounded-md bg-gradient-to-r from-[#1675ea] to-[#6CBDDE] text-slate-950 shadow-sm">
                    IQ
                  </span>
                 
                </div>
              </div>
            </a>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl text-[#1F2937] hover:bg-gray-100 relative transition-colors"
                aria-label="Notifications"
              >
                <Icon
                  icon="solar:bell-bold-duotone"
                  className="w-5 h-5 text-gray-600"
                />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F28C28] animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F28C28]" />
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E9E6] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h4 className="font-semibold text-sm text-[#1F2937]">
                      Ecosystem Notifications
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B]">
                      3 New
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto my-2 text-xs">
                    <div className="py-2.5 flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] mt-0.5">
                        <Icon
                          icon="solar:check-circle-bold"
                          className="w-4 h-4"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Company Verified
                        </p>
                        <p className="text-gray-500">
                          CtrlS Data Center submitted verification docs.
                        </p>
                        <span className="text-[10px] text-gray-400">
                          10m ago
                        </span>
                      </div>
                    </div>
                    <div className="py-2.5 flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#F28C28]/10 text-[#F28C28] mt-0.5">
                        <Icon icon="solar:case-bold" className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          New Job Match
                        </p>
                        <p className="text-gray-500">
                          InfoCepts posted Senior Data Engineer in MIHAN.
                        </p>
                        <span className="text-[10px] text-gray-400">
                          1h ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher & User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-[#F5F8F6] hover:bg-gray-200/70 border border-[#E5E9E6] transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-[#0B5D3B]/20"
                />
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-semibold block text-[#1F2937] leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] uppercase font-tech text-[#0B5D3B] font-bold">
                    {role}
                  </span>
                </div>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className="w-3.5 h-3.5 text-gray-500"
                />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E5E9E6] p-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-bold text-[#1F2937]">
                      Demo Role Switcher
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Switch panels instantly to test role permissions.
                    </p>
                  </div>

                  {roleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setRole(opt.value);
                        setIsRoleMenuOpen(false);
                        navigate(opt.path);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        role === opt.value
                          ? "bg-[#0B5D3B] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon={opt.icon} className="w-4 h-4" />
                        <span>{opt.label}</span>
                      </div>
                      {role === opt.value && (
                        <Icon
                          icon="solar:check-read-bold"
                          className="w-4 h-4 text-white"
                        />
                      )}
                    </button>
                  ))}

                  <div className="border-t border-gray-100 mt-2 pt-1">
                    <Link
                      to={
                        role === "admin"
                          ? "/admin/dashboard"
                          : role === "company"
                            ? "/company/dashboard"
                            : role === "institute"
                              ? "/institute/dashboard"
                              : "/user/dashboard"
                      }
                      onClick={() => setIsRoleMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#F28C28] hover:bg-[#F28C28]/10 transition-colors"
                    >
                      <Icon
                        icon="solar:widget-bold-duotone"
                        className="w-4 h-4"
                      />
                      Go to Active Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl xl:hidden text-gray-700 hover:bg-gray-100"
              aria-label="Toggle Navigation"
            >
              <Icon
                icon={
                  isMobileMenuOpen
                    ? "solar:close-square-bold"
                    : "solar:hamburger-menu-bold"
                }
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E5E9E6] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <input
              type="text"
              placeholder="Search companies, jobs, news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-[#F5F8F6] border border-[#E5E9E6] rounded-xl focus:outline-none focus:border-[#F28C28]"
            />
            <Icon
              icon="solar:magnifer-linear"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </form>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border ${
                  location.pathname === link.path
                    ? "bg-[#0B5D3B] text-white border-[#0B5D3B]"
                    : "bg-[#F5F8F6] text-gray-800 border-gray-200"
                }`}
              >
                <Icon icon={link.icon} className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Nagpur Civic-Tech Portal</span>
          </div>
        </div>
      )}
    </header>
  );
};
