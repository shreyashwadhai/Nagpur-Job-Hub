import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import landingPageImg from "../../assets/landing_page_image.webp";
import { mockCompanies } from "../../data/mockCompanies";
import { mockJobs } from "../../data/mockJobs";
import { mockNews } from "../../data/mockNews";
import { mockIndustries } from "../../data/mockIndustries";
import {
  CompanyCard,
  IndustryCard,
  JobCard,
  NewsCard,
} from "../../components/ui/Cards";
import { AIInsightsCard } from "../../components/ai/AIInsightsCard";
import { useModal } from "../../context/ModalContext";
import { StatCounter } from "../../components/ui/StatCounter";
import { HorizontalScroller } from "../../components/ui/HorizontalScroller";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  // Zone Cards Data matching the reference screenshot
  const industrialZones = [
    {
      id: "mihan",
      name: "MIHAN SEZ & Tech Park",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfvEBPuPVQdMT4hN-3TnukSUQGygfagE2aGk1MV1qFHA&s=10",
      query: "MIHAN+SEZ",
    },
    {
      id: "hingna",
      name: "Hingna MIDC Industrial Area",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      query: "Hingna+MIDC",
    },
    {
      id: "butibori",
      name: "Butibori Heavy MIDC",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4PczNaUH11C1l-NoCCzEe8p1nDacMdjBvKLKNcs_gVw&s=10",
      query: "Butibori+Industrial+Area",
    },
    {
      id: "it-park",
      name: "IT Park Parsodi Cluster",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      query: "IT+Park+Parsodi",
    },
    {
      id: "kalmeshwar",
      name: "Kalmeshwar Logistics Hub",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
      query: "Kalmeshwar",
    },
  ];

  const exploreTiles = [
    {
      title: "Explore Companies",
      path: "/companies",
      icon: "solar:buildings-bold-duotone",
      iconBg: "bg-[#E6F4ED]",
      iconColor: "text-[#0B5D3B]",
      hoverBorder: "hover:border-[#0B5D3B]",
      hoverText: "group-hover:text-[#0B5D3B]",
    },
    {
      title: "Nagpur Career Opportunities",
      path: "/jobs",
      icon: "solar:case-round-bold-duotone",
      iconBg: "bg-[#E8F2FD]",
      iconColor: "text-[#2563EB]",
      hoverBorder: "hover:border-[#2563EB]",
      hoverText: "group-hover:text-[#2563EB]",
    },
    {
      title: "Industrial News & Policies",
      path: "/news",
      icon: "solar:document-text-bold-duotone",
      iconBg: "bg-[#FEF0E6]",
      iconColor: "text-[#F28C28]",
      hoverBorder: "hover:border-[#F28C28]",
      hoverText: "group-hover:text-[#F28C28]",
    },
    {
      title: "Analytics & Market Intelligence",
      path: "/insights",
      icon: "solar:chart-2-bold-duotone",
      iconBg: "bg-[#F3E8FF]",
      iconColor: "text-purple-600",
      hoverBorder: "hover:border-purple-600",
      hoverText: "group-hover:text-purple-600",
    },
    {
      title: "Key Sector Directory",
      path: "/industries",
      icon: "solar:box-minimalistic-bold-duotone",
      iconBg: "bg-[#E6F7F5]",
      iconColor: "text-teal-600",
      hoverBorder: "hover:border-teal-600",
      hoverText: "group-hover:text-teal-600",
    },
    {
      title: "Academic & Skill Gap Radar",
      path: "/skills",
      icon: "icon-park-twotone:bachelor-cap-one",
      iconBg: "bg-[#FCE7F3]",
      iconColor: "text-rose-600",
      hoverBorder: "hover:border-rose-600",
      hoverText: "group-hover:text-rose-600",
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* HERO SECTION MATCHING REFERENCE DESIGN */}
      <section
        style={{
          backgroundImage: `linear-gradient(
      90deg,
      rgba(255,255,255,0.98) 0%,
      rgba(255,255,255,0.90) 25%,
      rgba(255,255,255,0.35) 45%,
      rgba(234,244,239,0.15) 100%
    ), url(${landingPageImg})`,
        }}
        className="relative bg-cover bg-center bg-no-repeat py-36"
      >
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div
              className="lg:col-span-6 space-y-2"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              {/* Sub-header text badge */}
              <div className="text-xs font-semibold text-gray-500 tracking-wide">
                Digital Source of Truth | Vidarbha Enterprise Intelligence
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] font-sans tracking-tight leading-[1.12]">
                Nagpur Industrial <br />
                <span className="text-[#0B5D3B]">Ecosystem</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-md text-gray-600 leading-relaxed max-w-xl font-sans">
                {/* A modern civic-tech and enterprise intelligence platform
                unifying Nagpur's industrial zones, tech campuses in MIHAN SEZ,
                defence manufacturing, logistics, academic institutions, and
                workforce growth. */}
                Connecting Industries | Creating Opportunities <br /> Enterprise
                Intelligence | Building a Strong Nagpur
              </p>

              {/* Action Buttons matching screenshot */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/companies"
                  className="px-6 py-3.5 rounded-xl bg-[#0B5D3B] hover:bg-[#07472d] text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-gray-400 group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <span>Explore the Companies</span>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <button
                  onClick={() => openModal("quick-apply")}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-100 text-black font-bold text-sm flex items-center gap-2 shadow-md transition-colors shadow-gray-400 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <Icon
                    icon="fluent:briefcase-search-20-filled"
                    className="w-4 h-4 text-[#F28C28]"
                  />
                  <span>Quick Apply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED QUICK ACTION CATEGORY TILES*/}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 bg-white p-5 rounded-2xl"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exploreTiles.map((tile, idx) => (
            <Link
              key={tile.path}
              to={tile.path}
              data-aos="fade-up"
              data-aos-delay={idx * 70}
              className={`
              p-4 rounded-2xl
              bg-white
              border border-[#E5E9E6]
              shadow-sm
              hover:shadow-md
              ${tile.hoverBorder}
              transition-all duration-300
              group
              flex flex-col justify-between
              h-36
              hover:scale-105
              ease-in-out
            `}
            >
              {/* Icon */}
              <div
                className={`
                w-10 h-10
                rounded-xl
                ${tile.iconBg}
                ${tile.iconColor}
                flex items-center justify-center
                shadow-xs
                group-hover:scale-110
                transition-transform duration-300
              `}
              >
                <Icon icon={tile.icon} className="w-6 h-6" />
              </div>

              {/* Content */}
              <div>
                <div
                  className={`
                  flex items-center justify-between
                  text-xs font-bold
                  text-[#1F2937]
                  ${tile.hoverText}
                  transition-colors duration-300
                `}
                >
                  <span>{tile.title}</span>

                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="
                    w-3.5 h-3.5
                    group-hover:translate-x-1
                    transition-transform duration-300
                  "
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NAGPUR INDUSTRIAL ZONES SECTION MATCHING SCREENSHOT */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        data-aos="fade-up"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-location-on"
                className="w-8 h-8 text-[#0B5D3B]"
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
                Nagpur Industrial Zones
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Key zones, major industries, limitless opportunities.
            </p>
          </div>

          <Link
            to="/map"
            className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Zones</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industrialZones.map((zone, idx) => (
            <div
              key={zone.id}
              onClick={() => navigate(`/companies?sez=${zone.query}`)}
              data-aos="zoom-in"
              data-aos-delay={idx * 80}
              className="bg-white rounded-2xl border border-[#E5E9E6] shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-28 overflow-hidden bg-gray-100">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1F2937] group-hover:text-[#0B5D3B] line-clamp-2 leading-tight">
                  {zone.name}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Tile 6: Interactive Geographic Map */}
          <div
            onClick={() => navigate("/map")}
            data-aos="zoom-in"
            data-aos-delay={400}
            className="bg-white rounded-2xl border border-[#E5E9E6] shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-28 bg-[#E6F4ED] flex items-center justify-center overflow-hidden">
              <Icon
                icon="solar:map-bold-duotone"
                className="w-14 h-14 text-[#0B5D3B] opacity-80 group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#1F2937] group-hover:text-[#0B5D3B] leading-tight">
                Interactive Geographic Map
              </span>
              <div className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI STATS BAR */}
      {/* <section className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <KPICard
            title="Tech & Industrial Firms"
            value="820+"
            change="+14.2%"
            icon="solar:buildings-bold-duotone"
          />
          <KPICard
            title="Estimated Employment"
            value="112,500"
            change="+18.5%"
            icon="solar:users-group-two-rounded-bold-duotone"
          />
          <KPICard
            title="Active Jobs"
            value="3,690"
            change="+22.0%"
            icon="solar:case-round-bold-duotone"
          />
          <KPICard
            title="New Companies (2025)"
            value="64"
            change="+32%"
            icon="solar:add-circle-bold-duotone"
          />
          <KPICard
            title="Hiring Growth Momentum"
            value="+24.8%"
            change="Strong"
            icon="solar:graph-up-bold-duotone"
          />
        </div>
      </section> */}

      {/* AI EXECUTIVE INSIGHTS */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <AIInsightsCard />
      </section>

      {/* LATEST CAREER OPPORTUNITIES */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-sans font-bold uppercase text-[#0B5D3B]">
              Talent & Recruitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
              Latest Opportunities in Nagpur
            </h2>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-bold text-[#F28C28] hover:underline flex items-center gap-1"
          >
            <span>
              Explore All <StatCounter value="3,690" /> Jobs
            </span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <HorizontalScroller>
          {mockJobs.map((j, idx) => (
            <JobCard key={j.id} job={j} index={idx} />
          ))}
        </HorizontalScroller>
      </section>

      {/* GROWING COMPANIES */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-sans font-bold uppercase text-[#F28C28]">
              Curated Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
              Fastest Growing Nagpur Companies
            </h2>
          </div>
          <Link
            to="/companies"
            className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1"
          >
            <span>
              View All <StatCounter value="820+" /> Companies
            </span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <HorizontalScroller>
          {mockCompanies.map((c, idx) => (
            <CompanyCard key={c.id} company={c} index={idx} />
          ))}
        </HorizontalScroller>
      </section>

      {/* KEY SECTOR DIRECTORY */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        data-aos="fade-up"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-sans font-bold uppercase text-[#F28C28]">
              Sector Clusters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
              Nagpur Industrial Sectors
            </h2>
          </div>
          <Link
            to="/industries"
            className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1"
          >
            <span>View All Sectors</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIndustries.slice(0, 6).map((ind, idx) => (
            <IndustryCard key={ind.id} industry={ind} index={idx} />
          ))}
        </div>
      </section>

      {/* NAGPUR INDUSTRY NEWS */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        data-aos="fade-up"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-sans font-bold uppercase text-[#0B5D3B]">
              Intelligence & News
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-sans">
              Nagpur Industrial News & Policy
            </h2>
          </div>
          <Link
            to="/news"
            className="text-xs font-bold text-[#0B5D3B] hover:underline flex items-center gap-1"
          >
            <span>View All News</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.slice(0, 3).map((n, idx) => (
            <NewsCard key={n.id} news={n} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="zoom-in"
      >
        <div className="bg-gradient-to-r from-[#0B5D3B] via-[#087F5B] to-[#0B5D3B] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <span className="text-xs font-sans font-bold uppercase px-3 py-1 rounded bg-[#F28C28] text-white">
              Civic Enterprise Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans leading-tight">
              Are you operating an industrial facility in Nagpur?
            </h2>
            <p className="text-sm text-gray-200 max-w-xl">
              Claim your official corporate profile, verify domain
              authorization, post job openings, and gain exposure across
              Nagpur’s digital source of truth.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 z-10 w-full sm:w-auto">
            <button
              onClick={() => openModal("claim-company")}
              className="px-6 py-3.5 rounded-2xl bg-[#F28C28] hover:bg-[#FF9F43] text-white font-bold text-sm transition-all shadow-lg text-center"
            >
              Claim Company Profile
            </button>
            <button
              onClick={() => openModal("submit-update")}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all text-center"
            >
              Submit Update
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
