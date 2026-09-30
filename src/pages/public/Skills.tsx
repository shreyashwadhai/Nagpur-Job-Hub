import React from "react";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockInstitutions, mockSkills } from "../../data/mockSkills";
import { PageHeader } from "../../components/common/PageHeader";

export const Skills: React.FC = () => {
  const chartData = mockSkills.map((s) => ({
    name: s.skillName.split("&")[0],
    Demand: s.demandScore,
    Supply: s.supplyScore,
  }));

  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <PageHeader
        title="Academic & Skill Ecosystem"
        subtitle="Mapping premier Nagpur engineering institutes (VNIT, IIITN, RCOEM, GP Nagpur) with industry skill demand and gap telemetry."
        badge="Talent Supply & Demand Radar"
      />

      {/* SKILL DEMAND VS SUPPLY CHART */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E9E6] shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#1F2937] font-sans">
              Industry Demand vs Graduate Supply Gap
            </h3>
            <p className="text-xs text-gray-500">
              Empirical skill alignment index (Score out of 100)
            </p>
          </div>
          <span className="text-xs font-bold text-[#F28C28] bg-[#F28C28]/10 px-3 py-1 rounded-full font-sans">
            Highest Gap: Data & AI
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="Demand"
                name="Industry Demand"
                fill="#F28C28"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="Supply"
                name="Graduate Supply"
                fill="#0B5D3B"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SKILL METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white p-5 rounded-2xl border border-[#E5E9E6] shadow-soft space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#0B5D3B]/10 text-[#0B5D3B]">
                {skill.category}
              </span>
              <span className="text-xs font-bold text-[#F28C28]">
                {skill.growthYoY} Year on year
              </span>
            </div>
            <h4 className="font-bold text-base text-[#1F2937]">
              {skill.skillName}
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Demand Index:</span>
                <span className="font-bold text-[#F28C28]">
                  {skill.demandScore}/100
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#F28C28] h-2 rounded-full"
                  style={{ width: `${skill.demandScore}%` }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500">
              Top Recruiters: {skill.topHiringCompanies.join(", ")}
            </div>
          </div>
        ))}
      </div>

      {/* ACADEMIC INSTITUTIONS DIRECTORY */}
      <div className="space-y-6">
        <h3 className="font-bold text-2xl text-[#1F2937] font-sans">
          Nagpur Academic & Technical Institutes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockInstitutions.map((inst) => (
            <div
              key={inst.id}
              className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-soft space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#F28C28] bg-[#F28C28]/10 px-2.5 py-0.5 rounded">
                    {inst.type}
                  </span>
                  <h4 className="font-bold text-lg text-[#1F2937] mt-1">
                    {inst.name}
                  </h4>
                  <p className="text-xs text-gray-500">{inst.location}</p>
                </div>
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-[#0B5D3B]"
                >
                  <Icon
                    icon="solar:square-share-line-bold"
                    className="w-5 h-5"
                  />
                </a>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                  Key Enterprise MoUs & R&D Labs
                </span>
                <ul className="space-y-1 text-xs text-gray-700">
                  {inst.keyMoUs.map((mou, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-3.5 h-3.5 text-[#0B5D3B]"
                      />
                      <span>{mou}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
