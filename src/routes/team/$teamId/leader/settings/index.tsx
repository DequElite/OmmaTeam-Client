import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { protectedLoader } from '../../../../../loaders/protectedLoader'
import WindowLoading from '../../../../../components/Loading/WindowLoading.component'
import TeamCabinetLayout from '../../../../../layouts/TeamCabinetLayout/TeamCabinet.layout'
import { lazy, Suspense, useEffect } from 'react'
import Button from '../../../../../components/Button/Button.component'
import useConfirmBox from '../../../../../contexts/ConfirmBoxContext/useConfirmBox'
import { useMessageBox } from '../../../../../contexts/MessageBoxContext/useMessageBox'
import useIsTeamLeader from '../../../../../hooks/team/useIsTeamLeader'
import useTeamLoad from '../../../../../hooks/team/useTeamLoad'
import { useMutation } from '@tanstack/react-query'
import { TeamService } from '../../../../../api/services/Team.service'
import { SomeTeamByID } from '../../../../../api/types/team.types'
import { useAppDispatch } from '../../../../../store/store'
import { getUserTeamsShortData } from '../../../../../store/services/userTeams.service'

const teamService = new TeamService();

const TeamSettingsLayout = lazy(() => import('../../../../../layouts/TeamSettings/TeamSettings.layout'))

export const Route = createFileRoute('/team/$teamId/leader/settings/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { teamId } = Route.useParams()
  const { data, isLoading, isSuccess } = useTeamLoad(teamId)

  const dispatch = useAppDispatch();

  const { confirm } = useConfirmBox();
  const { updateState } = useMessageBox();

  const navigate = useNavigate();

  useIsTeamLeader({ isSuccess, data });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SomeTeamByID) => teamService.deleteTeam({id:data.id}),
    onSuccess: () => {
      console.debug('SUCCESS SENDED')

      dispatch(getUserTeamsShortData());

      updateState({
        isOpened: true,
        type: 'warning',
        desc: 'Your team is dead...'
      });

      navigate({ to: '/', replace: true });
    },
    onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Team not exists'
                    });
                    break;
                case 401:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Unauthorized'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Team not found'
                    });
                    break;
                case 403:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'You are not leader of team!!!'
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
  //http://localhost:5173/team/53fc3bde-60be-4930-89b0-0f9a72277be2/tasks/view/93da0f36-fefa-4199-9e2a-c19241ef201a

  const handleDeleteTeam = async () => {
    if(confirm){
      const result = await confirm("You are going to delete your team");
      if(result) {
        mutate({id:teamId});
      } else {
        updateState({
          isOpened: true,
          type: 'info',
          desc: 'Ok ¯\\_(ツ)_/¯'
        });
      }
    }
  }
  
  if(isPending) {
    return <WindowLoading />
  }

  if (isLoading || !data) return <WindowLoading />;

  return (
    <TeamCabinetLayout
      title='Settings (Leader)'
      icon='/svg/Dark/Settings.svg'
      teamId={teamId}
      headerSecondaryChildren={
        <Button 
          variant='branded'
          width={25}
          height={6}
          type='submit'
          onClick={handleDeleteTeam}
        >
          <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
            <img src="/svg/Bin.svg" alt="" width={20} /> 
            Delete team
          </span>
        </Button>
      }
    >
      <Suspense fallback={<WindowLoading />}>
        <TeamSettingsLayout teamId={teamId} />
      </Suspense>
    </TeamCabinetLayout>
  )
}
