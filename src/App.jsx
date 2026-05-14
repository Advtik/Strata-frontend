import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Projects from './pages/Projects'
import RoutePage from './pages/RoutePage'
import RouteDetail from './pages/RouteDetail'
import ProtectedRoute from "./components/ProtectedRoute";
import StrataDocsPage from "./pages/StrataDocsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route path="/projects/:projectId/routes" element={
        <ProtectedRoute>
            <RoutePage />
        </ProtectedRoute>
        } 
      />
      <Route path="/routes/:routeId" element={
        <ProtectedRoute>
          <RouteDetail />
        </ProtectedRoute>
        } 
      />
      <Route path="/docs" element={<StrataDocsPage />} />
    </Routes>
  )
}

export default App