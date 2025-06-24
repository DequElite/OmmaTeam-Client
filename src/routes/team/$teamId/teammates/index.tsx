import { createFileRoute } from '@tanstack/react-router'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import { lazy } from 'react'
import TeamCabinetLayout from '../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { useQuery } from '@tanstack/react-query'
import { TeamService } from '../../../../api/services/Team.service'
import { TeammateDataType } from '../../../../api/types/team.types'
import { AxiosError } from 'axios'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'
import useTeamLoad from '../../../../hooks/team/useTeamLoad'
import useIsTeammate from '../../../../hooks/team/useIsTeammate'

const teamService = new TeamService();

const TeammatesLayout = lazy(()=>import("../../../../layouts/Teammates/Teammates.layout"))

export const Route = createFileRoute('/team/$teamId/teammates/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { teamId } = Route.useParams();
  const { data: teamData, isLoading: teamLoading, isSuccess } = useTeamLoad(teamId);
  
  useIsTeammate({ isSuccess, data: teamData })

  const { data, isLoading } = useQuery<TeammateDataType[], AxiosError>({
    queryKey: ['teammates', teamId],
    queryFn: () => teamService.getTeammatesData({ id: teamId }).then(res => res.data.teammates),
    enabled: !!teamId,
    staleTime: 1000 * 60 * 10,
  });

  if(isLoading || teamLoading) return <WindowLoading />

  return (
    <TeamCabinetLayout
      title='Teammates'
      icon='/svg/Dark/Team.svg'
      teamId={teamId}
    > 
      <TeammatesLayout 
        teammates={data}
      />
    </TeamCabinetLayout>
  )
}
