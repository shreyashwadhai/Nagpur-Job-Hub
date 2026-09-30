import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useModal } from "../../context/ModalContext";
import { useAuth, DEMO_USERS } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../../types";

export const LoginModal: React.FC = () => {
  const { isOpen, modalType, closeModal } = useModal();
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>("jobseeker");
  const [email, setEmail] = useState("aarav.d@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen || modalType !== "login") return null;

  const demoPresets: {
    role: UserRole;
    title: string;
    email: string;
    icon: string;
    path: string;
    badgeColor: string;
  }[] = [
    {
      role: "jobseeker",
      title: "Job Seeker View",
      email: DEMO_USERS.jobseeker.email,
      icon: "solar:user-bold-duotone",
      path: "/user/dashboard",
      badgeColor: "bg-[#0B5D3B]/10 text-[#0B5D3B] border-[#0B5D3B]/20",
    },
    {
      role: "company",
      title: "Enterprise Company",
      email: DEMO_USERS.company.email,
      icon: "solar:buildings-bold-duotone",
      path: "/company/dashboard",
      badgeColor: "bg-[#F28C28]/10 text-[#F28C28] border-[#F28C28]/20",
    },
    {
      role: "institute",
      title: "Institute Academy",
      email: DEMO_USERS.institute.email,
      icon: "solar:ruler-cross-pen-bold-duotone",
      path: "/institute/dashboard",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      role: "admin",
      title: "Admin Intelligence",
      email: DEMO_USERS.admin.email,
      icon: "solar:shield-check-bold-duotone",
      path: "/admin/dashboard",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  const handlePresetSelect = (preset: (typeof demoPresets)[0]) => {
    setSelectedRole(preset.role);
    setEmail(preset.email);
    setPassword("demoPass123");

    // Perform instant demo login
    const loggedInUser = login(preset.email, "demoPass123", preset.role);
    showToast(
      `Welcome back, ${loggedInUser.name}! Switched to ${preset.title}.`,
      "success",
    );
    closeModal();
    navigate(preset.path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const loggedInUser = login(email, password, selectedRole);
    const targetPreset = demoPresets.find((p) => p.role === loggedInUser.role);
    showToast(
      `Sign in successful! Welcome back, ${loggedInUser.name}.`,
      "success",
    );
    closeModal();
    navigate(targetPreset ? targetPreset.path : "/user/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#E5E9E6] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Icon icon="solar:user-bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-display leading-tight">
                Sign In to Nagpur Portal
              </h3>
              <p className="text-xs text-emerald-100">
                Access your dashboard, profile, and ecosystem tools
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B] focus:bg-white text-gray-800 transition-all"
                  required
                />
                <Icon
                  icon="solar:letter-bold"
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B5D3B] focus:bg-white text-gray-800 transition-all"
                  required
                />
                <Icon
                  icon="solar:lock-password-bold"
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[#0B5D3B] focus:ring-[#0B5D3B]"
                />
                <span>Remember me on this browser</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="text-[#0B5D3B] font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <Icon icon="solar:login-2-bold" className="w-4 h-4" />
              <span>Sign In & Open Dashboard</span>
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider absolute">
              or sign in with credentials
            </span>
          </div>

          {/* Quick Demo User Switcher Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Icon
                icon="solar:stars-minimalistic-bold"
                className="w-4 h-4 text-[#F28C28]"
              />
              <span>Demo Quick Login (Select a Profile)</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {demoPresets.map((preset) => {
                const isSelected = selectedRole === preset.role;
                return (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-3 rounded-2xl border text-left transition-all group flex flex-col justify-between ${
                      isSelected
                        ? "border-[#0B5D3B] bg-[#0B5D3B]/5 shadow-sm ring-2 ring-[#0B5D3B]/30"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-lg ${preset.badgeColor}`}
                        >
                          <Icon icon={preset.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-[#1F2937] leading-tight">
                          {preset.title}
                        </span>
                      </div>
                      {isSelected && (
                        <Icon
                          icon="solar:check-circle-bold"
                          className="w-4 h-4 text-[#0B5D3B]"
                        />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono truncate">
                      {preset.email}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
