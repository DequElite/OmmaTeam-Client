import { createFileRoute, useNavigate } from '@tanstack/react-router'
import TeamCabinetLayout from '../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import useTeamLoad from '../../../../hooks/team/useTeamLoad'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'
import useIsTeamLeader from '../../../../hooks/team/useIsTeamLeader'
import { useQuery } from '@tanstack/react-query'
import { TaskType } from '../../../../api/types/tasks.types'
import { TaskService } from '../../../../api/services/Task.service'
import { lazy, Suspense, useEffect, useState } from 'react'
import ChangeButton, { OptionType } from '../../../../components/ChangeButton/ChangeButton.component'

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

  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const filterTypes: OptionType[] = [
    {label: 'In the progres', value: 'in_the_progres'}, 
    {label:'Completed', value:'completed'}
  ] 

  useEffect(() => {
    if ((isError && error) || (UserTasksDataIsError && UserTasksDataError)) {
      navigate({ to: '/', replace: true });
    } else if (data && UserTasksData) {
      const source = isLeader ? data : UserTasksData;
      setAllTasks(source);
      setTasks(source.filter(task => !task.isCompleted));
    }
  }, [isError, error, UserTasksDataIsError, UserTasksDataError, data, UserTasksData, isLeader, navigate]);

  if(isLoading || teamLoading || UserTasksDataLoading) {
    return <WindowLoading />
  }
  if (isError || !data || !teamData || UserTasksDataIsError || !UserTasksData) {
    navigate({ to: '/', replace: true });
    return null;
  }

  
  const handleSelectFilter = ({value}: OptionType, type: 'right' | 'left') => {
    if (value === filterTypes[0].value) {
      setTasks(allTasks.filter(task => !task.isCompleted));
    } else {
      setTasks(allTasks.filter(task => task.isCompleted));
    }
  }

  if(!tasks) {
    return <WindowLoading />
  }

  return (
    <TeamCabinetLayout
      title='Tasks'
      teamId={teamId}
      headerSecondaryChildren={
        <ChangeButton
          options={filterTypes} 
          width={30}
          height={5}
          size_type={{width:'%', height: 'vh'}}
          onSelect={handleSelectFilter}
        />
      }
    >
      <Suspense fallback={<WindowLoading/>}>
        <TeamTasksLayout
          tasks={tasks}
        />
      </Suspense>
    </TeamCabinetLayout>
  )
}
