import { createFileRoute } from '@tanstack/react-router'
import { protectedLoader } from '../../../../../loaders/protectedLoader'
import useTeamLoad from '../../../../../hooks/team/useTeamLoad'
import WindowLoading from '../../../../../components/Loading/WindowLoading.component'
import useIsTeamLeader from '../../../../../hooks/team/useIsTeamLeader'
import { lazy, Suspense, useEffect } from 'react'
import TeamCabinetLayout from '../../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'

const TeamTaskCreateLayout = lazy(() => import('../../../../../layouts/TeamTaskCreate/TeamTaskCreate.layout'));

export const Route = createFileRoute('/team/$teamId/leader/task/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { type: taskType } = Route.useSearch();
  const { teamId } = Route.useParams()
  const { data, isLoading, isSuccess } = useTeamLoad(teamId);
  
  useIsTeamLeader({ isSuccess, data });

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();  
      event.returnValue = ''; 
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (isLoading || !data) return <WindowLoading />;

  return (
    <TeamCabinetLayout
      title='Task Editor (Leader)'
      icon='/svg/Dark/Task.svg'
      teamId={teamId}
      // headerSecondaryChildren={
      //   <Button 
      //     variant='branded'
      //     width={20}
      //     height={6}
      //     type='submit'
      //     form={formId}
      //   >
      //     <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'5px'}}>
      //       <img src="/svg/Create.svg" alt="" width={20} /> 
      //       Create
      //     </span>
      //   </Button>
      // }
    >
      <Suspense fallback={<WindowLoading />}>
        <TeamTaskCreateLayout
          teamId={teamId}
          taskType={taskType}
          teamData={data}
        />
      </Suspense>
    </TeamCabinetLayout>
  )
}
