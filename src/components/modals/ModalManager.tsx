import React from 'react';
import { ClaimCompanyModal } from './ClaimCompanyModal';
import { ApplyJobModal } from './ApplyJobModal';
import { SubmitUpdateModal } from './SubmitUpdateModal';
import { ExportModal } from './ExportModal';
import { AskEcosystemDrawer } from '../ai/AskEcosystemDrawer';

export const ModalManager: React.FC = () => {
  return (
    <>
      <ClaimCompanyModal />
      <ApplyJobModal />
      <SubmitUpdateModal />
      <ExportModal />
      <AskEcosystemDrawer />
    </>
  );
};
