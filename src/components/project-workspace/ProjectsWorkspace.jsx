import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PageHeader from './PageHeader';
import MetricsRow from './MetricsRow';
import ProjectsTable from './ProjectsTable';

export default function ProjectsWorkspace() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNewProject = () => {
    // Handle new project creation
    console.log('Creating new project...');
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Top Bar */}
      <TopBar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <main 
        className={`
          pt-14 min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'pl-16' : 'pl-56'}
        `}
      >
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <PageHeader
            title="Adwiteek's Projects"
            subtitle="Manage and monitor your infrastructure projects"
            actionLabel="New Project"
            onAction={handleNewProject}
          />

          {/* Metrics Row */}
          <MetricsRow />

          {/* Projects Table */}
          <ProjectsTable />
        </div>
      </main>

      {/* Subtle Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
