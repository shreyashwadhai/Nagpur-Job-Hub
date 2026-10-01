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

// Register Chart.js modules
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

export const InstituteDashboard: React.FC = () => {

  // Chart Data 1: Monthly Campus Drives & Placements (Line)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Placed Students",
        data: [120, 180, 240, 310, 420, 580, 640, 790, 890],
        borderColor: "#0B5D3B",
        backgroundColor: "rgba(11, 93, 59, 0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#0B5D3B",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
      {
        label: "Campus Drives Hosted",
        data: [5, 8, 12, 16, 22, 28, 32, 40, 48],
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

  // Chart Data 2: Department-wise Placement Rate (Bar)
  const barChartData = {
    labels: [
      "Computer Science",
      "Info Tech",
      "Electronics",
      "Mechanical",
      "Civil",
      "Data Science",
    ],
    datasets: [
      {
        label: "Placed %",
        data: [96, 92, 85, 78, 72, 94],
        backgroundColor: "rgba(11, 93, 59, 0.85)",
        borderRadius: 8,
      },
      {
        label: "Highest CTC (LPA)",
        data: [44, 38, 28, 22, 18, 42],
        backgroundColor: "rgba(242, 140, 40, 0.9)",
        borderRadius: 8,
      },
    ],
  };

  // Chart Data 3: Corporate MoUs by Industry (Doughnut)
  const doughnutChartData = {
    labels: [
      "IT & Software",
      "Defense & Aerospace",
      "EV & Automotive",
      "AgriTech",
      "Life Sciences",
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

  // Chart Data 4: Student Career Preference (Pie)
  const pieChartData = {
    labels: [
      "Full-time Job",
      "Higher Studies",
      "Internship Drive",
      "Startup / Entrepreneur",
    ],
    datasets: [
      {
        data: [52, 22, 18, 8],
        backgroundColor: ["#0B5D3B", "#10B981", "#F28C28", "#6366F1"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  // Animation options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1800, easing: "easeInOutQuart" as const },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { family: "Inter", size: 12 } },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1600, easing: "easeOutBounce" as const },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { family: "Inter", size: 12 } },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateScale: true, animateRotate: true, duration: 2000 },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { font: { family: "Inter", size: 11 }, padding: 10 },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-1 rounded-md inline-block mb-1">
            Institute Management Portal
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            VNIT & Technical Academia Hub
          </h1>
          <p className="text-xs text-gray-500">
            Real-time campus placement analytics, course enrollments,
            internships & corporate MoUs overview.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Degree & Courses"
          value="18"
          icon="solar:ruler-cross-pen-bold-duotone"
        />
        <KPICard
          title="Enrolled Students"
          value="2,480"
          change="+18.5% YoY"
          icon="solar:users-group-two-rounded-bold-duotone"
        />
        <KPICard
          title="Active Campus MoUs"
          value="14"
          change="Verified"
          icon="solar:verified-check-bold-duotone"
        />
        <KPICard
          title="Placement Success Rate"
          value="89.6%"
          change="+4.2% MoM"
          icon="solar:graph-up-bold-duotone"
        />
      </div>

      {/* CHARTS GRID 1 (Line & Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:graph-bold"
                className="w-5 h-5 text-[#0B5D3B]"
              />
              <span>Campus Placement & Drives Trend</span>
            </h3>
            <span className="text-[10px] font-bold text-[#0B5D3B] bg-emerald-50 px-2.5 py-1 rounded-md">
              Monthly Placed Growth
            </span>
          </div>
          <div className="h-72 w-full pt-2">
            <Line data={lineChartData} options={lineOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:chart-2-bold"
                className="w-5 h-5 text-[#F28C28]"
              />
              <span>Department Placement Rate & Highest CTC</span>
            </h3>
            <span className="text-[10px] font-bold text-[#F28C28] bg-orange-50 px-2.5 py-1 rounded-md">
              By Engineering Stream
            </span>
          </div>
          <div className="h-72 w-full pt-2">
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* CHARTS GRID 2 (Doughnut & Pie) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:pie-chart-bold"
                className="w-5 h-5 text-[#0B5D3B]"
              />
              <span>Industry MoU Distribution</span>
            </h3>
            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              Corporate Sectors
            </span>
          </div>
          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <Doughnut data={doughnutChartData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Icon
                icon="solar:user-speak-bold"
                className="w-5 h-5 text-blue-600"
              />
              <span>Student Career Track Preferences</span>
            </h3>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Graduating Batch
            </span>
          </div>
          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
