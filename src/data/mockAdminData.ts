import type { AuditLog, CommunityContribution, VerificationRequest } from '../types';

export const mockVerificationRequests: VerificationRequest[] = [
  {
    id: 'verif-301',
    companyId: 'ctrls-datacenter-nagpur',
    companyName: 'CtrlS Edge Data Center',
    requesterName: 'Sridhar Pinnapureddy',
    requesterEmail: 'sridhar@ctrls.in',
    gstCin: '27AABCC8821Q1Z8 / U72900MH2022PTC388910',
    documentName: 'MIHAN_SEZ_Allotment_Letter_2024.pdf',
    submittedDate: '2026-09-12',
    status: 'Pending',
    notes: 'Submitted land allotment proof and GST certificate for MIHAN SEZ parcel.'
  },
  {
    id: 'verif-302',
    companyId: 'nagpur-agritech-innovations',
    companyName: 'BioCrop Tech & Orange Processing',
    requesterName: 'Dr. Sunita Kulkarni',
    requesterEmail: 'skulkarni@biocropnagpur.com',
    gstCin: '27AAFCB1290K1Z4 / U01409MH2020PTC341100',
    documentName: 'FSSAI_BioRefinery_License_Nagpur.pdf',
    submittedDate: '2026-09-14',
    status: 'Pending',
    notes: 'Awaiting domain email verification check.'
  },
  {
    id: 'verif-303',
    companyId: 'dassault-reliance-aerospace',
    companyName: 'Dassault Reliance Aerospace (DRAL)',
    requesterName: 'Sampathkumar S',
    requesterEmail: 'contact@dral.in',
    gstCin: '27AABCD9910M1Z2 / U35301MH2017PLC291001',
    documentName: 'DGCA_Aerospace_Manufacturing_Approval.pdf',
    submittedDate: '2026-08-25',
    status: 'Approved',
    notes: 'Verified against Ministry of Defence defence license register.'
  }
];

export const mockContributions: CommunityContribution[] = [
  {
    id: 'contrib-401',
    type: 'Missing Company',
    submitterName: 'Piyush Sharma',
    submitterEmail: 'piyush.s@gmail.com',
    title: 'Adani Logistics Depot Butibori',
    details: 'New 40-acre multi-modal cold storage hub recently commissioned near Butibori Railway Siding.',
    date: '2026-09-13',
    status: 'Pending Review'
  },
  {
    id: 'contrib-402',
    type: 'News Article',
    submitterName: 'Rutuja Deshmukh',
    submitterEmail: 'rutuja.d@vnit.ac.in',
    title: 'VNIT Solar Formula Racing Student Team Wins National EV Challenge',
    details: 'Student team developed indigenous 48V electric drivetrain tested at Hingna MIDC track.',
    date: '2026-09-10',
    status: 'Approved'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-801',
    timestamp: '2026-09-15 11:42:10',
    actor: 'admin@nagpur-ecosystem.gov.in',
    action: 'VERIFY_COMPANY',
    target: 'Dassault Reliance Aerospace (DRAL)',
    ipAddress: '14.139.120.45',
    status: 'Success'
  },
  {
    id: 'log-802',
    timestamp: '2026-09-15 10:15:32',
    actor: 'system.scraper',
    action: 'DATA_SYNC_JOB_POSTINGS',
    target: 'MIHAN SEZ Portal API',
    ipAddress: '127.0.0.1',
    status: 'Success'
  },
  {
    id: 'log-803',
    timestamp: '2026-09-14 18:30:00',
    actor: 'company.persistent',
    action: 'POST_JOB',
    target: 'Job ID: job-102',
    ipAddress: '115.112.44.10',
    status: 'Success'
  },
  {
    id: 'log-804',
    timestamp: '2026-09-14 14:05:12',
    actor: 'guest.user@gmail.com',
    action: 'CLAIM_COMPANY_ATTEMPT',
    target: 'InfoCepts Technologies',
    ipAddress: '49.36.192.88',
    status: 'Warning'
  }
];

export const mockDataSources = [
  { id: 'ds-1', name: 'MIHAN SEZ Customs & Allotment Feed', type: 'Government API', updateFreq: 'Real-time', lastSync: '10 mins ago', status: 'Healthy' },
  { id: 'ds-2', name: 'MIDC Hingna & Butibori Directory Scraper', type: 'Web Scraper', updateFreq: 'Daily', lastSync: '2 hours ago', status: 'Healthy' },
  { id: 'ds-3', name: 'National Career Service (NCS) Vidarbha Feed', type: 'REST API Feed', updateFreq: 'Hourly', lastSync: '25 mins ago', status: 'Healthy' },
  { id: 'ds-4', name: 'Vidarbha Economic Development (VED) News RSS', type: 'RSS Feed', updateFreq: '6 Hours', lastSync: '1 hour ago', status: 'Healthy' }
];
