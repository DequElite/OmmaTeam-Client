import { createFileRoute, useNavigate } from '@tanstack/react-router'
import CabinetLayout from '../../../layouts/CabinetLayout/Cabinet.layout'
// import TeamsLayout from '../../../layouts/Teams/Teams.layout'
import Button from '../../../components/Button/Button.component'
import { useTranslation } from 'react-i18next'
import { protectedLoader } from '../../../loaders/protectedLoader'
import { lazy, Suspense } from 'react'
import WindowLoading from '../../../components/Loading/WindowLoading.component'

const TeamsLayout = lazy(() => import('../../../layouts/Teams/Teams.layout'))

export const Route = createFileRoute('/dashboard/teams/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { t } = useTranslation(); 
  const navigate = useNavigate();

  return (
    <CabinetLayout
      title={t('cabinet.sidebar.teams')}
      icon='/svg/Dark/Team.svg'
      headerSecondaryChildren={
        <Button
          variant='branded'
          width={24}
          width_on_mobile={70}
          height={5}
          onClick={()=>navigate({to:'create'})}
        >
          <span style={{color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'3px'}}>
            <img src="/svg/Create.svg" alt="" width={20} /> 
            {
              t('buttons.CreateTeam')
            }
          </span>
        </Button>
      }
    >
      <Suspense fallback={<WindowLoading />}>
        <TeamsLayout />
      </Suspense>
    </CabinetLayout>
  )
}
