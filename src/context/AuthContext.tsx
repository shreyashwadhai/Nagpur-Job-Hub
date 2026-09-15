import React, { createContext, useContext, useState } from 'react';
import type { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  setRole: (role: UserRole) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyJob: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
  addJobAlert: (keyword: string, location: string) => void;
  removeJobAlert: (alertId: string) => void;
}

const defaultUser: UserProfile = {
  id: 'usr-1',
  name: 'Aarav Deshmukh',
  email: 'aarav.d@gmail.com',
  role: 'jobseeker',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  savedJobIds: ['job-101', 'job-102'],
  appliedJobIds: ['job-102'],
  jobAlerts: [
    { id: 'alt-1', keyword: 'React Developer', location: 'MIHAN SEZ', frequency: 'Instant' },
    { id: 'alt-2', keyword: 'Aerospace Engineering', location: 'Nagpur', frequency: 'Daily' }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const setRole = (newRole: UserRole) => {
    setUser((prev) => ({
      ...prev,
      role: newRole,
      name: newRole === 'admin' ? 'System Administrator' : newRole === 'company' ? 'InfoCepts HR Director' : 'Aarav Deshmukh',
      email: newRole === 'admin' ? 'admin@nagpur-ecosystem.gov.in' : newRole === 'company' ? 'careers@infocepts.com' : 'aarav.d@gmail.com',
      companyId: newRole === 'company' ? 'infocepts-nagpur' : undefined
    }));
  };

  const saveJob = (jobId: string) => {
    if (!user.savedJobIds.includes(jobId)) {
      setUser((prev) => ({ ...prev, savedJobIds: [...prev.savedJobIds, jobId] }));
    }
  };

  const unsaveJob = (jobId: string) => {
    setUser((prev) => ({
      ...prev,
      savedJobIds: prev.savedJobIds.filter((id) => id !== jobId)
    }));
  };

  const isJobSaved = (jobId: string) => user.savedJobIds.includes(jobId);

  const applyJob = (jobId: string) => {
    if (!user.appliedJobIds.includes(jobId)) {
      setUser((prev) => ({ ...prev, appliedJobIds: [...prev.appliedJobIds, jobId] }));
    }
  };

  const isJobApplied = (jobId: string) => user.appliedJobIds.includes(jobId);

  const addJobAlert = (keyword: string, location: string) => {
    const newAlert = {
      id: `alt-${Date.now()}`,
      keyword,
      location,
      frequency: 'Daily' as const
    };
    setUser((prev) => ({ ...prev, jobAlerts: [...prev.jobAlerts, newAlert] }));
  };

  const removeJobAlert = (alertId: string) => {
    setUser((prev) => ({
      ...prev,
      jobAlerts: prev.jobAlerts.filter((a) => a.id !== alertId)
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user.role,
        setRole,
        saveJob,
        unsaveJob,
        isJobSaved,
        applyJob,
        isJobApplied,
        addJobAlert,
        removeJobAlert
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
