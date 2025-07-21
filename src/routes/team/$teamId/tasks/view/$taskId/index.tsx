import { createFileRoute, useNavigate } from '@tanstack/react-router'
import TeamCabinetLayout from '../../../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { lazy, Suspense, useEffect } from 'react';
import WindowLoading from '../../../../../../components/Loading/WindowLoading.component';
import Button from '../../../../../../components/Button/Button.component';
import { TaskService } from '../../../../../../api/services/Task.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SomeWithTaskIdType, TaskType } from '../../../../../../api/types/tasks.types';
import useIsTeamLeader from '../../../../../../hooks/team/useIsTeamLeader';
import useTeamLoad from '../../../../../../hooks/team/useTeamLoad';
import useConfirmBox from '../../../../../../contexts/ConfirmBoxContext/useConfirmBox';
import { useMessageBox } from '../../../../../../contexts/MessageBoxContext/useMessageBox';

const TaskViewLayout = lazy(() => import('../../../../../../layouts/TaskView/TaskView.layout'));

export const Route = createFileRoute('/team/$teamId/tasks/view/$taskId/')({
  component: RouteComponent,
})

const taskService = new TaskService();

function RouteComponent() {
  const { teamId, taskId } = Route.useParams();

  const { data: teamData, isLoading: teamLoading, isSuccess } = useTeamLoad(teamId);
    
  const isLeader = useIsTeamLeader({ isSuccess, data: teamData, redirect: false });

  const navigate = useNavigate();

  const { confirm } = useConfirmBox();
  const { updateState } = useMessageBox();

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

  const { mutate: MutateDelete } = useMutation({
    mutationFn: (data: SomeWithTaskIdType) => taskService.deleteTask(data),
    onSuccess: () => {
      console.debug('SUCCESS SENDED')
    
      updateState({
        isOpened: true,
        type: 'warning',
        desc: 'Task deleted success'
      });
    
      navigate({ to: '../../', replace: true });
    },
    onError: (err: any) => {
      console.error('error: ', err);
    
      switch(err.status) {
        case 403:
          updateState({
            isOpened: true,
            type: 'error',
            desc: 'Access denied'
          });
          break;
        case 404:
          updateState({
            isOpened: true,
            type: 'error',
            desc: 'Task not found'
          });
          break;
        default:
          updateState({
            isOpened: true,
            type: 'error',
            desc: 'Unknown error'
          });
          break;
      }
    }
  });

  const { mutate: MutateComplete } = useMutation({
    mutationFn: (data: SomeWithTaskIdType) => taskService.completeTask(data),
    onSuccess: () => {
      console.debug('SUCCESS SENDED')
    
      updateState({
        isOpened: true,
        type: 'success',
        desc: 'Task completed success'
      });
    
      window.location.reload();
    },
    onError: (err: any) => {
      console.error('error: ', err);
    
      switch(err.status) {
        case 400:
          updateState({
            isOpened: true,
            type: 'error',
            desc: 'Subtasks are not completed yet'
          });
          break;
        case 404:
          updateState({
            isOpened: true,
            type: 'error',
            desc: 'Task not found'
          });
          break;
        default:
          updateState({
            isOpened: true,
            type: 'error',
            desc: 'Unknown error'
          });
          break;
      }
    }
  });

  const handleDeleteTask = async () => {
    if(confirm && isLeader) {
      const result = await confirm("You are going to delete this task");
      if(result) {
        MutateDelete({
          teamId,
          taskId
        });
      }
    }
  }

  const handleCompeteTask = async () => {
    if(confirm) {
      const result = await confirm("You are going to complete this task");
      if(result) {
        MutateComplete({
          teamId,
          taskId
        });
      }
    }
  }

  if(isLoading || teamLoading) {
    return <WindowLoading />
  }
  if (isError || !data || !teamData) {
    navigate({ to: '/', replace: true });
    return null;
  }

  return (
    <TeamCabinetLayout
      title='Task Viewer'
      icon='/svg/Dark/Task.svg'
      teamId={teamId}
      headerSecondaryChildren={
        <>
          {
            data.isCompleted ? (
              <>
                {
                  !isLeader && (
                    <Button
                      variant='branded'
                      width={25}
                      width_on_mobile={100}
                      height={5}
                      disabled
                    >
                      <span style={{ fontSize: '1.1rem', color: "#FFFFFF", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                        Completed
                      </span>
                    </Button>
                  )
                }

                {isLeader && (
                  <>
                    
                    <Button variant='branded' width={25} height={5} onClick={handleDeleteTask} width_on_mobile={100}>
                      <span style={{ fontSize: '1.1rem', color: "#FFFFFF" }}>Delete</span>
                    </Button>
                  </>
                )}
              </>
            ) : (
              isLeader ? (
                <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'end' }}>
                  <Button width_on_mobile={100} variant='branded' width={25} height={5} onClick={handleCompeteTask}>
                    <span style={{ fontSize: '1.1rem', color: "#FFFFFF" }}>Finish task</span>
                  </Button>
                  <Button width_on_mobile={100} variant='branded' width={25} height={5} onClick={handleDeleteTask}>
                    <span style={{ fontSize: '1.1rem', color: "#FFFFFF" }}>Delete</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant='branded'
                  width={25}
                  height={5}
                  width_on_mobile={100}
                  onClick={handleCompeteTask}
                >
                  <span style={{ fontSize: '1.1rem', color: "#FFFFFF", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    Finish Task
                  </span>
                </Button>
              )
            )
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
