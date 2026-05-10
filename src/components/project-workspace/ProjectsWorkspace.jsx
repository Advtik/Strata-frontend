import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PageHeader from './PageHeader';
import MetricsRow from './MetricsRow';
import ProjectsTable from './ProjectsTable';
import NewProjectModal from './NewProjectModal'; // ← ADD THIS IMPORT
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/client';


export default function ProjectsWorkspace() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);

  // ↓ ADD THIS HANDLER
  const handleCreateProject = async ({ name }) => {

    try {

      const res = await apiClient.post("/api/projects", {
        name
      });

      const newProject = {
        ...res.data,
        routes: 0,
        backends: 0,
        requests: 0,
        status: "healthy",
        created_at: new Date().toISOString()
      };

      setProjects(prev => [newProject, ...prev]);

      setShowNewProject(false);

    } catch (error) {

      console.error("Failed to create project:", error);

    }

  };

  const { user } = useAuth();

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        setError(null);

        const res = await apiClient.get("/api/projects");

        console.log("Projects API response:", res.data);

        setProjects(Array.isArray(res.data) ? res.data : res.data.projects || []);

      } catch (error) {

        console.error("Failed to fetch projects:", error.response?.status, error.message);

        setError(error.response?.data?.message || error.message);

        setProjects([]);

      } finally {

        setLoadingProjects(false);

      }

    };

    fetchProjects();

  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopBar collapsed={sidebarCollapsed} />

      <main
        className={`
          pt-14 min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'pl-16' : 'pl-56'}
        `}
      >
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <PageHeader
            title={`${user?.username || 'User'}'s Projects`}
            subtitle="Manage and monitor your infrastructure projects"
            actionLabel="New Project"
            onAction={() => setShowNewProject(true)}
          />

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">Error: {error}</p>
            </div>
          )}

          <MetricsRow />
          <ProjectsTable
            projects={projects}
            loading={loadingProjects}
          />
        </div>
      </main>

      {/* ↓ ADD THIS MODAL */}
      <NewProjectModal
        isOpen={showNewProject}
        onClose={() => setShowNewProject(false)}
        onCreate={handleCreateProject}
      />

      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}