import { createFileRoute } from '@tanstack/react-router'
import { protectedLoader } from '../../../../../loaders/protectedLoader'
import useTeamLoad from '../../../../../hooks/useTeamLoad';
import WindowLoading from '../../../../../components/Loading/WindowLoading.component';
import TeamCabinetLayout from '../../../../../layouts/TeamCabinetLayout/TeamCabinet.layout';
import TeamSettingsLayout from '../../../../../layouts/TeamSettings/TeamSettings.layout';

export const Route = createFileRoute('/team/$teamId/leader/settings/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { teamId } = Route.useParams();
  const { isLoading } = useTeamLoad(teamId);

  if(isLoading) {
    return <WindowLoading />
  }

  return (
    <TeamCabinetLayout
      title='Settings (Leader)'
      icon='/svg/Dark/Settings.svg'
      teamId={teamId}
    >
      <TeamSettingsLayout teamId={teamId}/>
    </TeamCabinetLayout>
  )
}
