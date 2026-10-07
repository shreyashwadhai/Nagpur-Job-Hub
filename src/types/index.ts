export type VerificationStatus = 'verified' | 'estimated' | 'public' | 'pending';
export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';
export type ImpactLevel = 'High' | 'Medium' | 'Low';
export type UserRole = 'jobseeker' | 'company' | 'admin' | 'institute';

export interface CoursePost {
  id: string;
  instituteId: string;
  instituteName: string;
  title: string;
  category: 'Degree Program' | 'Diploma' | 'Certification' | 'Skill Workshop' | 'Internship Drive';
  duration: string;
  eligibility: string;
  feesOrStipend: string;
  description: string;
  postedDate: string;
  applyLink?: string;
  status: 'Active' | 'Draft';
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  industry: string;
  industryId: string;
  location: string;
  sezZone: 'MIHAN SEZ' | 'Hingna MIDC' | 'Butibori Industrial Area' | 'IT Park Parsodi' | 'Kalmeshwar' | 'Central Nagpur';
  employeeBand: string;
  entryYear: number;
  businessFocus: string;
  overview: string;
  localLeadership: {
    name: string;
    title: string;
    avatar?: string;
  };
  growthTrajectory: {
    year: number;
    headcount: number;
  }[];
  website: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactEmail: string;
  phone: string;
  tags: string[];
  certifications?: string[];
  claimedBy?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  sezZone: string;
  experience: string;
  workMode: WorkMode;
  skills: string[];
  source: string;
  postedDate: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  eligibility: string;
  isFresherFriendly: boolean;
  status: 'Active' | 'Closed';
}

export interface NewsArticle {
  id: string;
  title: string;
  aiSummary: string;
  source: string;
  url: string;
  date: string;
  companyId?: string;
  companyName?: string;
  industry: string;
  relevanceScore: number; // 0-100
  nagpurImpact: ImpactLevel;
  content: string;
  theme: 'Growth' | 'Talent' | 'Infrastructure' | 'Policy' | 'Investment' | 'CSR';
  image?: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string; // Iconify icon string
  description: string;
  totalCompanies: number;
  totalJobs: number;
  totalEmployment: number;
  growthRate: string;
  topCompanies: string[];
  locations: string[];
  requiredSkills: string[];
  historicalGrowth: { year: number; companies: number; jobs: number }[];
}

export interface SkillMetric {
  id: string;
  skillName: string;
  category: string;
  demandScore: number; // out of 100
  supplyScore: number; // out of 100
  topHiringCompanies: string[];
  growthYoY: string;
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  type: 'Tier-1 Tech Institute' | 'Engineering & Tech College' | 'Skill & Vocational Center' | 'University';
  location: string;
  courses: string[];
  studentCount: number;
  keyMoUs: string[];
  website: string;
  coordinates: { lat: number; lng: number };
}

export interface VerificationRequest {
  id: string;
  companyId: string;
  companyName: string;
  requesterName: string;
  requesterEmail: string;
  designation?: string;
  gstCin: string;
  documentName: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
  industry?: string;
  sezZone?: string;
  website?: string;
  employeeBand?: string;
  businessFocus?: string;
  overview?: string;
  phone?: string;
  address?: string;
}

export interface CommunityContribution {
  id: string;
  type: 'Missing Company' | 'News Article' | 'Data Correction';
  submitterName: string;
  submitterEmail: string;
  title: string;
  details: string;
  date: string;
  status: 'Pending Review' | 'Approved' | 'Declined';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Error';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  savedJobIds: string[];
  appliedJobIds: string[];
  jobAlerts: {
    id: string;
    keyword: string;
    location: string;
    frequency: 'Instant' | 'Daily' | 'Weekly';
  }[];
  companyId?: string;
}

export interface ModalConfig {
  isOpen: boolean;
  type: string | null;
  data?: any;
}
