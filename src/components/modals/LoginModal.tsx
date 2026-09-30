import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useModal } from "../../context/ModalContext";
import { useAuth, DEMO_USERS } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../../types";
import AppLogo from "../../assets/app_logo.webp";

export const LoginModal: React.FC = () => {
  const { isOpen, modalType, closeModal } = useModal();
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("jobseeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("aarav.d@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!isOpen || modalType !== "login") return null;

  const demoPresets: {
    role: UserRole;
    title: string;
    email: string;
    icon: string;
    path: string;
  }[] = [
    {
      role: "jobseeker",
      title: "Job Seeker",
      email: DEMO_USERS.jobseeker.email,
      icon: "solar:user-bold",
      path: "/user/dashboard",
    },
    {
      role: "company",
      title: "Company",
      email: DEMO_USERS.company.email,
      icon: "solar:buildings-bold",
      path: "/company/dashboard",
    },
    {
      role: "institute",
      title: "Institute",
      email: DEMO_USERS.institute.email,
      icon: "solar:ruler-cross-pen-bold",
      path: "/institute/dashboard",
    },
    {
      role: "admin",
      title: "Admin",
      email: DEMO_USERS.admin.email,
      icon: "solar:shield-check-bold",
      path: "/admin/dashboard",
    },
  ];

  const handlePresetSelect = (preset: (typeof demoPresets)[0]) => {
    setSelectedRole(preset.role);
    setEmail(preset.email);
    setPassword("demoPass123");

    const loggedInUser = login(preset.email, "demoPass123", preset.role);
    showToast(
      `Welcome back, ${loggedInUser.name}! Switched to ${preset.title} Portal.`,
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

    if (activeTab === "register" && !agreedTerms) {
      showToast("Please accept the Terms of Service to register.", "error");
      return;
    }

    const loggedInUser = login(email, password, selectedRole);
    const targetPreset = demoPresets.find((p) => p.role === loggedInUser.role);
    const welcomeMsg =
      activeTab === "register"
        ? `Account created successfully! Welcome to Nagpur Hub, ${name || loggedInUser.name}.`
        : `Sign in successful! Welcome back, ${loggedInUser.name}.`;

    showToast(welcomeMsg, "success");
    closeModal();
    navigate(targetPreset ? targetPreset.path : "/user/dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    const loggedInUser = login("aarav.d@gmail.com", "socialPass", "jobseeker");
    showToast(
      `Signed in with ${provider}! Welcome back, ${loggedInUser.name}.`,
      "success",
    );
    closeModal();
    navigate("/user/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-white border border-[#E5E9E6] max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 text-[#1F2937]">
        {/* TOP HEADER & BRANDING */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 relative z-10">
          <div className="flex items-center gap-3">
            <img
              src={AppLogo}
              alt="Nagpur Hub"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h2 className="font-extrabold text-2xl text-[#0B5D3B] leading-tight font-sans tracking-tight">
                NAGPUR
              </h2>
              <span className="text-xs font-medium text-[#F28C28] block leading-none font-sans">
                Industrial Ecosystem
              </span>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <Icon icon="akar-icons:cross" className="w-5 h-5" />
          </button>
        </div>

        {/* SEGMENTED TAB SWITCHER */}
        <div className="bg-[#F5F8F6] p-1.5 rounded-2xl border border-[#E5E9E6] grid grid-cols-2 gap-1.5 my-4 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "login"
                ? "bg-[#0B5D3B] text-white shadow-xs"
                : "text-gray-600 hover:text-[#0B5D3B]"
            }`}
          >
            <Icon
              icon="basil:user-solid"
              className={`w-5 h-5 ${activeTab === "login" ? "text-white" : "text-gray-500"}`}
            />
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "register"
                ? "bg-[#0B5D3B] text-white shadow-xs"
                : "text-gray-600 hover:text-[#0B5D3B]"
            }`}
          >
            <Icon
              icon="basil:user-plus-solid"
              className={`w-5 h-5 ${activeTab === "register" ? "text-white" : "text-gray-500"}`}
            />
            <span>Register</span>
          </button>
        </div>

        {/* WELCOME HEADING */}
        <div className="mb-4 relative z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] tracking-tight font-sans">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed font-sans">
            {activeTab === "login"
              ? "Access your account to explore opportunities, connect with businesses and stay updated."
              : "Register your account to unlock job alerts, company insights and ecosystem tools."}
          </p>
        </div>

        {/* QUICK DEMO PRESETS BAR */}
        <div className="mb-4 p-2 bg-[#F5F8F6] rounded-xl border border-[#E5E9E6] flex items-center justify-between gap-1 flex-wrap relative z-10">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1 font-sans">
            Demo Presets:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {demoPresets.map((preset) => (
              <button
                key={preset.role}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedRole === preset.role
                    ? "bg-[#0B5D3B] text-white shadow-2xs"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon icon={preset.icon} className="w-3 h-3" />
                <span>{preset.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
          {activeTab === "register" && (
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-[#F5F8F6] border border-[#E5E9E6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#0B5D3B] focus:bg-white focus:ring-2 focus:ring-[#0B5D3B]/10 transition-all"
                  required={activeTab === "register"}
                />
                <Icon
                  icon="solar:user-linear"
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-[#F5F8F6] border border-[#E5E9E6] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#0B5D3B] focus:bg-white focus:ring-2 focus:ring-[#0B5D3B]/10 transition-all"
                required
              />
              <Icon
                icon="solar:letter-linear"
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#F5F8F6] border border-[#E5E9E6] rounded-xl pl-10 pr-10 py-3 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#0B5D3B] focus:bg-white focus:ring-2 focus:ring-[#0B5D3B]/10 transition-all"
                required
              />
              <Icon
                icon="solar:lock-password-linear"
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <Icon
                  icon={
                    showPassword
                      ? "solar:eye-linear"
                      : "solar:eye-closed-linear"
                  }
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Option Row */}
          {activeTab === "login" ? (
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[#0B5D3B] focus:ring-[#0B5D3B]"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Password reset link sent to " + email, "info");
                }}
                className="text-[#0B5D3B] font-semibold hover:underline text-xs"
              >
                Forgot password?
              </a>
            </div>
          ) : (
            <div className="pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 text-xs font-medium">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded border-gray-300 text-[#0B5D3B] focus:ring-[#0B5D3B]"
                />
                <span>I agree to the Terms of Service & Privacy Policy</span>
              </label>
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#0B5D3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{activeTab === "login" ? "Login" : "Register"}</span>
            <Icon
              icon="solar:alt-arrow-right-linear"
              className="w-4 h-4 text-white"
            />
          </button>
        </form>

        {/* OR DIVIDER */}
        <div className="relative flex items-center justify-center my-4 relative z-10">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest absolute">
            OR
          </span>
        </div>

        {/* SOCIAL LOGINS */}
        <div className="space-y-2 relative z-10">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-semibold text-[#1F2937] flex items-center justify-center gap-2.5 transition-all shadow-2xs cursor-pointer"
          >
            <Icon icon="logos:google-icon" className="w-4 h-4" />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("LinkedIn")}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-semibold text-[#1F2937] flex items-center justify-center gap-2.5 transition-all shadow-2xs cursor-pointer"
          >
            <Icon icon="logos:linkedin-icon" className="w-4 h-4" />
            <span>Continue with LinkedIn</span>
          </button>
        </div>

        {/* BOTTOM SWITCH ACCOUNT PROMPT */}
        <div className="text-center mt-5 text-xs text-gray-500 font-medium relative z-10">
          {activeTab === "login" ? (
            <p className="flex items-center justify-center gap-1.5">
              <span>Don't have an account?</span>
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className="text-[#0B5D3B] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Register</span>
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  className="w-3.5 h-3.5"
                />
              </button>
            </p>
          ) : (
            <p className="flex items-center justify-center gap-1.5">
              <span>Already have an account?</span>
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="text-[#0B5D3B] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Login</span>
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  className="w-3.5 h-3.5"
                />
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
