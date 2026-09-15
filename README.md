<div align="center">

# 🏛️ Nagpur Job Hub
### *Digital Source of Truth • Vidarbha Enterprise & Civic Intelligence Platform*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Mapbox / GIS](https://img.shields.io/badge/Mapbox_GIS-Interactive-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![License](https://img.shields.io/badge/License-MIT-0B5D3B?style=for-the-badge)](LICENSE)

<br />

> **Nagpur Industrial Ecosystem** is a production-quality, scalable enterprise intelligence and civic-tech platform unifying Nagpur’s industrial zones, tech campuses in MIHAN SEZ, defence manufacturing, logistics hubs, academic institutions, and workforce growth telemetry.

</div>

---

## 🌟 Overview

Positioned at India’s geographical center (**Zero Mile**), Nagpur is experiencing an industrial renaissance driven by the **4,300-hectare MIHAN SEZ**, major manufacturing centers in **Hingna** and **Butibori MIDC**, the **Samruddhi Mahamarg Cargo Expressway**, and software hubs in **IT Park Parsodi**.

This platform acts as an open, trustworthy digital source of truth that standardizes corporate verification, tracks high-growth career opportunities, models academic skill supply vs. industry demand, and offers AI-driven market intelligence for citizens, enterprises, academic bodies, and administrators.

---

## ✨ Key Features

### 🏢 1. Verified Entity Directory
- **Multi-Dimensional Filters**: Filter 820+ registered companies by Industry Sector, SEZ/MIDC Zone, Employee Strength, Entry Year, and Verification Tier (*Verified Entity*, *Estimated Data*, *Public Record*).
- **Dual Display Modes**: Toggle seamlessly between responsive **Card Grid View** and clustered **GIS Map View**.
- **Entity Profiles**: Detailed corporate overviews, local Nagpur leadership profiles, historical headcount growth graphs (Recharts), open job listings, and press releases.

### 📍 2. Interactive GIS Ecosystem Map
- **Location Pins & Clustering**: Real-time geolocation markers for MIHAN SEZ, Hingna MIDC, Butibori Industrial Area, IT Park Parsodi, and Kalmeshwar.
- **Multi-Layer Support**: Toggle infrastructure layers including Samruddhi Expressway cargo corridors, Broad Gauge Metro links, and VNIT/IIITN academic centers.
- **Slide-Over Entity Cards**: Click any pin to open compact entity telemetry cards.

### 💼 3. Career Discovery Engine
- **Targeted Discovery**: Search by experience band, skill sets (*Snowflake, PySpark, React, CATIA V6, BMS Calibration*), work mode (*On-site, Hybrid, Remote*), and fresher-friendly tags.
- **Quick Apply & Save**: Integrated application workflow with resume attachment previews and alert rules.
- **Career Insights**: Live skill demand radar and top recruiter analytics.

### 🤖 4. AI Executive Intelligence
- **"Ask Ecosystem" Conversational Search**: Natural language query drawer (*e.g., "Which companies are hiring React developers in MIHAN SEZ?"*) providing structured enterprise cards.
- **AI Executive Summaries**: Summarized press releases and policy updates with Nagpur Impact scores (*High / Medium / Low*).
- **AI Key Takeaways**: Real-time observation cards generated from aggregated telemetry.

### 📊 5. Analytics & Market Intelligence
- **Recharts Analytics**: Interactive graphs for:
  - Year-Wise Company & Hiring Trajectory
  - SEZ & MIDC Zone Comparison
  - Industry Mix Composition
  - Monthly Hiring Momentum
- **Report Export**: Export aggregated telemetry as **PDF Summaries** or **CSV Raw Datasets**.

### 🎓 6. Academic & Skill Ecosystem
- **Skill Demand vs. Supply Radar**: Identifies critical talent gaps between engineering graduates and recruiter requirements.
- **Institutional Alignment**: Profiles for **VNIT Nagpur**, **IIIT Nagpur**, **RCOEM**, and **Government Polytechnic** showcasing corporate MoUs and joint R&D labs.

---

## 🔐 Three Role-Based Panels

The platform includes protected routes and an instant **Demo Role Switcher** in the top navigation header:

| Role Panel | Access Path | Key Capabilities |
| :--- | :--- | :--- |
| **👨‍💻 Job Seeker** | `/user/dashboard` | Application tracker, saved job bookmarks, job alert rules, and skill recommendations. |
| **🏢 Enterprise Company** | `/company/dashboard` | Corporate profile management, job posting editor, candidate interest analytics, and domain verification. |
| **🛡️ Admin Governance** | `/admin/dashboard` | Verification claim reviewer, company & job moderation, user directory, API scraper health, and audit logs. |

---

## 🎨 Visual Design System

The visual design captures Nagpur’s identity using modern glassmorphism, subtle micro-animations, and clean typography:

| Theme Element | Color / Font | Usage |
| :--- | :--- | :--- |
| **Primary Saffron Orange** | `#F28C28` | CTAs, active states, key metric highlights, brand mark |
| **Orange Accent** | `#FF9F43` | Hover effects, badges, secondary highlights |
| **Deep Trust Green** | `#0B5D3B` | Trust badges, headers, dark glass panels, footer |
| **Vibrant Green** | `#087F5B` | Verified checkmarks and positive metric trends |
| **Background & Card** | `#F5F8F6` / `#FFFFFF` | Soft ambient light theme background and 14px rounded cards |
| **Typography** | `Inter` / `Manrope` | Main body text |
| **Brand Display & Tech** | `Cormorant Garamond` & `Electrolize` | Hero titles, branding accents, and numeric telemetry |

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, PostCSS, Custom Design Tokens
- **Icons**: `@iconify/react` (*Solar, Heroicons, Lucide icon sets*)
- **Animations**: `framer-motion` for page transitions, tab switches, and modal popups
- **Mapping & GIS**: Leaflet & Mapbox GL JS engine with custom Carto vector tiles
- **Data Visualization**: Recharts (*Area, Bar, Line, and Pie charts*)
- **Routing**: React Router v6 with protected route layouts

---

## 📁 Project Architecture

```
src/
├── assets/                  # Brand logos, images, vectors
├── components/
│   ├── ai/                  # AskEcosystemDrawer, AIInsightsCard
│   ├── common/              # Navbar, Footer, Sidebar, PageHeader, Breadcrumb
│   ├── layout/              # PublicLayout, DashboardLayout
│   ├── map/                 # MapboxMap (Interactive GIS Engine)
│   ├── modals/              # ClaimCompany, ApplyJob, SubmitUpdate, ExportModal, ModalManager
│   └── ui/                  # Cards, Badges, Modal, Skeletons
├── context/
│   ├── AuthContext.tsx      # User auth & Demo Role Switcher (Jobseeker, Company, Admin)
│   ├── ModalContext.tsx     # Centralized modal state orchestration
│   └── ToastContext.tsx     # Floating notification alert system
├── data/                    # Nagpur telemetry datasets (Companies, Jobs, News, Industries, Skills, Admin)
├── pages/
│   ├── public/              # Home, CompanyDirectory, CompanyMap, CompanyProfile, Jobs, JobDetail, News, NewsDetail, Insights, IndustryDirectory, IndustryDetail, Skills, EcosystemMap, About, SearchResults
│   ├── user/                # UserDashboard, SavedJobs, JobAlerts
│   ├── company/             # CompanyDashboard, CompanyProfileEdit, CompanyJobs, CompanyAnalytics, CompanyVerification
│   └── admin/               # AdminDashboard, AdminCompanies, VerificationRequests, AdminJobs, AdminNews, AdminUsers, DataSources, AuditLogs
├── types/                   # TypeScript interfaces & domain models
├── App.tsx                  # Application route registry
├── main.tsx                 # React DOM entry point
└── index.css                # Tailwind CSS v4 entry & theme imports
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nagpur-industrial-ecosystem.git
   cd nagpur-industrial-ecosystem
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🤝 Community & Verification Policy

The **Nagpur Industrial Ecosystem** encourages community contributions:
- **Claim Company**: Representatives can verify domain email ownership and submit GSTIN/CIN proof documents.
- **Submit Updates**: Anyone can contribute missing industrial units, news releases, or data corrections to the Admin Moderation Queue.

---

<div align="center">

Made with ❤️ for **Nagpur & Vidarbha Industrial Growth** • Built using React & TypeScript

</div>
