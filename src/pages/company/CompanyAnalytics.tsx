import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { KPICard } from "../../components/ui/Cards";
import { Icon } from "@iconify/react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const CompanyAnalytics: React.FC = () => {
  // Line Chart Data (Weekly Views vs Applies)
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Profile Views",
        data: [320, 450, 520, 610, 580, 340, 290],
        borderColor: "#0B5D3B",
        backgroundColor: "rgba(11, 93, 59, 0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#0B5D3B",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
      {
        label: "Job Applications",
        data: [45, 62, 80, 95, 75, 38, 25],
        borderColor: "#F28C28",
        backgroundColor: "rgba(242, 140, 40, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#F28C28",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
    ],
  };

  // Bar Chart Data (Monthly Applicants & Shortlisted Candidates)
  const barChartData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Total Applicants",
        data: [420, 580, 710, 850, 960],
        backgroundColor: "rgba(11, 93, 59, 0.85)",
        borderRadius: 8,
      },
      {
        label: "Shortlisted Candidates",
        data: [85, 110, 140, 175, 210],
        backgroundColor: "rgba(242, 140, 40, 0.9)",
        borderRadius: 8,
      },
    ],
  };

  // Doughnut Chart Data (Candidate Skill Breakdown)
  const doughnutChartData = {
    labels: [
      "React & Frontend",
      "Node.js & Backend",
      "Data Engineering",
      "AWS & Cloud",
      "Python & AI",
    ],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          "#0B5D3B",
          "#F28C28",
          "#3B82F6",
          "#8B5CF6",
          "#EC4899",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  // Pie Chart Data (Institute / Talent Origin)
  const pieChartData = {
    labels: [
      "VNIT Nagpur",
      "RCOEM",
      "IIIT Nagpur",
      "GHRCE / YCCE",
      "Other Vidarbha",
      "Outside State",
    ],
    datasets: [
      {
        data: [28, 22, 18, 16, 11, 5],
        backgroundColor: [
          "#0B5D3B",
          "#10B981",
          "#F28C28",
          "#F59E0B",
          "#6366F1",
          "#94A3B8",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  // Animation Options
  const animatedLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1800,
      easing: "easeInOutQuart" as const,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { family: "Inter", size: 12 }, usePointStyle: true },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#F1F5F9" } },
    },
  };

  const animatedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1600,
      easing: "easeOutBounce" as const,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { family: "Inter", size: 12 } },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#F1F5F9" } },
    },
  };

  const animatedPieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { font: { family: "Inter", size: 11 }, padding: 12 },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-0.5 rounded">
            Interactive Analytics Engine
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937] font-sans mt-0.5">
            Candidate Engagement Analytics
          </h1>
          <p className="text-xs text-gray-500">
            Real-time candidate profile traffic, application conversion, skill
            demand & talent origin charts.
          </p>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KPICard
          title="Total Profile Views"
          value="4,820"
          change="+18.4% this month"
          icon="solar:eye-bold-duotone"
        />
        <KPICard
          title="Job Applications"
          value="640"
          change="+24.1% YoY"
          icon="solar:case-round-bold-duotone"
        />
        <KPICard
          title="Interview Conversion"
          value="14.2%"
          change="+3.5% MoM"
          icon="solar:user-check-bold-duotone"
        />
        <KPICard
          title="Avg. Time to Hire"
          value="18 Days"
          change="-4 days vs avg"
          icon="solar:clock-circle-bold-duotone"
        />
      </div>

      {/* LINE & BAR CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Animated Line Chart */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:graph-bold"
                className="w-5 h-5 text-[#0B5D3B]"
              />
              <span>Weekly Views vs Applications</span>
            </h3>
            <span className="text-[10px] font-bold text-[#0B5D3B] bg-emerald-50 px-2.5 py-1 rounded-md">
              7-Day Animated Trend
            </span>
          </div>
          <div className="h-72 w-full pt-2">
            <Line data={lineChartData} options={animatedLineOptions} />
          </div>
        </div>

        {/* Animated Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:chart-2-bold"
                className="w-5 h-5 text-[#F28C28]"
              />
              <span>Monthly Applicants vs Shortlisted</span>
            </h3>
            <span className="text-[10px] font-bold text-[#F28C28] bg-orange-50 px-2.5 py-1 rounded-md">
              5-Month Funnel
            </span>
          </div>
          <div className="h-72 w-full pt-2">
            <Bar data={barChartData} options={animatedBarOptions} />
          </div>
        </div>
      </div>

      {/* DOUGHNUT & PIE CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Animated Doughnut Chart */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:pie-chart-bold"
                className="w-5 h-5 text-[#0B5D3B]"
              />
              <span>Applicant Candidate Skill Distribution</span>
            </h3>
            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              Pie / Doughnut Chart
            </span>
          </div>
          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <Doughnut data={doughnutChartData} options={animatedPieOptions} />
          </div>
        </div>

        {/* Animated Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:ruler-cross-pen-bold"
                className="w-5 h-5 text-blue-600"
              />
              <span>Talent Origin & Institute Share</span>
            </h3>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Vidarbha Colleges
            </span>
          </div>
          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <Pie data={pieChartData} options={animatedPieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
