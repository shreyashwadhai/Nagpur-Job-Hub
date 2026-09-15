import type { Industry } from '../types';

export const mockIndustries: Industry[] = [
  {
    id: 'it-software',
    name: 'IT, Cloud & Software Services',
    icon: 'solar:laptop-3-bold-duotone',
    description: 'Nagpur’s flagship technology sector spanning enterprise software engineering, cloud managed services, AI data pipelines, and offshore delivery centers concentrated in MIHAN SEZ and IT Park Parsodi.',
    totalCompanies: 240,
    totalJobs: 1450,
    totalEmployment: 28500,
    growthRate: '+18.4% YoY',
    topCompanies: ['InfoCepts Technologies', 'Persistent Systems', 'HCLTech Nagpur', 'Tech Mahindra'],
    locations: ['MIHAN SEZ', 'IT Park Parsodi', 'Civil Lines'],
    requiredSkills: ['React.js', 'Python', 'Snowflake', 'PySpark', 'AWS/Azure', 'Node.js', 'DevOps'],
    historicalGrowth: [
      { year: 2021, companies: 160, jobs: 820 },
      { year: 2022, companies: 185, jobs: 1050 },
      { year: 2023, companies: 205, jobs: 1200 },
      { year: 2024, companies: 225, jobs: 1340 },
      { year: 2025, companies: 240, jobs: 1450 }
    ]
  },
  {
    id: 'defence-aerospace',
    name: 'Defence & Aerospace Manufacturing',
    icon: 'solar:rocket-bold-duotone',
    description: 'High-precision defence hardware, ammunition, missile propellants, and fighter aircraft aerostructures cluster powered by DRAL, Solar Industries, and Tata Advanced Systems.',
    totalCompanies: 48,
    totalJobs: 380,
    totalEmployment: 12400,
    growthRate: '+24.1% YoY',
    topCompanies: ['Solar Industries India', 'Dassault Reliance Aerospace (DRAL)', 'Tata Advanced Systems', 'Economic Explosives'],
    locations: ['MIHAN SEZ', 'Hingna MIDC', 'Butibori Industrial Area'],
    requiredSkills: ['CATIA V6', 'GD&T', 'Avionics PCB', 'Embedded C++', 'Aerostructures', 'AS9100 Quality'],
    historicalGrowth: [
      { year: 2021, companies: 28, jobs: 180 },
      { year: 2022, companies: 34, jobs: 240 },
      { year: 2023, companies: 40, jobs: 310 },
      { year: 2024, companies: 45, jobs: 350 },
      { year: 2025, companies: 48, jobs: 380 }
    ]
  },
  {
    id: 'manufacturing-auto',
    name: 'Manufacturing & Automotive',
    icon: 'solar:settings-bold-duotone',
    description: 'Heavy industrial engineering, automated tire manufacturing, steel cold-rolling, and automotive assembly hubs across Butibori and Kalmeshwar MIDC zones.',
    totalCompanies: 310,
    totalJobs: 890,
    totalEmployment: 42000,
    growthRate: '+11.2% YoY',
    topCompanies: ['CEAT Tyres India', 'JSW Coated Steel', 'Mahindra Unnati', 'KEC International'],
    locations: ['Butibori Industrial Area', 'Kalmeshwar MIDC', 'Hingna MIDC'],
    requiredSkills: ['PLC Automation', 'SCADA', 'Mechanical Tooling', 'Six Sigma', 'Automotive Rubber', 'Sheet Metal'],
    historicalGrowth: [
      { year: 2021, companies: 260, jobs: 620 },
      { year: 2022, companies: 275, jobs: 710 },
      { year: 2023, companies: 290, jobs: 790 },
      { year: 2024, companies: 300, jobs: 840 },
      { year: 2025, companies: 310, jobs: 890 }
    ]
  },
  {
    id: 'ev-auto',
    name: 'EV & Electric Mobility',
    icon: 'solar:bolt-bold-duotone',
    description: 'Emerging electric 2W/3W powertrain manufacturing, lithium battery pack assembly, smart tractor testing, and charging infra ecosystem.',
    totalCompanies: 35,
    totalJobs: 260,
    totalEmployment: 4800,
    growthRate: '+32.6% YoY',
    topCompanies: ['Mahindra EV Components', 'Zero Mile EV Pack', 'E-Volt Motors'],
    locations: ['Hingna MIDC', 'Butibori Industrial Area'],
    requiredSkills: ['BMS Calibration', 'CAN Bus Protocol', 'MATLAB Simulink', 'Thermal Runaway Safety', 'Electric Motors'],
    historicalGrowth: [
      { year: 2021, companies: 12, jobs: 60 },
      { year: 2022, companies: 18, jobs: 110 },
      { year: 2023, companies: 25, jobs: 170 },
      { year: 2024, companies: 30, jobs: 220 },
      { year: 2025, companies: 35, jobs: 260 }
    ]
  },
  {
    id: 'logistics-supply',
    name: 'Logistics, Warehousing & Supply Chain',
    icon: 'solar:box-minimalistic-bold-duotone',
    description: 'Leveraging Zero Mile geographical centrality, Samruddhi Expressway, and Multi-Modal Logistics Parks to distribute goods nationwide.',
    totalCompanies: 115,
    totalJobs: 420,
    totalEmployment: 16200,
    growthRate: '+21.5% YoY',
    topCompanies: ['Nagpur Multi-Modal Logistics Hub', 'Mahindra Logistics', 'DHL Supply Chain'],
    locations: ['Kalmeshwar', 'Zero Mile Hub', 'Butibori Expressway Node'],
    requiredSkills: ['Cold Chain Fleet', 'Warehouse Management Systems (WMS)', 'Freight Logistics', 'Inland Container Management'],
    historicalGrowth: [
      { year: 2021, companies: 65, jobs: 200 },
      { year: 2022, companies: 80, jobs: 270 },
      { year: 2023, companies: 95, jobs: 340 },
      { year: 2024, companies: 108, jobs: 380 },
      { year: 2025, companies: 115, jobs: 420 }
    ]
  },
  {
    id: 'data-centres',
    name: 'Data Centres & Cloud Infrastructure',
    icon: 'solar:server-bold-duotone',
    description: 'Hyperscale server farms, sovereign cloud nodes, and edge compute centers providing low-latency hosting across Central India.',
    totalCompanies: 14,
    totalJobs: 110,
    totalEmployment: 1800,
    growthRate: '+45.0% YoY',
    topCompanies: ['CtrlS Edge Data Center', 'Sify Cloud Hub', 'STT GDC Nagpur'],
    locations: ['MIHAN SEZ'],
    requiredSkills: ['HVAC Chillers', 'Rated-4 DC Operations', 'High-Voltage Power', 'Fiber Switching', 'Cloud Security'],
    historicalGrowth: [
      { year: 2021, companies: 4, jobs: 25 },
      { year: 2022, companies: 7, jobs: 45 },
      { year: 2023, companies: 10, jobs: 70 },
      { year: 2024, companies: 12, jobs: 90 },
      { year: 2025, companies: 14, jobs: 110 }
    ]
  },
  {
    id: 'agri-tech',
    name: 'Agri-Tech & Bio-Processing',
    icon: 'solar:leaf-bold-duotone',
    description: 'Citrus processing, bio-refineries, IoT crop telemetry, and cold storage networks processing Vidarbha agricultural bounty.',
    totalCompanies: 62,
    totalJobs: 190,
    totalEmployment: 7400,
    growthRate: '+14.8% YoY',
    topCompanies: ['BioCrop Tech', 'Nitin Spinners Agri', 'Vidarbha Citrus Co.'],
    locations: ['Central Nagpur', 'Kalmeshwar'],
    requiredSkills: ['Citrus Processing', 'Drone Agri-Telemetry', 'IoT Sensors', 'Cold Chain Tech'],
    historicalGrowth: [
      { year: 2021, companies: 40, jobs: 90 },
      { year: 2022, companies: 46, jobs: 120 },
      { year: 2023, companies: 52, jobs: 150 },
      { year: 2024, companies: 58, jobs: 175 },
      { year: 2025, companies: 62, jobs: 190 }
    ]
  }
];
