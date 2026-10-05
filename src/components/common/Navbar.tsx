import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import AppLogo from "../../assets/app_logo.webp";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, user, isAuthenticated, logout } = useAuth();
  const { openModal } = useModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(event.target as Node)
      ) {
        setIsRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: "Home", path: "/", icon: "solar:home-2-bold-duotone" },
    {
      label: "Companies",
      path: "/companies",
      icon: "solar:buildings-bold-duotone",
    },
    { label: "Jobs", path: "/jobs", icon: "solar:case-round-bold-duotone" },
    { label: "News", path: "/news", icon: "solar:document-text-bold-duotone" },
    {
      label: "Insights",
      path: "/insights",
      icon: "solar:chart-2-bold-duotone",
    },
    {
      label: "Industries",
      path: "/industries",
      icon: "solar:box-minimalistic-bold-duotone",
    },
    {
      label: "Skills",
      path: "/skills",
      icon: "solar:ruler-cross-pen-bold-duotone",
    },
    { label: "Map", path: "/map", icon: "solar:map-point-bold-duotone" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white/90 backdrop-blur-md border-b border-[#E5E9E6] shadow-sm" style={{ zIndex: 9999 }}>
      <div className="max-w-348 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Branding */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <img src={AppLogo} alt="" className="w-16 h-14" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-extrabold text-[1.6rem] text-[#094e31] tracking-tight leading-none">
                  NAGPUR
                </span>
              </div>
              <span className="text-[11px] text-[#115338] font-medium block leading-tight">
                Industrial Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm px-2 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
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

          {/* Global Search & Header CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Header Action Buttons matching Reference Design */}
            {/* <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => openModal("submit-update")}
                className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-[#1F2937] text-xs font-semibold transition-all shadow-2xs whitespace-nowrap"
              >
                Submit Company / News Update
              </button>
              <button
                onClick={() => openModal("claim-company")}
                className="px-3.5 py-1.5 rounded-xl bg-[#0B5D3B] hover:bg-[#07472d] text-white text-xs font-bold transition-all shadow-xs whitespace-nowrap"
              >
                Claim Your Company Profile
              </button>
            </div> */}

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

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
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

            {/* Role Switcher & User Profile Menu / Sign In Button */}
            {!isAuthenticated ? (
              <button
                onClick={() => openModal("login")}
                className="px-4 py-2 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold text-xs rounded-xl shadow-sm shadow-[#0B5D3B]/20 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Icon icon="solar:user-bold" className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative" ref={roleMenuRef}>
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
                    <span className="text-[10px] uppercase font-sans text-[#0B5D3B] font-bold">
                      {role}
                    </span>
                  </div>
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    className="w-3.5 h-3.5 text-gray-500"
                  />
                </button>

                {isRoleMenuOpen && (
                  <div className="absolute right-0 mt-2 w-fit bg-white rounded-2xl shadow-xl border border-[#E5E9E6] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="pb-3 border-b border-gray-100 mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#0B5D3B]/20 flex-shrink-0"
                        />
                        <div className="overflow-hidden min-w-0">
                          <p className="text-xs font-bold text-[#1F2937] truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {user.email}
                          </p>
                          <span className="flex flex-col md:flex-row items-center gap-1 mt-1 text-[10px] font-sans uppercase font-bold text-[#0B5D3B] bg-[#0B5D3B]/10 px-2 py-0.5 rounded-md">
                            {role} <span>Account</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
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
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#0B5D3B] hover:bg-[#0B5D3B]/10 transition-colors"
                      >
                        <Icon
                          icon="solar:widget-bold-duotone"
                          className="w-4 h-4 text-[#0B5D3B]"
                        />
                        <span>Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsRoleMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <Icon
                          icon="solar:logout-3-bold"
                          className="w-4 h-4 text-rose-600"
                        />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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
