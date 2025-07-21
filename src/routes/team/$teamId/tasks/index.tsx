import { createFileRoute } from '@tanstack/react-router'
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
import { useMessageBox } from '../../../../contexts/MessageBoxContext/useMessageBox'
import useIsScreenWidth from '../../../../hooks/useIsScreenWidth'

const TeamTasksLayout = lazy(() => import('../../../../layouts/TeamTasks/TeamTasks.layout'));

export const Route = createFileRoute('/team/$teamId/tasks/')({
  component: RouteComponent,
  loader: protectedLoader
})

const taskService = new TaskService();

function RouteComponent() {
  const { teamId } = Route.useParams() 
  const { data: teamData, isLoading: teamLoading, isSuccess } = useTeamLoad(teamId);

  const {updateState } = useMessageBox();

  const isLeader = useIsTeamLeader({ isSuccess, data: teamData, redirect: false });

  const { isSmallScreen } = useIsScreenWidth({ minScreenWidth: 600 });
  
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
    if (UserTasksDataIsError && UserTasksDataError) {
      updateState({
        isOpened: true,
        desc: 'Something went wrong',
        type: 'error'
      });
    } else if (!isLeader && UserTasksData) {
      setAllTasks(UserTasksData);
      setTasks(UserTasksData.filter(task => !task.isCompleted));
    }
  }, [UserTasksData, UserTasksDataIsError, UserTasksDataError, isLeader]);

  useEffect(() => {
    if (isError && error) {
      updateState({
        isOpened: true,
        desc: 'Something went wrong',
        type: 'error'
      });
    } else if (isLeader && data) {
      setAllTasks(data);
      setTasks(data.filter(task => !task.isCompleted));
    }
  }, [data, isError, error, isLeader]);

  if(isLoading || teamLoading || UserTasksDataLoading) {
    return <WindowLoading />
  }
  if (isError || !teamData || UserTasksDataIsError) {
    console.debug(UserTasksData)
    // navigate({ to: '/', replace: true });
    updateState({
        isOpened: true,
        desc: 'Something went wrong',
        type: 'error'
      });
  }

  
  const handleSelectFilter = ({value}: OptionType) => {
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
          width={!isSmallScreen ? 30 : 100}
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