import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  jobseeker: {
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
  },
  company: {
    id: 'usr-2',
    name: 'InfoCepts HR Director',
    email: 'careers@infocepts.com',
    role: 'company',
    companyId: 'infocepts-nagpur',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    savedJobIds: [],
    appliedJobIds: [],
    jobAlerts: []
  },
  institute: {
    id: 'usr-3',
    name: 'VNIT Nagpur Coordinator',
    email: 'placements@vnit.ac.in',
    role: 'institute',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
    savedJobIds: [],
    appliedJobIds: [],
    jobAlerts: []
  },
  admin: {
    id: 'usr-4',
    name: 'System Administrator',
    email: 'admin@nagpur-ecosystem.gov.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    savedJobIds: [],
    appliedJobIds: [],
    jobAlerts: []
  }
};

const STORAGE_KEY_USER = 'nagpur_portal_user';
const STORAGE_KEY_AUTH = 'nagpur_portal_is_authenticated';

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string, targetRole?: UserRole) => UserProfile;
  logout: () => void;
  setRole: (role: UserRole) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyJob: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
  addJobAlert: (keyword: string, location: string) => void;
  removeJobAlert: (alertId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage:', e);
    }
    return DEMO_USERS.jobseeker;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      if (savedAuth !== null) {
        return JSON.parse(savedAuth);
      }
    } catch (e) {
      console.error('Failed to load auth state from localStorage:', e);
    }
    return true;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error('Failed to save auth state to localStorage:', e);
    }
  }, [user, isAuthenticated]);

  const login = (email: string, _password?: string, targetRole?: UserRole): UserProfile => {
    let matchedUser = DEMO_USERS.jobseeker;
    if (targetRole && DEMO_USERS[targetRole]) {
      matchedUser = DEMO_USERS[targetRole];
    } else if (email.includes('infocepts')) {
      matchedUser = DEMO_USERS.company;
    } else if (email.includes('vnit') || email.includes('institute')) {
      matchedUser = DEMO_USERS.institute;
    } else if (email.includes('admin') || email.includes('gov')) {
      matchedUser = DEMO_USERS.admin;
    }

    setUser(matchedUser);
    setIsAuthenticated(true);
    return matchedUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setRole = (newRole: UserRole) => {
    if (DEMO_USERS[newRole]) {
      setUser(DEMO_USERS[newRole]);
      setIsAuthenticated(true);
    }
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
        isAuthenticated,
        login,
        logout,
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
