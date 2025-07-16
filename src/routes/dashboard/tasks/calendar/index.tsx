import { createFileRoute, Navigate } from '@tanstack/react-router'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import CabinetLayout from '../../../../layouts/CabinetLayout/Cabinet.layout'
import { lazy, Suspense } from 'react'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'
import { TaskService } from '../../../../api/services/Task.service'
import { useQuery } from '@tanstack/react-query'
import { TaskType, TinyTaskType } from '../../../../api/types/tasks.types'

const CalendarLayout = lazy(() => import('../../../../layouts/Calendar/Calendar.layout'));

export const Route = createFileRoute('/dashboard/tasks/calendar/')({
  component: RouteComponent,
  loader: protectedLoader
})

const taskService = new TaskService();

function RouteComponent() {

  const { data: tasksData, isError, error, isLoading } = useQuery<TinyTaskType[]>({
    queryKey: ['allUserTasks'],
    queryFn: () => taskService.getAllUserTasks().then(res => res.data.tasks),
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  if(isLoading || !tasksData) {
    return <WindowLoading />
  }  

  if(isError && error) {
    return <Navigate to={'/'}/>
  }

  return (
    <CabinetLayout
      title={'Calendar'}
      icon='/svg/Dark/Calendar.svg'
    >
      <Suspense fallback={<WindowLoading />}> 
        <CalendarLayout tasks={tasksData}/>
      </Suspense>
    </CabinetLayout>
  )
}
