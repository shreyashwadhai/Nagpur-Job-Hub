export interface JobseekerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  headline: string;
  qualification: string;
  institute: string;
  yoe: string;
  location: string;
  primarySkills: string[];
  status: 'Active' | 'Open for Work' | 'Placed' | 'In Review';
  savedJobsCount: number;
  bio: string;
  linkedin: string;
  github: string;
  resumeName: string;
  expectedCtc: string;
  preferredLocation: string;
  appliedJobs: {
    jobId: string;
    jobTitle: string;
    companyName: string;
    appliedDate: string;
    status: 'Under Review' | 'Interview Scheduled' | 'Shortlisted' | 'Offered';
  }[];
}

export interface InstituteDetail {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  type: string;
  location: string;
  address: string;
  establishedYear: number;
  accreditation: string;
  deanName: string;
  contactEmail: string;
  phone: string;
  website: string;
  isPublicActive: boolean;
  enrolledStudentsCount: number;
  courses: {
    id: string;
    name: string;
    degree: string;
    duration: string;
    enrolledCount: number;
    applicantsCount: number;
    status: 'Active' | 'Draft';
  }[];
  campusDrives: {
    id: string;
    driveTitle: string;
    partnerCompany: string;
    partnerCompanyLogo: string;
    targetBatch: string;
    totalApplicants: number;
    date: string;
    status: 'Scheduled' | 'Completed' | 'Ongoing';
  }[];
  newsAndUpdates: {
    id: string;
    title: string;
    date: string;
    category: string;
    status: 'Approved' | 'Pending Review';
    isPublicVisible: boolean;
  }[];
}

export interface CompanyDrivePartnership {
  id: string;
  companyId: string;
  driveTitle: string;
  partnerInstitute: string;
  partnerInstituteLogo: string;
  programType: 'Joint Campus Drive' | 'Co-Op Internship' | 'Skill Workshop' | 'R&D Lab Sponsorship';
  date: string;
  totalApplicants: number;
  status: 'Completed' | 'Upcoming' | 'Active';
}

export const mockJobseekers: JobseekerDetail[] = [
  {
    id: 'js-101',
    name: 'Aarav Deshmukh',
    email: 'aarav.d@gmail.com',
    phone: '+91 98230 11420',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    headline: 'Senior Full Stack Engineer (React / Node / AWS)',
    qualification: 'B.Tech Computer Science',
    institute: 'Visvesvaraya National Institute of Technology (VNIT Nagpur)',
    yoe: '3.5 Yrs',
    location: 'Pratap Nagar, Nagpur',
    primarySkills: ['React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'PostgreSQL'],
    status: 'Open for Work',
    savedJobsCount: 8,
    expectedCtc: '₹12 - 15 LPA',
    preferredLocation: 'MIHAN SEZ / IT Park Parsodi / Remote',
    bio: 'Passionate Web Architect with 3+ years experience building scalable enterprise SaaS applications. Contributor to Vidarbha open-source tech initiatives.',
    linkedin: 'https://linkedin.com/in/aarav-deshmukh',
    github: 'https://github.com/aarav-dev',
    resumeName: 'Aarav_Deshmukh_FullStack_Resume.pdf',
    appliedJobs: [
      { jobId: 'job-101', jobTitle: 'Senior React & Node Developer', companyName: 'InfoCepts Technologies', appliedDate: '2026-09-10', status: 'Shortlisted' },
      { jobId: 'job-103', jobTitle: 'Full Stack Engineer', companyName: 'Persistent Systems', appliedDate: '2026-09-02', status: 'Interview Scheduled' },
      { jobId: 'job-106', jobTitle: 'Cloud Solutions Architect', companyName: 'CtrlS Edge Data Center', appliedDate: '2026-08-28', status: 'Under Review' }
    ]
  },
  {
    id: 'js-102',
    name: 'Sneha Kulkarni',
    email: 'sneha.k@gmail.com',
    phone: '+91 94221 88301',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    headline: 'Data Scientist & Machine Learning Specialist',
    qualification: 'M.Tech AI & Data Science',
    institute: 'Indian Institute of Information Technology (IIIT Nagpur)',
    yoe: '2 Yrs',
    location: 'Dharampeth, Nagpur',
    primarySkills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Data Analytics', 'NLP'],
    status: 'Active',
    savedJobsCount: 12,
    expectedCtc: '₹10 - 14 LPA',
    preferredLocation: 'MIHAN SEZ Nagpur',
    bio: 'Specialized in Predictive Analytics & Large Language Model fine-tuning. Winner of National AI Hackathon 2025.',
    linkedin: 'https://linkedin.com/in/sneha-kulkarni-ai',
    github: 'https://github.com/sneha-ai-labs',
    resumeName: 'Sneha_Kulkarni_ML_Specialist.pdf',
    appliedJobs: [
      { jobId: 'job-102', jobTitle: 'Lead Data Analytics Engineer', companyName: 'InfoCepts Technologies', appliedDate: '2026-09-12', status: 'Interview Scheduled' },
      { jobId: 'job-107', jobTitle: 'AI Research Associate', companyName: 'HCLTech Nagpur Campus', appliedDate: '2026-09-05', status: 'Under Review' }
    ]
  },
  {
    id: 'js-103',
    name: 'Rohan Wankhede',
    email: 'rohan.w@yahoo.com',
    phone: '+91 97644 32901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    headline: 'Aerospace Mechanical CAD Design Engineer',
    qualification: 'B.E. Mechanical Engineering',
    institute: 'Shri Ramdeobaba College of Engineering and Management (RKNEC)',
    yoe: '4 Yrs',
    location: 'Hingna Road, Nagpur',
    primarySkills: ['CATIA V5', 'ANSYS', 'SolidWorks', 'GD&T', 'Aerostructures', 'CNC Programming'],
    status: 'Placed',
    savedJobsCount: 4,
    expectedCtc: '₹8 - 11 LPA',
    preferredLocation: 'Hingna MIDC / MIHAN SEZ Aerospace Hub',
    bio: 'Experienced Aerospace Structures CAD Designer with hands-on expertise in precision tooling and sheet metal aero-assembly.',
    linkedin: 'https://linkedin.com/in/rohan-wankhede',
    github: 'https://github.com/rohan-cad',
    resumeName: 'Rohan_Wankhede_Aerospace_CAD.pdf',
    appliedJobs: [
      { jobId: 'job-104', jobTitle: 'Avionics & Aero-Structures Engineer', companyName: 'Dassault Reliance Aerospace (DRAL)', appliedDate: '2026-08-15', status: 'Offered' }
    ]
  },
  {
    id: 'js-104',
    name: 'Pooja Patil',
    email: 'pooja.patil@ghrce.edu.in',
    phone: '+91 91588 44029',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    headline: 'Cyber Security & DevSecOps Analyst',
    qualification: 'B.Tech Information Technology',
    institute: 'G.H. Raisoni College of Engineering (GHRCE)',
    yoe: '1.5 Yrs',
    location: 'Wardha Road, Nagpur',
    primarySkills: ['SIEM', 'Network Security', 'Docker', 'Kubernetes', 'Linux Audit', 'Burp Suite'],
    status: 'Open for Work',
    savedJobsCount: 6,
    expectedCtc: '₹7 - 9 LPA',
    preferredLocation: 'MIHAN SEZ / IT Park Parsodi',
    bio: 'Certified Ethical Hacker (CEH) with proven track record in penetration testing & cloud security compliance.',
    linkedin: 'https://linkedin.com/in/pooja-patil-security',
    github: 'https://github.com/poojapatil-sec',
    resumeName: 'Pooja_Patil_Security_Resume.pdf',
    appliedJobs: [
      { jobId: 'job-105', jobTitle: 'SOC Security Analyst', companyName: 'CtrlS Edge Data Center', appliedDate: '2026-09-08', status: 'Under Review' },
      { jobId: 'job-108', jobTitle: 'DevOps & Cyber Security Engineer', companyName: 'Persistent Systems', appliedDate: '2026-08-20', status: 'Shortlisted' }
    ]
  },
  {
    id: 'js-105',
    name: 'Tushar Agrawal',
    email: 'tushar.a@gmail.com',
    phone: '+91 98902 55190',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    headline: 'EV Drivetrain & Embedded Systems Specialist',
    qualification: 'M.Tech Electrical Engineering',
    institute: 'Visvesvaraya National Institute of Technology (VNIT Nagpur)',
    yoe: '5 Yrs',
    location: 'Khamla, Nagpur',
    primarySkills: ['Embedded C', 'MATLAB Simulink', 'CAN Protocol', 'BMS Design', 'EV Motors'],
    status: 'Active',
    savedJobsCount: 9,
    expectedCtc: '₹14 - 18 LPA',
    preferredLocation: 'Butibori Heavy MIDC / Hingna MIDC',
    bio: 'Lead Engineer specializing in Electric Vehicle Battery Management Systems (BMS) and motor inverter hardware design.',
    linkedin: 'https://linkedin.com/in/tushar-agrawal-ev',
    github: 'https://github.com/tushar-embedded',
    resumeName: 'Tushar_Agrawal_EV_Systems.pdf',
    appliedJobs: [
      { jobId: 'job-109', jobTitle: 'Senior EV Drivetrain Lead', companyName: 'Mahindra Unnati EV Park', appliedDate: '2026-09-11', status: 'Interview Scheduled' }
    ]
  }
];

export const mockInstitutes: InstituteDetail[] = [
  {
    id: 'inst-1',
    name: 'Visvesvaraya National Institute of Technology',
    shortName: 'VNIT Nagpur',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120',
    type: 'Tier-1 National Institute of Importance',
    location: 'South Ambazari Road, Nagpur',
    address: 'South Ambazari Road, Abhyankar Nagar, Nagpur - 440010',
    establishedYear: 1960,
    accreditation: 'NIRF Rank #41 (Engineering) • NAAC A++',
    deanName: 'Dr. Pramod M. Padole',
    contactEmail: 'placements@vnit.ac.in',
    phone: '+91 712 280 1370',
    website: 'https://vnit.ac.in',
    isPublicActive: true,
    enrolledStudentsCount: 5200,
    courses: [
      { id: 'c-101', name: 'B.Tech Computer Science & Engineering', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 520, applicantsCount: 140, status: 'Active' },
      { id: 'c-102', name: 'B.Tech Electronics & Communication', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 480, applicantsCount: 110, status: 'Active' },
      { id: 'c-103', name: 'M.Tech AI & Data Science', degree: 'Postgraduate', duration: '2 Years', enrolledCount: 160, applicantsCount: 85, status: 'Active' },
      { id: 'c-104', name: 'B.Tech Mechanical Engineering', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 540, applicantsCount: 95, status: 'Active' }
    ],
    campusDrives: [
      { id: 'drv-1', driveTitle: 'VNIT Tech Placement Drive 2026', partnerCompany: 'InfoCepts Technologies', partnerCompanyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=80', targetBatch: 'Batch 2026 B.Tech/M.Tech', totalApplicants: 320, date: '2026-10-15', status: 'Scheduled' },
      { id: 'drv-2', driveTitle: 'Aerospace R&D Co-Op Drive', partnerCompany: 'Dassault Reliance Aerospace (DRAL)', partnerCompanyLogo: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=80', targetBatch: 'B.Tech Mech & Aero 2026', totalApplicants: 180, date: '2026-09-20', status: 'Ongoing' },
      { id: 'drv-3', driveTitle: 'Cloud Infrastructure Hackathon & Drive', partnerCompany: 'CtrlS Edge Data Center', partnerCompanyLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=80', targetBatch: 'M.Tech CS & Electrical', totalApplicants: 210, date: '2026-08-10', status: 'Completed' }
    ],
    newsAndUpdates: [
      { id: 'inews-1', title: 'VNIT Inks MoU with Dassault Systems for Advanced Aero-Design Lab', date: '2026-09-14', category: 'R&D Collaboration', status: 'Approved', isPublicVisible: true },
      { id: 'inews-2', title: 'Annual Placement Report: Highest CTC ₹42 LPA for MIHAN SEZ Tech Firms', date: '2026-09-02', category: 'Placement Record', status: 'Approved', isPublicVisible: true },
      { id: 'inews-3', title: 'VNIT EV Formula Racing Team Unveils 48V Drivetrain Prototype', date: '2026-08-25', category: 'Student Achievement', status: 'Pending Review', isPublicVisible: false }
    ]
  },
  {
    id: 'inst-2',
    name: 'Indian Institute of Information Technology',
    shortName: 'IIIT Nagpur',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=120',
    type: 'Institute of National Importance (PPP)',
    location: 'Waranga, MIHAN SEZ Boundary, Nagpur',
    address: 'Survey No. 140, 141/1 Waranga, PO Dongargaon, Nagpur - 441108',
    establishedYear: 2016,
    accreditation: 'MoE India Recognized Institute of Excellence',
    deanName: 'Dr. O.G. Kakde',
    contactEmail: 'tnp@iiitn.ac.in',
    phone: '+91 712 298 5010',
    website: 'https://iiitn.ac.in',
    isPublicActive: true,
    enrolledStudentsCount: 2100,
    courses: [
      { id: 'c-201', name: 'B.Tech Computer Science & Engineering (AI & ML)', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 420, applicantsCount: 165, status: 'Active' },
      { id: 'c-202', name: 'B.Tech Data Science & Analytics', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 380, applicantsCount: 130, status: 'Active' },
      { id: 'c-203', name: 'B.Tech Cyber Security & IoT', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 320, applicantsCount: 90, status: 'Active' }
    ],
    campusDrives: [
      { id: 'drv-4', driveTitle: 'IIITN - Persistent Enterprise AI Drive', partnerCompany: 'Persistent Systems', partnerCompanyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=80', targetBatch: 'Batch 2026 CSE & Data Science', totalApplicants: 290, date: '2026-10-05', status: 'Scheduled' },
      { id: 'drv-5', driveTitle: 'MIHAN SEZ IT Fast-Track Internship Fair', partnerCompany: 'InfoCepts Technologies', partnerCompanyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=80', targetBatch: 'Batch 2027 Pre-Final Year', totalApplicants: 340, date: '2026-09-01', status: 'Completed' }
    ],
    newsAndUpdates: [
      { id: 'inews-4', title: 'IIIT Nagpur Inaugurates High-Performance Cloud Computing Cluster in MIHAN', date: '2026-09-12', category: 'Infrastructure Expansion', status: 'Approved', isPublicVisible: true },
      { id: 'inews-5', title: 'IIITN Hackathon 2026 Sponsored by InfoCepts Features ₹5 Lakh Prize Pool', date: '2026-08-30', category: 'Hackathon & Industry', status: 'Approved', isPublicVisible: true }
    ]
  },
  {
    id: 'inst-3',
    name: 'Shri Ramdeobaba College of Engineering and Management',
    shortName: 'RKNEC Nagpur',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=120',
    type: 'Autonomous Technical Institute',
    location: 'Katol Road, Gittikhadan, Nagpur',
    address: 'Ramdeo Tekdi, Katol Road, Gittikhadan, Nagpur - 440013',
    establishedYear: 1984,
    accreditation: 'NAAC A+ Grade • NBA Accredited Programs',
    deanName: 'Dr. Rajesh Pande',
    contactEmail: 'placement@rknec.edu',
    phone: '+91 712 258 0011',
    website: 'https://rknec.edu',
    isPublicActive: true,
    enrolledStudentsCount: 4600,
    courses: [
      { id: 'c-301', name: 'B.Tech Information Technology', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 480, applicantsCount: 155, status: 'Active' },
      { id: 'c-302', name: 'B.Tech Robotics & Industrial Automation', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 240, applicantsCount: 80, status: 'Active' },
      { id: 'c-303', name: 'MCA (Master of Computer Applications)', degree: 'Postgraduate', duration: '2 Years', enrolledCount: 180, applicantsCount: 65, status: 'Active' }
    ],
    campusDrives: [
      { id: 'drv-6', driveTitle: 'RKNEC Mega Campus Recruitment Week', partnerCompany: 'HCLTech Nagpur Campus', partnerCompanyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=80', targetBatch: 'All Engineering Streams 2026', totalApplicants: 540, date: '2026-10-20', status: 'Scheduled' }
    ],
    newsAndUpdates: [
      { id: 'inews-6', title: 'RKNEC Robotics Lab Partnered with Hingna MIDC Automation Association', date: '2026-09-08', category: 'Industry Tie-up', status: 'Approved', isPublicVisible: true }
    ]
  },
  {
    id: 'inst-4',
    name: 'G.H. Raisoni College of Engineering',
    shortName: 'GHRCE Nagpur',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120',
    type: 'Autonomous College of Engineering',
    location: 'CRPF Gate No. 3, Hingna Road, Nagpur',
    address: 'Digdoh Hills, Hingna Road, Nagpur - 440016',
    establishedYear: 1996,
    accreditation: 'NAAC A+ Grade • Autonomous Campus',
    deanName: 'Dr. Sachin Untawale',
    contactEmail: 'principal.ghrce@raisoni.net',
    phone: '+91 7104 236 102',
    website: 'https://ghrce.raisoni.net',
    isPublicActive: true,
    enrolledStudentsCount: 4100,
    courses: [
      { id: 'c-401', name: 'B.Tech Computer Science & Engineering', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 600, applicantsCount: 170, status: 'Active' },
      { id: 'c-402', name: 'B.Tech Electrical & EV Engineering', degree: 'Undergraduate', duration: '4 Years', enrolledCount: 300, applicantsCount: 75, status: 'Active' }
    ],
    campusDrives: [
      { id: 'drv-7', driveTitle: 'GHRCE Electric Mobility Placement Drive', partnerCompany: 'Mahindra Unnati EV Park', partnerCompanyLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=80', targetBatch: 'Electrical & Mech 2026', totalApplicants: 220, date: '2026-09-18', status: 'Ongoing' }
    ],
    newsAndUpdates: [
      { id: 'inews-7', title: 'GHRCE Students Win Vidarbha Green Tech Innovation Award', date: '2026-09-10', category: 'Awards', status: 'Pending Review', isPublicVisible: false }
    ]
  }
];

export const mockCompanyDrivePartnerships: CompanyDrivePartnership[] = [
  {
    id: 'cdp-1',
    companyId: 'infocepts-technologies',
    driveTitle: 'Data & Analytics Graduate Hiring Drive',
    partnerInstitute: 'Visvesvaraya National Institute of Technology (VNIT)',
    partnerInstituteLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120',
    programType: 'Joint Campus Drive',
    date: '2026-10-15',
    totalApplicants: 320,
    status: 'Upcoming'
  },
  {
    id: 'cdp-2',
    companyId: 'infocepts-technologies',
    driveTitle: 'MIHAN SEZ AI Fast-Track Internship Program',
    partnerInstitute: 'Indian Institute of Information Technology (IIIT Nagpur)',
    partnerInstituteLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=120',
    programType: 'Co-Op Internship',
    date: '2026-09-01',
    totalApplicants: 340,
    status: 'Completed'
  },
  {
    id: 'cdp-3',
    companyId: 'dassault-reliance-aerospace',
    driveTitle: 'Aero-Structures CAD & CNC Apprenticeship Drive',
    partnerInstitute: 'Visvesvaraya National Institute of Technology (VNIT)',
    partnerInstituteLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120',
    programType: 'Joint Campus Drive',
    date: '2026-09-20',
    totalApplicants: 180,
    status: 'Active'
  },
  {
    id: 'cdp-4',
    companyId: 'persistent-systems',
    driveTitle: 'Enterprise Cloud & AI Hackathon',
    partnerInstitute: 'Indian Institute of Information Technology (IIIT Nagpur)',
    partnerInstituteLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=120',
    programType: 'Skill Workshop',
    date: '2026-10-05',
    totalApplicants: 290,
    status: 'Upcoming'
  },
  {
    id: 'cdp-5',
    companyId: 'ctrls-datacenter-nagpur',
    driveTitle: 'Cloud Data Center Operations Co-Op Program',
    partnerInstitute: 'Shri Ramdeobaba College of Engineering (RKNEC)',
    partnerInstituteLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=120',
    programType: 'Co-Op Internship',
    date: '2026-08-10',
    totalApplicants: 210,
    status: 'Completed'
  }
];
