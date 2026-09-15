import type { Institution, SkillMetric } from '../types';

export const mockSkills: SkillMetric[] = [
  {
    id: 'skill-react-ts',
    skillName: 'React.js & TypeScript',
    category: 'IT & Software',
    demandScore: 94,
    supplyScore: 68,
    topHiringCompanies: ['Persistent Systems', 'InfoCepts', 'HCLTech'],
    growthYoY: '+34%'
  },
  {
    id: 'skill-snowflake-pyspark',
    skillName: 'Snowflake & PySpark',
    category: 'Data & AI',
    demandScore: 98,
    supplyScore: 42,
    topHiringCompanies: ['InfoCepts', 'HCLTech', 'CtrlS Data Center'],
    growthYoY: '+52%'
  },
  {
    id: 'skill-catia-aerospace',
    skillName: 'CATIA V6 & Aerostructures',
    category: 'Defence & Aerospace',
    demandScore: 89,
    supplyScore: 50,
    topHiringCompanies: ['Dassault Reliance (DRAL)', 'Tata Advanced Systems'],
    growthYoY: '+28%'
  },
  {
    id: 'skill-bms-ev',
    skillName: 'BMS & EV Battery Calibration',
    category: 'EV & Mobility',
    demandScore: 91,
    supplyScore: 35,
    topHiringCompanies: ['Mahindra EV Components', 'Zero Mile Pack'],
    growthYoY: '+64%'
  },
  {
    id: 'skill-plc-scada',
    skillName: 'PLC Automation & SCADA',
    category: 'Manufacturing',
    demandScore: 85,
    supplyScore: 72,
    topHiringCompanies: ['CEAT Tyres', 'JSW Steel', 'Solar Industries'],
    growthYoY: '+15%'
  },
  {
    id: 'skill-wms-coldchain',
    skillName: 'Warehouse WMS & Cold Chain',
    category: 'Logistics',
    demandScore: 82,
    supplyScore: 60,
    topHiringCompanies: ['Nagpur Multi-Modal Logistics', 'DHL Supply Chain'],
    growthYoY: '+22%'
  }
];

export const mockInstitutions: Institution[] = [
  {
    id: 'vnit-nagpur',
    name: 'Visvesvaraya National Institute of Technology (VNIT)',
    shortName: 'VNIT Nagpur',
    type: 'Tier-1 Tech Institute',
    location: 'South Ambazari Road, Nagpur',
    courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech VLSI & Microelectronics', 'M.Tech Data Science'],
    studentCount: 4500,
    keyMoUs: ['InfoCepts AI Lab MoU', 'Solar Industries Defence Metallurgy Research', 'Dassault CAD Center'],
    website: 'https://vnit.ac.in',
    coordinates: { lat: 21.1255, lng: 79.0512 }
  },
  {
    id: 'iiit-nagpur',
    name: 'Indian Institute of Information Technology Nagpur',
    shortName: 'IIIT Nagpur',
    type: 'Tier-1 Tech Institute',
    location: 'Waranga, MIHAN Link Road, Nagpur',
    courses: ['B.Tech Computer Science & Engineering', 'B.Tech Artificial Intelligence & Data Science', 'B.Tech Electronics & IoT'],
    studentCount: 2200,
    keyMoUs: ['Persistent Systems Product Incubator', 'CtrlS Cloud Infra Security'],
    website: 'https://iiitn.ac.in',
    coordinates: { lat: 21.0180, lng: 79.0220 }
  },
  {
    id: 'rcoem-nagpur',
    name: 'Shri Ramdeobaba College of Engineering & Management',
    shortName: 'RCOEM Nagpur',
    type: 'Engineering & Tech College',
    location: 'Katol Road, Nagpur',
    courses: ['B.Tech Computer Engineering', 'B.Tech Electric Vehicles & Mechatronics', 'B.Tech Industrial Engineering'],
    studentCount: 5800,
    keyMoUs: ['CEAT Tyres Robotics & Automation COE', 'HCLTech TechBee Training Hub'],
    website: 'https://www.rknec.edu',
    coordinates: { lat: 21.1780, lng: 79.0620 }
  },
  {
    id: 'govt-poly-nagpur',
    name: 'Government Polytechnic Nagpur',
    shortName: 'GP Nagpur',
    type: 'Skill & Vocational Center',
    location: 'Sadar, Nagpur',
    courses: ['Diploma in CNC Machining', 'Diploma in EV Battery Maintenance', 'Diploma in Industrial Electricals'],
    studentCount: 3200,
    keyMoUs: ['Mahindra EV Skilled Technician Drive', 'JSW Steel Fabrication Academy'],
    website: 'https://gpnagpur.ac.in',
    coordinates: { lat: 21.1620, lng: 79.0810 }
  }
];
