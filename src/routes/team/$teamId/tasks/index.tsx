import { createFileRoute } from '@tanstack/react-router'
import TeamCabinetLayout from '../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import useTeamLoad from '../../../../hooks/useTeamLoad'
import Loading from '../../../../components/Loading/Loading.component'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'

export const Route = createFileRoute('/team/$teamId/tasks/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { teamId } = Route.useParams() 
  const {isLoading} = useTeamLoad(teamId);

  if(isLoading){
    return <WindowLoading />
  }

  return (
    <TeamCabinetLayout
      title='Tasks'
      teamId={teamId}
    >
      <div>Hello "/team/{teamId}/tasks/"!</div>
    </TeamCabinetLayout>
  )
}
