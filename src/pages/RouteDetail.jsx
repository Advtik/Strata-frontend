import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'

import RouteDetailSidebar from '../components/route/RouteDetailSidebar'
import TopBar from '../components/project-workspace/TopBar'
import RouteDetailHeader from '../components/route/RouteDetailHeader'
import RouteBackendsMetrics from '../components/route/RouteBackendsMetrics'
import BackendsTable from '../components/route/BackendsTable'
import RouteMonitoring from '../components/route/RouteMonitoring'
import RemoveBackendModal from '../components/route/RemoveBackendModal'
import CreateBackendModal from '../components/route/CreateBackendModal'

import apiClient from '../api/client'

export default function RouteDetail() {

  const { routeId } = useParams()

  const navigate = useNavigate()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'backends'
  const setActiveTab = (tab) => {
    if (tab === 'backends') {
      setSearchParams({})  // default tab — clean URL, no ?tab=
    } else {
      setSearchParams({ tab })  // non-default — write to URL
    }
  }
  

  const [selectedBackend, setSelectedBackend] = useState(null)

  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const [route, setRoute] = useState(null)

  const [loading, setLoading] = useState(true)

  const [showAddBackend, setShowAddBackend] = useState(false);

  useEffect(() => {

    const fetchRoute = async () => {

      try {

        const res = await apiClient.get(
          `/api/routes/detail/${routeId}`
        )

        setRoute(res.data)

      } catch (error) {

        console.error(
          "Failed to fetch route:",
          error
        )

      } finally {

        setLoading(false)

      }

    }

    fetchRoute()

  }, [routeId])

  const handleAddBackend = () => setShowAddBackend(true);

  const handleCreateBackend = async ({ url }) => {
    try {
      const res = await apiClient.post(`/api/backends/${routeId}`, { url });

      setRoute(prev => ({
        ...prev,
        backends: [...(prev.backends || []), res.data]
      }));

    } catch (error) {
      console.error('Failed to add backend:', error);
    }
  };

  const handleDeleteBackend = (backend) => {
    setSelectedBackend(backend);
    setShowRemoveModal(true);
  };


  const handleBackToRoutes = () => {

    navigate(-1)

  }

  const confirmRemoveBackend = async () => {
    try {
      await apiClient.delete(`/api/backends/${selectedBackend.id}`); // ← add this

      setRoute(prev => ({
        ...prev,
        backends: prev.backends.filter(b => b.id !== selectedBackend.id)
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setShowRemoveModal(false);
      setSelectedBackend(null);
    }
  };

  const handleUpdateRefillRate = async (value) => {
  try {
    await apiClient.post(`/api/rate-limit/route/${routeId}`, {  // ← routeId not route.id
      refill_rate: value,
      capacity: route.capacity
    });

    setRoute(prev => ({ ...prev, refill_rate: value }));

  } catch (error) {
    console.error('Failed to update refill rate:', error);
  }
};

const handleUpdateCapacity = async (value) => {
  try {
    await apiClient.post(`/api/rate-limit/route/${routeId}`, {  // ← routeId not route.id
      refill_rate: route.refill_rate,
      capacity: value
    });

    setRoute(prev => ({ ...prev, capacity: value }));

  } catch (error) {
    console.error('Failed to update capacity:', error);
  }
};


  if (loading) {

    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-zinc-500">
          Loading route...
        </p>
      </div>
    )

  }

  if (!route) {

    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-red-400">
          Route not found
        </p>
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-[#050505]">

      <RouteDetailSidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed(!sidebarCollapsed)
        }
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
                totalRequests={route.requests || 0}
                avgLatency={
                  route.avg_latency
                    ? `${(route.avg_latency * 1000).toFixed(2)}ms`
                    : "0ms"
                }
                refillRate={route.refill_rate || 0}
                capacity={route.capacity || 0}
                onUpdateRefillRate={
                  handleUpdateRefillRate
                }
                onUpdateCapacity={
                  handleUpdateCapacity
                }
              />

              <BackendsTable
                backends={route.backends || []}
                onDeleteBackend={
                  handleDeleteBackend
                }
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
                totalRequests={route.requests || 0}
                avgLatency={
                  route.avg_latency
                    ? `${(route.avg_latency * 1000).toFixed(2)}ms`
                    : "0ms"
                }
                refillRate={route.refill_rate || 0}
                capacity={route.capacity || 0}
                onUpdateRefillRate={
                  handleUpdateRefillRate
                }
                onUpdateCapacity={
                  handleUpdateCapacity
                }
              />

              <RouteMonitoring
                monitoringData={route.monitoring}
                backendMetrics={{
                  backends: route.backends || []
                }}
                refillRate={route.refill_rate || 0}
              />

            </>
          )}

          {activeTab === 'settings' && (

            <div className="text-center py-20">

              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">

                <svg
                  className="w-8 h-8 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c..."
                  />
                </svg>

              </div>

              <h2 className="text-lg font-medium text-white mb-2">
                Settings
              </h2>

              <p className="text-zinc-500 text-sm">
                Route settings coming soon
              </p>

            </div>

          )}

        </div>

      </main>
      <CreateBackendModal
        isOpen={showAddBackend}
        onClose={() => setShowAddBackend(false)}
        onCreate={handleCreateBackend}
      />

      {showRemoveModal && (


        <RemoveBackendModal
          backend={selectedBackend}
          onConfirm={confirmRemoveBackend}
          onCancel={() =>
            setShowRemoveModal(false)
          }
        />

      )}

    </div>

  )

}