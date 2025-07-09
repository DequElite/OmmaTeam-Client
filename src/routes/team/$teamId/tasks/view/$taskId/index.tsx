import { createFileRoute, useNavigate } from '@tanstack/react-router'
import TeamCabinetLayout from '../../../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { lazy, Suspense, useEffect } from 'react';
import WindowLoading from '../../../../../../components/Loading/WindowLoading.component';
import Button from '../../../../../../components/Button/Button.component';
import { TaskService } from '../../../../../../api/services/Task.service';
import { useQuery } from '@tanstack/react-query';
import { TaskType } from '../../../../../../api/types/tasks.types';
import useIsTeamLeader from '../../../../../../hooks/team/useIsTeamLeader';
import useTeamLoad from '../../../../../../hooks/team/useTeamLoad';

const TaskViewLayout = lazy(() => import('../../../../../../layouts/TaskView/TaskView.layout'));

export const Route = createFileRoute('/team/$teamId/tasks/view/$taskId/')({
  component: RouteComponent,
})

const taskService = new TaskService();

function RouteComponent() {
  const { teamId, taskId } = Route.useParams();

  const { data: teamData, isLoading: teamLoading, isSuccess } = useTeamLoad(teamId);
    
  const isLeader = useIsTeamLeader({ isSuccess, data: teamData });

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<TaskType>({
    queryKey: ['get-task', teamId, taskId],
    queryFn: () => taskService.getTask({ teamId, taskId }).then(res => res.data.task),
    enabled: !!teamId && !!taskId,
  });

  useEffect(() => {
    if (isError && error) {
      navigate({ to:'/', replace: true })
    }
  }, [isError, error, navigate]);

  if(isLoading || teamLoading) {
    return <WindowLoading />
  }
  if (isError || !data || !teamData) {
    navigate({ to: '/', replace: true });
    return null;
  }

  //todo: доделай удаление и финиш задачи

  return (
    <TeamCabinetLayout
      title='Task Viewer'
      icon='/svg/Dark/Task.svg'
      teamId={teamId}
      headerSecondaryChildren={
        <>
          {
            isLeader ?
            <Button 
              variant='branded'
              width={25}
              height={5}
            >
              <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'5px'}}>
                Delete
              </span>
            </Button>
            : <Button 
              variant='branded'
              width={25}
              height={5}
            >
              <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'5px'}}>
                Finish Task
              </span>
            </Button>
          }
        </>
      }
    >
      <Suspense fallback={<WindowLoading />}>
        <TaskViewLayout
          data={data}
        />
      </Suspense>
    </TeamCabinetLayout>
  )
}
