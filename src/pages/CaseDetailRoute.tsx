import { useParams } from 'react-router-dom'
import { CaseDetailPage } from '@/pages/CaseDetailPage'

export function CaseDetailRoute() {
  const { caseId = '' } = useParams<{ caseId: string }>()
  return <CaseDetailPage caseId={caseId} />
}
