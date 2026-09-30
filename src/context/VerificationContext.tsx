import React, { createContext, useContext, useState } from 'react';
import type { VerificationRequest } from '../types';
import { mockVerificationRequests } from '../data/mockAdminData';

interface VerificationContextType {
  verificationRequests: VerificationRequest[];
  addVerificationRequest: (req: Omit<VerificationRequest, 'id' | 'submittedDate' | 'status'>) => void;
  approveVerificationRequest: (id: string) => void;
  rejectVerificationRequest: (id: string) => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(mockVerificationRequests);

  const addVerificationRequest = (data: Omit<VerificationRequest, 'id' | 'submittedDate' | 'status'>) => {
    const newRequest: VerificationRequest = {
      ...data,
      id: `verif-${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setVerificationRequests((prev) => [newRequest, ...prev]);
  };

  const approveVerificationRequest = (id: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
  };

  const rejectVerificationRequest = (id: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    );
  };

  return (
    <VerificationContext.Provider
      value={{
        verificationRequests,
        addVerificationRequest,
        approveVerificationRequest,
        rejectVerificationRequest,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) throw new Error('useVerification must be used within a VerificationProvider');
  return context;
};
