import { createFileRoute, useNavigate } from '@tanstack/react-router'
import TeamCabinetLayout from '../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import useTeamLoad from '../../../../hooks/team/useTeamLoad'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'
import useIsTeamLeader from '../../../../hooks/team/useIsTeamLeader'
import { useQuery } from '@tanstack/react-query'
import { TaskType } from '../../../../api/types/tasks.types'
import { TaskService } from '../../../../api/services/Task.service'
import { lazy, Suspense, useEffect } from 'react'

const TeamTasksLayout = lazy(() => import('../../../../layouts/TeamTasks/TeamTasks.layout'));

export const Route = createFileRoute('/team/$teamId/tasks/')({
  component: RouteComponent,
  loader: protectedLoader
})

const taskService = new TaskService();

function RouteComponent() {
  const { teamId } = Route.useParams() 
  const { data: teamData, isLoading: teamLoading, isSuccess } = useTeamLoad(teamId);

  const isLeader = useIsTeamLeader({ isSuccess, data: teamData, redirect: false });
  
  const navigate = useNavigate();
  
  const { data: UserTasksData, isLoading: UserTasksDataLoading, isError: UserTasksDataIsError, error: UserTasksDataError } = useQuery<TaskType[]>({
    queryKey: ['user-tasks', teamId],
    queryFn: () => taskService.getPersonalTeamTasks({ id:teamId }).then(res => res.data.tasks),
    enabled: !!teamId,
  });

  const { data, isLoading, isError, error } = useQuery<TaskType[]>({
    queryKey: ['team-tasks', teamId],
    queryFn: () => taskService.getAllTeamTask({ id:teamId }).then(res => res.data.tasks),
    enabled: !!teamId && isLeader,
  });

  useEffect(() => {
    if ((isError && error) || (UserTasksDataIsError && UserTasksDataError)) {
      navigate({ to:'/', replace: true })
    }
  }, [isError, error, navigate]);

  if(isLoading || teamLoading || UserTasksDataLoading) {
    return <WindowLoading />
  }
  if (isError || !data || !teamData || UserTasksDataIsError || !UserTasksData) {
    navigate({ to: '/', replace: true });
    return null;
  }

  console.log(data)

  return (
    <TeamCabinetLayout
      title='Tasks'
      teamId={teamId}
    >
      <Suspense fallback={<WindowLoading />}>
        <TeamTasksLayout
          tasks={data}
        />
      </Suspense>
    </TeamCabinetLayout>
  )
}
