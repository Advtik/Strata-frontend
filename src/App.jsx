import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Projects from './pages/Projects'
import RoutePage from './pages/RoutePage'
import RouteDetail from './pages/RouteDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId/routes" element={<RoutePage />} />
      <Route path="/routes/:routeName" element={<RouteDetail />} />
    </Routes>
  )
}

export default App