import { useParams } from 'react-router-dom'
import RoutesWorkspace from '../components/route/RoutesWorkspace'

function RoutePage() {
  const { projectId } = useParams()
  
  return <RoutesWorkspace projectId={projectId} />
}

export default RoutePage