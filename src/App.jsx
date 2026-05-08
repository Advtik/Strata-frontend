import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Projects from './pages/Projects'
import RoutePage from './pages/RoutePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId/routes" element={<RoutePage />} />
    </Routes>
  )
}

export default App