import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SimulateRoleModal from './components/SimulateRoleModal';
import AuditReportModal from './components/AuditReportModal';
import Dashboard from './pages/Dashboard';
import CareerExplorer from './pages/CareerExplorer';
import LearningPath from './pages/LearningPath';
import AICoach from './pages/AICoach';
import ResumeStudio from './pages/ResumeStudio';
import SkillIntelligence from './pages/SkillIntelligence';
import ProjectsStudio from './pages/ProjectsStudio';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NotificationsPage from './pages/NotificationsPage';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const fetchProfile = () => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) setProfile(data.profile);
      })
      .catch((err) => console.error('Failed to load profile:', err));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleRoleSimulated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
        {/* Left Navigation Shell */}
        <Sidebar
          profile={profile}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />

        {/* Main Application Container */}
        <div className="pl-72">
          {/* Top Glassmorphic Navigation Bar */}
          <Header
            profile={profile}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onProfileSwitched={(newProfile) => setProfile(newProfile)}
          />

          {/* Main Viewport Content */}
          <main className="relative pt-20 px-8 min-h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    profile={profile}
                    onOpenRoleModal={() => setIsRoleModalOpen(true)}
                    onOpenAuditModal={() => setIsAuditModalOpen(true)}
                  />
                }
              />
              <Route
                path="/my-career"
                element={
                  <Dashboard
                    profile={profile}
                    onOpenRoleModal={() => setIsRoleModalOpen(true)}
                    onOpenAuditModal={() => setIsAuditModalOpen(true)}
                  />
                }
              />
              <Route
                path="/explorer"
                element={
                  <CareerExplorer
                    profile={profile}
                    onRoleSimulated={handleRoleSimulated}
                  />
                }
              />
              <Route
                path="/learning-path"
                element={
                  <LearningPath
                    profile={profile}
                    onProfileUpdate={setProfile}
                  />
                }
              />
              <Route
                path="/ai-coach"
                element={
                  <AICoach
                    profile={profile}
                    onOpenAuditModal={() => setIsAuditModalOpen(true)}
                  />
                }
              />
              {/* Secondary Navigation fallback to relevant views */}
              <Route
                path="/skills"
                element={
                  <SkillIntelligence
                    profile={profile}
                    onOpenRoleModal={() => setIsRoleModalOpen(true)}
                    onOpenAuditModal={() => setIsAuditModalOpen(true)}
                  />
                }
              />
              <Route
                path="/projects"
                element={
                  <ProjectsStudio
                    profile={profile}
                    onOpenAuditModal={() => setIsAuditModalOpen(true)}
                  />
                }
              />
              <Route
                path="/analytics"
                element={
                  <AnalyticsDashboard
                    profile={profile}
                  />
                }
              />
              <Route
                path="/notifications"
                element={
                  <NotificationsPage />
                }
              />
              <Route
                path="/resume"
                element={
                  <ResumeStudio
                    profile={profile}
                    onProfileUpdate={(updatedProfile) => setProfile(updatedProfile)}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Global Modals */}
        <SimulateRoleModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          onRoleSimulated={handleRoleSimulated}
          currentRole={profile?.targetRole}
        />

        <AuditReportModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
          profile={profile}
        />
      </div>
    </Router>
  );
}
