import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';
import { VerificationProvider } from './context/VerificationContext';

import { PublicLayout, DashboardLayout } from './components/layout/Layouts';

// Public Pages
import { Home } from './pages/public/Home';
import { CompanyDirectory } from './pages/public/CompanyDirectory';
import { CompanyMap } from './pages/public/CompanyMap';
import { CompanyProfile } from './pages/public/CompanyProfile';
import { Jobs } from './pages/public/Jobs';
import { JobDetail } from './pages/public/JobDetail';
import { News } from './pages/public/News';
import { NewsDetail } from './pages/public/NewsDetail';
import { Insights } from './pages/public/Insights';
import { IndustryDirectory } from './pages/public/IndustryDirectory';
import { IndustryDetail } from './pages/public/IndustryDetail';
import { Skills } from './pages/public/Skills';
import { EcosystemMap } from './pages/public/EcosystemMap';
import { About } from './pages/public/About';
import { SearchResults } from './pages/public/SearchResults';
import { NotFound } from './pages/public/NotFound';

// User Panel Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { SavedJobs } from './pages/user/SavedJobs';
import { JobAlerts } from './pages/user/JobAlerts';

// Company Panel Pages
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyProfileEdit } from './pages/company/CompanyProfileEdit';
import { CompanyJobs } from './pages/company/CompanyJobs';
import { CompanyAnalytics } from './pages/company/CompanyAnalytics';
import { CompanyVerification } from './pages/company/CompanyVerification';

// Institute Panel Pages
import { InstituteDashboard } from './pages/institute/InstituteDashboard';
import { InstituteCourses } from './pages/institute/InstituteCourses';
import { InstituteInternships } from './pages/institute/InstituteInternships';
import { InstituteNews } from './pages/institute/InstituteNews';
import { InstituteProfile } from './pages/institute/InstituteProfile';

// Admin Panel Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCompanies } from './pages/admin/AdminCompanies';
import { VerificationRequests } from './pages/admin/VerificationRequests';
import { AdminJobs } from './pages/admin/AdminJobs';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminInstitutes } from './pages/admin/AdminInstitutes';
import { DataSources } from './pages/admin/DataSources';
import { AuditLogs } from './pages/admin/AuditLogs';

import { AOSInit } from './components/common/AOSInit';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastProvider>
          <VerificationProvider>
            <BrowserRouter>
              <AOSInit />
              <Routes>
              {/* Public Website Layout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/companies" element={<CompanyDirectory />} />
                <Route path="/companies/:id" element={<CompanyProfile />} />
                <Route path="/map" element={<CompanyMap />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/industries" element={<IndustryDirectory />} />
                <Route path="/industries/:id" element={<IndustryDetail />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/ecosystem-map" element={<EcosystemMap />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* User Panel Layout */}
              <Route path="/user" element={<DashboardLayout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="saved-jobs" element={<SavedJobs />} />
                <Route path="alerts" element={<JobAlerts />} />
              </Route>

              {/* Company Panel Layout */}
              <Route path="/company" element={<DashboardLayout />}>
                <Route path="dashboard" element={<CompanyDashboard />} />
                <Route path="profile" element={<CompanyProfileEdit />} />
                <Route path="jobs" element={<CompanyJobs />} />
                <Route path="analytics" element={<CompanyAnalytics />} />
                <Route path="verification" element={<CompanyVerification />} />
              </Route>

              {/* Institute Panel Layout */}
              <Route path="/institute" element={<DashboardLayout />}>
                <Route path="dashboard" element={<InstituteDashboard />} />
                <Route path="courses" element={<InstituteCourses />} />
                <Route path="internships" element={<InstituteInternships />} />
                <Route path="news" element={<InstituteNews />} />
                <Route path="profile" element={<InstituteProfile />} />
              </Route>

              {/* Admin Panel Layout */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="companies" element={<AdminCompanies />} />
                <Route path="verification" element={<VerificationRequests />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="institutes" element={<AdminInstitutes />} />
                <Route path="data-sources" element={<DataSources />} />
                <Route path="audit-logs" element={<AuditLogs />} />
              </Route>

              {/* Catch-all 404 handler */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </VerificationProvider>
      </ToastProvider>
    </ModalProvider>
  </AuthProvider>
);
};

export default App;
