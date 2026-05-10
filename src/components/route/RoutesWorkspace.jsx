import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../route/Sidebar'
import TopBar from '../project-workspace/TopBar'
import ProjectHeader from './ProjectHeader'
import RoutesMetricsStrip from './RoutesMetricsStrip'
import RoutesTable from './RoutesTable'
import EmptyRoutes from './EmptyRoutes'
import { ApiKeysPage } from '../apikeys'
import apiClient from '../../api/client'



export default function RoutesWorkspace({ projectId, showEmpty = false }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('routes')
  const [project, setProject] = useState(null)
  const [routes, setRoutes] = useState([])
  const [loadingRoutes, setLoadingRoutes] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {

    const fetchRoutes = async () => {

      try {

        const routesRes = await apiClient.get(`api/routes/${projectId}`)

        setRoutes(routesRes.data)

        const projectsRes = await apiClient.get("api/projects")

        const currentProject = projectsRes.data.find(
          p => p.id === Number(projectId)
        )

        setProject(currentProject)

      } catch (error) {

        console.error("Failed to fetch routes:", error)

      } finally {

        setLoadingRoutes(false)

      }

    }

    fetchRoutes()

  }, [projectId])


  const handleRouteClick = (route) => {
    console.log('Route clicked:', route)
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const handleBackToProjects = () => {
    navigate('/projects')
  }

  const handleNewRoute = async (data) => {
  
    try {
  
      // STEP 1 → create route
      const routeRes = await apiClient.post(
        `api/routes/${projectId}`,
        {
          name: data.name
        }
      )
  
      const routeId = routeRes.data.id
  
      // STEP 2 → attach route rate limit
      await apiClient.post(
        `api/rate-limit/route/${routeId}`,
        {
          refill_rate: data.refillRate,
          capacity: data.capacity
        }
      )
  
      // STEP 3 → refresh routes
      const updatedRoutes = await apiClient.get(
        `api/routes/${projectId}`
      )
  
      setRoutes(updatedRoutes.data)
  
    } catch (error) {
  
      console.error("Failed to create route:", error)
  
    }
  
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <TopBar collapsed={sidebarCollapsed} />
      
      <main 
        className={`
          pt-14 min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'pl-16' : 'pl-56'}
        `}
      >
        <div className="p-8 max-w-7xl">
          {activeTab === 'routes' && (
            <>
              <ProjectHeader
                projectName={project?.name || 'Loading...'}
                description={project?.description || 'Add Routes to your Project'}
                onBack={() => navigate('/projects')}
                onCreateRoute={handleNewRoute}
              />
              
              <RoutesMetricsStrip routes={routes} />
              
              {showEmpty ? (
                <EmptyRoutes onCreateRoute={handleNewRoute} />
              ) : (
                <RoutesTable
                  routes={routes}
                  loading={loadingRoutes}
                  onRouteClick={handleRouteClick}
                />
              )}
            </>
          )}

          {activeTab === 'api-keys' && (
            <ApiKeysPage />
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-white mb-2">Settings</h2>
              <p className="text-zinc-500 text-sm">Project settings coming soon</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
