import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RouteDetailSidebar from '../components/route/RouteDetailSidebar'
import TopBar from '../components/project-workspace/TopBar'
import RouteDetailHeader from '../components/route/RouteDetailHeader'
import RouteBackendsMetrics from '../components/route/RouteBackendsMetrics'
import BackendsTable from '../components/route/BackendsTable'
import RouteMonitoring from '../components/route/RouteMonitoring'
import RemoveBackendModal from '../components/route/RemoveBackendModal'

// Example route data - in a real app, this would come from an API
const routeData = {
  'auth-api': {
    name: 'auth-api',
    path: '/auth-api',
    totalRequests: '2.1M',
    avgLatency: '18ms',
    backends: [
      {
        id: 1,
        url: 'api-1.internal',
        totalRequests: '1.2M',
        lastActive: '< 1 min ago',
        status: 'Healthy'
      },
      {
        id: 2,
        url: 'api-2.vercel.app',
        totalRequests: '890K',
        lastActive: '2 min ago',
        status: 'Healthy'
      },
      {
        id: 3,
        url: 'auth-service.fly.dev',
        totalRequests: '8.2K',
        lastActive: '15 min ago',
        status: 'Degraded'
      }
    ]
  }
}

export default function RouteDetail() {
  const { routeName } = useParams()
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('backends')
  const [selectedBackend, setSelectedBackend] = useState(null)
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  // Get route data
  const route = routeData[routeName] || {
    name: routeName || 'route',
    path: `/${routeName || 'route'}`,
    totalRequests: '0',
    avgLatency: '0ms',
    backends: []
  }

  const handleAddBackend = () => {
    console.log('Add backend to route')
  }

  const handleDeleteBackend = (backend) => {
    setSelectedBackend(backend)
    setShowRemoveModal(true)
  }

  const handleBackToRoutes = () => {
    navigate(-1)
  }

  const confirmRemoveBackend = () => {
    console.log('Removing backend:', selectedBackend)
    setShowRemoveModal(false)
    setSelectedBackend(null)
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <RouteDetailSidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <TopBar collapsed={sidebarCollapsed} />

      <main 
        className={`
          pt-14 min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'pl-16' : 'pl-56'}
        `}
      >
        <div className="p-8 max-w-7xl">
          {activeTab === 'backends' && (
            <>
              <RouteDetailHeader 
                routeName={route.name}
                routePath={route.path}
                onAddBackend={handleAddBackend}
                onBack={handleBackToRoutes}
              />

              <RouteBackendsMetrics 
                totalRequests={route.totalRequests}
                avgLatency={route.avgLatency}
              />

              <BackendsTable 
                backends={route.backends}
                onDeleteBackend={handleDeleteBackend}
              />
            </>
          )}

          {activeTab === 'monitoring' && (
            <>
              <RouteDetailHeader 
                routeName={route.name}
                routePath={route.path}
                onAddBackend={handleAddBackend}
                onBack={handleBackToRoutes}
              />

              <RouteBackendsMetrics 
                totalRequests={route.totalRequests}
                avgLatency={route.avgLatency}
              />

              <RouteMonitoring />
            </>
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
              <p className="text-zinc-500 text-sm">Route settings coming soon</p>
            </div>
          )}
        </div>
      </main>

      {/* Remove Backend Modal */}
      {showRemoveModal && (
        <RemoveBackendModal 
          backend={selectedBackend}
          onConfirm={confirmRemoveBackend}
          onCancel={() => setShowRemoveModal(false)}
        />
      )}
    </div>
  )
}
