import { createFileRoute } from '@tanstack/react-router'
import TeamCabinetLayout from '../../../../layouts/TeamCabinetLayout/TeamCabinet.layout';
import DashboardLayout from '../../../../layouts/Dashboard/Dashboard.layout';

export const Route = createFileRoute('/team/$teamId/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { teamId } = Route.useParams();

  return (
    <TeamCabinetLayout 
      title={'Team Chat'}
      icon='/svg/Dark/Chat.svg'
      teamId={teamId}
    >
      <DashboardLayout />
    </TeamCabinetLayout>
  )
}
