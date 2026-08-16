import React from 'react';
import { UniversityProvider, useUniversity } from './context/UniversityContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DemoFlowBar } from './components/layout/DemoFlowBar';
import { IntelligenceGraphModal } from './components/common/IntelligenceGraphModal';
import { StudentDashboard } from './modules/student/StudentDashboard';
import { FacultyDashboard } from './modules/faculty/FacultyDashboard';
import { AITutorModule } from './modules/ai_tutor/AITutorModule';
import { AttendanceModule } from './modules/attendance/AttendanceModule';
import { ProjectsModule } from './modules/projects/ProjectsModule';
import { ResearchModule } from './modules/research/ResearchModule';
import { PlacementModule } from './modules/placement/PlacementModule';
import { UniversityAnalytics } from './modules/analytics/UniversityAnalytics';
import { ProfileView } from './modules/identity/ProfileView';

const AppContent = () => {
  const { activeTab, activeRole, isGraphModalOpen, setIsGraphModalOpen } = useUniversity();

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        if (activeRole === 'faculty') return <FacultyDashboard />;
        if (activeRole === 'admin') return <UniversityAnalytics />;
        return <StudentDashboard />;
      case 'ai_tutor':
        return <AITutorModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'projects':
        return <ProjectsModule />;
      case 'research':
        return <ResearchModule />;
      case 'placement':
        return <PlacementModule />;
      case 'analytics':
        return <UniversityAnalytics />;
      case 'profile':
        return <ProfileView />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top MCA Demo Walkthrough Banner */}
      <DemoFlowBar />

      {/* Top sticky Navbar */}
      <Navbar />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {renderModule()}
        </main>
      </div>

      {/* University Intelligence Graph Modal */}
      <IntelligenceGraphModal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <UniversityProvider>
      <AppContent />
    </UniversityProvider>
  );
}

export default App;
