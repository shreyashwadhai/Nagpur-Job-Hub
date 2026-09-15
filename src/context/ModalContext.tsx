import React, { createContext, useContext, useState } from 'react';

export type ModalType =
  | 'claim-company'
  | 'apply-job'
  | 'submit-update'
  | 'add-company'
  | 'edit-company'
  | 'export-insights'
  | 'ask-ecosystem'
  | 'confirm-action'
  | 'view-verification'
  | 'user-details'
  | 'filter-modal';

interface ModalContextType {
  modalType: ModalType | null;
  modalData: any;
  isOpen: boolean;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type: ModalType, data?: any) => {
    setModalType(type);
    setModalData(data || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalType(null);
      setModalData(null);
    }, 200);
  };

  return (
    <ModalContext.Provider value={{ modalType, modalData, isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
