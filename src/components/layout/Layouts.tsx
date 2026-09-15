import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { Sidebar } from '../common/Sidebar';
import { Breadcrumb } from '../common/Breadcrumb';
import { ModalManager } from '../modals/ModalManager';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F6]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ModalManager />
    </div>
  );
};

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F6]">
      <Navbar />
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
      <Footer />
      <ModalManager />
    </div>
  );
};
