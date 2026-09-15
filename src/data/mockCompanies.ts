import type { Company } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'infocepts-nagpur',
    name: 'InfoCepts Technologies',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'IT & Data Analytics',
    industryId: 'it-software',
    location: 'MIHAN SEZ, Nagpur',
    sezZone: 'MIHAN SEZ',
    employeeBand: '1,000 - 5,000',
    entryYear: 2004,
    businessFocus: 'Enterprise Data Engineering, AI Solutions & Business Intelligence',
    overview: 'InfoCepts is a global data solutions firm headquartered in Nagpur with its primary delivery hub in MIHAN SEZ. Specializes in modern data stack implementation, Cloud Analytics, and custom AI copilots for Fortune 500 enterprises.',
    localLeadership: {
      name: 'Shashank Garg',
      title: 'Co-Founder & Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 1400 },
      { year: 2021, headcount: 1800 },
      { year: 2022, headcount: 2300 },
      { year: 2023, headcount: 2800 },
      { year: 2024, headcount: 3400 },
      { year: 2025, headcount: 4100 }
    ],
    website: 'https://www.infocepts.ai',
    coordinates: { lat: 21.0548, lng: 79.0278 },
    contactEmail: 'nagpur-careers@infocepts.com',
    phone: '+91 712 668 1111',
    tags: ['Data Engineering', 'AI/ML', 'Cloud Analytics', 'MIHAN Anchor'],
    certifications: ['CMMI Level 5', 'ISO 27001', 'SOC 2 Type II']
  },
  {
    id: 'persistent-systems-nagpur',
    name: 'Persistent Systems',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'IT & Software Services',
    industryId: 'it-software',
    location: 'IT Park, Parsodi, Nagpur',
    sezZone: 'IT Park Parsodi',
    employeeBand: '1,000 - 5,000',
    entryYear: 2002,
    businessFocus: 'Digital Engineering, Enterprise Modernization & Software Product Development',
    overview: 'Persistent Systems operates a state-of-the-art software development center at IT Park Parsodi, contributing significantly to Nagpur tech ecosystem growth and software exports.',
    localLeadership: {
      name: 'Anand Deshpande',
      title: 'Founder & Executive Chairman',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 1200 },
      { year: 2021, headcount: 1500 },
      { year: 2022, headcount: 2100 },
      { year: 2023, headcount: 2600 },
      { year: 2024, headcount: 3100 },
      { year: 2025, headcount: 3700 }
    ],
    website: 'https://www.persistent.com',
    coordinates: { lat: 21.1228, lng: 79.0494 },
    contactEmail: 'nagpur.hr@persistent.com',
    phone: '+91 712 669 2200',
    tags: ['Software Products', 'Cloud Native', 'Digital Health', 'Parsodi IT Park']
  },
  {
    id: 'hcltech-nagpur',
    name: 'HCLTech Nagpur Campus',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'IT & Enterprise Technology',
    industryId: 'it-software',
    location: 'MIHAN SEZ, Nagpur',
    sezZone: 'MIHAN SEZ',
    employeeBand: '5,000 - 10,000',
    entryYear: 2018,
    businessFocus: 'IT Infrastructure, Telecom Solutions, Engineering Services & R&D',
    overview: 'HCLTech’s modern 50-acre eco-friendly campus in MIHAN SEZ is one of the largest IT employers in Central India, driving tech employment and skilled talent retention in Vidarbha.',
    localLeadership: {
      name: 'Srimathi Shivashankar',
      title: 'VP & Nagpur Delivery Campus Head',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 2500 },
      { year: 2021, headcount: 3800 },
      { year: 2022, headcount: 5200 },
      { year: 2023, headcount: 6800 },
      { year: 2024, headcount: 8200 },
      { year: 2025, headcount: 9500 }
    ],
    website: 'https://www.hcltech.com',
    coordinates: { lat: 21.0592, lng: 79.0315 },
    contactEmail: 'careers.nagpur@hcl.com',
    phone: '+91 712 710 3000',
    tags: ['MIHAN Mega Campus', 'Cloud Managed Services', 'Engineering R&D', 'Global Talent']
  },
  {
    id: 'solar-industries',
    name: 'Solar Industries India Ltd',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'Defence & Industrial Explosives',
    industryId: 'defence-aerospace',
    location: 'Chakdoh, Bazargaon / Hingna, Nagpur',
    sezZone: 'Hingna MIDC',
    employeeBand: '2,500 - 5,000',
    entryYear: 1995,
    businessFocus: 'Defence Ammunition, Industrial Explosives, Pinaka Rockets & Rocket Motors',
    overview: 'Solar Industries is India’s premier defence manufacturing powerhouse headquartered in Nagpur. It manufactures advanced munitions, drone payloads, and solid propellant rocket motors for Armed Forces and global markets.',
    localLeadership: {
      name: 'Satyanarayan Nuwal',
      title: 'Chairman & Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 2200 },
      { year: 2021, headcount: 2600 },
      { year: 2022, headcount: 3100 },
      { year: 2023, headcount: 3800 },
      { year: 2024, headcount: 4500 },
      { year: 2025, headcount: 5200 }
    ],
    website: 'https://solargroup.com',
    coordinates: { lat: 21.1167, lng: 78.9833 },
    contactEmail: 'info@solargroup.com',
    phone: '+91 712 663 4555',
    tags: ['Defence PSU Supplier', 'Pinaka Rocket', 'Make In India', 'Hingna Base']
  },
  {
    id: 'dassault-reliance-aerospace',
    name: 'Dassault Reliance Aerospace Ltd (DRAL)',
    logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'Defence & Aerospace Manufacturing',
    industryId: 'defence-aerospace',
    location: 'MIHAN SEZ, Nagpur',
    sezZone: 'MIHAN SEZ',
    employeeBand: '500 - 1,000',
    entryYear: 2017,
    businessFocus: 'Rafale Fighter Jet Aerostructures, Falcon 2000 Business Jet Sub-assemblies',
    overview: 'DRAL is a flagship joint venture between Dassault Aviation and Reliance Aerostructure, manufacturing components for Rafale fighters and Falcon business jets inside MIHAN SEZ.',
    localLeadership: {
      name: 'Sampathkumar Sampath',
      title: 'Chief Operating Officer',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 350 },
      { year: 2021, headcount: 480 },
      { year: 2022, headcount: 620 },
      { year: 2023, headcount: 780 },
      { year: 2024, headcount: 910 },
      { year: 2025, headcount: 1050 }
    ],
    website: 'https://www.dral.in',
    coordinates: { lat: 21.0512, lng: 79.0225 },
    contactEmail: 'contact@dral.in',
    phone: '+91 712 674 9000',
    tags: ['Rafale Aerostructures', 'Falcon 2000', 'MIHAN Aerospace', 'Precision Metal']
  },
  {
    id: 'tata-advanced-systems-butibori',
    name: 'Tata Advanced Systems Limited',
    logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'Defence & Advanced Engineering',
    industryId: 'defence-aerospace',
    location: 'Butibori Industrial Area, Nagpur',
    sezZone: 'Butibori Industrial Area',
    employeeBand: '500 - 1,000',
    entryYear: 2019,
    businessFocus: 'Tactical Communication Systems, Armored Vehicles & Aerospace Parts',
    overview: 'Tata Advanced Systems operates a high-precision defence assembly plant in Butibori, focusing on radar systems, armored troop carriers, and tactical electronics for the Indian Armed Forces.',
    localLeadership: {
      name: 'Rajiv Malhotra',
      title: 'Plant Operations Head',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 280 },
      { year: 2021, headcount: 410 },
      { year: 2022, headcount: 560 },
      { year: 2023, headcount: 720 },
      { year: 2024, headcount: 880 }
    ],
    website: 'https://www.tataadvancedsystems.com',
    coordinates: { lat: 20.9167, lng: 78.9667 },
    contactEmail: 'careers.butibori@tatasystems.com',
    phone: '+91 712 690 1200',
    tags: ['Defence Armored Vehicles', 'Butibori MIDC', 'Tata Group', 'Electronics Assembly']
  },
  {
    id: 'ceat-tyres-butibori',
    name: 'CEAT Tyres India - Butibori Plant',
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'Manufacturing & Automotive',
    industryId: 'manufacturing-auto',
    location: 'Butibori Industrial Area, Nagpur',
    sezZone: 'Butibori Industrial Area',
    employeeBand: '1,000 - 2,500',
    entryYear: 2016,
    businessFocus: 'Automotive Rubber Manufacturing, Smart Tyre Tech & Export Grade Radials',
    overview: 'CEAT Tyres Nagpur facility in Butibori is one of Asia’s most automated tyre manufacturing plants, producing over 15,000 radial tyres daily for domestic EV automakers and European exports.',
    localLeadership: {
      name: 'Milind Deshmukh',
      title: 'Senior Vice President - Manufacturing',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 1100 },
      { year: 2021, headcount: 1350 },
      { year: 2022, headcount: 1600 },
      { year: 2023, headcount: 1850 },
      { year: 2024, headcount: 2100 }
    ],
    website: 'https://www.ceat.com',
    coordinates: { lat: 20.9250, lng: 78.9720 },
    contactEmail: 'butibori.plant@ceat.com',
    phone: '+91 712 688 7700',
    tags: ['Automated Plant', 'Butibori MIDC', 'EV Radial Tyres', 'RPG Group']
  },
  {
    id: 'mahindra-unnati-ev',
    name: 'Mahindra EV Components & Agri Tech',
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'EV & Electric Mobility',
    industryId: 'ev-auto',
    location: 'Hingna MIDC, Nagpur',
    sezZone: 'Hingna MIDC',
    employeeBand: '500 - 1,000',
    entryYear: 2021,
    businessFocus: 'Electric 3-Wheeler Drive Assemblies, Battery Pack Integration & Smart Tractors',
    overview: 'Mahindra Electric Mobility center in Hingna manufactures powertrain components for electric commercial vehicles and testing facilities for smart agricultural EV tractors.',
    localLeadership: {
      name: 'Vikram Joshi',
      title: 'EV Manufacturing Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2021, headcount: 200 },
      { year: 2022, headcount: 380 },
      { year: 2023, headcount: 540 },
      { year: 2024, headcount: 750 }
    ],
    website: 'https://www.mahindraelectric.com',
    coordinates: { lat: 21.1120, lng: 78.9910 },
    contactEmail: 'ev.nagpur@mahindra.com',
    phone: '+91 712 660 8899',
    tags: ['Electric Mobility', 'Hingna MIDC', 'Battery Assembly', 'Smart Agri']
  },
  {
    id: 'ctrls-datacenter-nagpur',
    name: 'CtrlS Edge Data Center',
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&auto=format&fit=crop&q=80',
    verified: false,
    verificationStatus: 'estimated',
    industry: 'Data Centres & Cloud Infra',
    industryId: 'data-centres',
    location: 'MIHAN SEZ, Nagpur',
    sezZone: 'MIHAN SEZ',
    employeeBand: '100 - 250',
    entryYear: 2023,
    businessFocus: 'Hyperscale Data Hub, Sovereign Cloud Infrastructure & Cross-Country Fiber Termination',
    overview: 'CtrlS Datacenters is building a Rated-4 Hyperscale Data Center campus in MIHAN SEZ to serve central India financial nodes, government cloud infrastructure, and low-latency OTT caching.',
    localLeadership: {
      name: 'Sridhar Pinnapureddy',
      title: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2023, headcount: 50 },
      { year: 2024, headcount: 120 },
      { year: 2025, headcount: 190 }
    ],
    website: 'https://www.ctrls.in',
    coordinates: { lat: 21.0480, lng: 79.0340 },
    contactEmail: 'nagpur.dc@ctrls.in',
    phone: '+91 712 699 4433',
    tags: ['Rated-4 Data Center', 'MIHAN SEZ', 'Green Solar Powered', 'Hyperscale']
  },
  {
    id: 'samruddhi-logistics-park',
    name: 'Nagpur Multi-Modal Logistics Hub',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'Logistics & Warehousing',
    industryId: 'logistics-supply',
    location: 'Kalmeshwar Industrial Zone, Nagpur',
    sezZone: 'Kalmeshwar',
    employeeBand: '500 - 1,000',
    entryYear: 2022,
    businessFocus: 'Cold Chain Warehousing, Samruddhi Highway Cargo Freight & Inland Container Depot',
    overview: 'Capitalizing on Nagpur position as the geographical center of India (Zero Mile), this logistics hub connects Samruddhi Mahamarg, National Highway 44, and Broad Gauge Metro for rapid cargo distribution.',
    localLeadership: {
      name: 'Rameshwar Patil',
      title: 'Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2022, headcount: 300 },
      { year: 2023, headcount: 490 },
      { year: 2024, headcount: 680 }
    ],
    website: 'https://www.nagpurlogistics.org',
    coordinates: { lat: 21.2333, lng: 78.9167 },
    contactEmail: 'operations@nagpurlogistics.org',
    phone: '+91 712 770 1100',
    tags: ['Zero Mile Hub', 'Cold Chain', 'Samruddhi Expressway', 'Container Depot']
  },
  {
    id: 'jsw-steel-kalmeshwar',
    name: 'JSW Coated Steel Works',
    logo: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=120&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    industry: 'Manufacturing & Heavy Metals',
    industryId: 'manufacturing-auto',
    location: 'Kalmeshwar MIDC, Nagpur',
    sezZone: 'Kalmeshwar',
    employeeBand: '1,000 - 2,500',
    entryYear: 1998,
    businessFocus: 'Galvanized Steel Coils, Pre-painted Roofing Sheets & Automotive Grade Sheet Metal',
    overview: 'JSW Steel’s Kalmeshwar facility is an established landmark plant producing color-coated profile sheets and galvanized coils powering infrastructure construction across Central India.',
    localLeadership: {
      name: 'Subhashish Das',
      title: 'Senior VP Kalmeshwar Operations',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2020, headcount: 1400 },
      { year: 2021, headcount: 1550 },
      { year: 2022, headcount: 1680 },
      { year: 2023, headcount: 1800 }
    ],
    website: 'https://www.jswsteel.in',
    coordinates: { lat: 21.2400, lng: 78.9220 },
    contactEmail: 'kalmeshwar@jsw.in',
    phone: '+91 712 682 9900',
    tags: ['Steel Coils', 'Kalmeshwar MIDC', 'JSW Group', 'Heavy Industry']
  },
  {
    id: 'nagpur-agritech-innovations',
    name: 'BioCrop Tech & Orange Processing Park',
    logo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=120&auto=format&fit=crop&q=80',
    verified: false,
    verificationStatus: 'public',
    industry: 'Agri-Tech & Food Processing',
    industryId: 'agri-tech',
    location: 'Central Nagpur Industrial Area',
    sezZone: 'Central Nagpur',
    employeeBand: '250 - 500',
    entryYear: 2020,
    businessFocus: 'Citrus Extract Bio-refining, Drone Crop Analytics & Cold Storage Tech',
    overview: 'Harvesting Vidarbha famous orange belt, BioCrop Tech integrates IoT soil sensors, drone spraying services, and citrus waste bio-refining into high-value pectin exports.',
    localLeadership: {
      name: 'Dr. Sunita Kulkarni',
      title: 'Chief Scientific Officer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80'
    },
    growthTrajectory: [
      { year: 2021, headcount: 120 },
      { year: 2022, headcount: 220 },
      { year: 2023, headcount: 310 }
    ],
    website: 'https://www.biocropnagpur.com',
    coordinates: { lat: 21.1458, lng: 79.0882 },
    contactEmail: 'info@biocropnagpur.com',
    phone: '+91 712 654 3210',
    tags: ['Nagpur Orange Cluster', 'Agri-IoT', 'Drone Sensors', 'Citrus Processing']
  }
];
