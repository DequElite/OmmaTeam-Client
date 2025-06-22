import { createFileRoute } from '@tanstack/react-router'
import CabinetLayout from '../../../../layouts/CabinetLayout/Cabinet.layout'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'

const CreateTeamLayout = lazy(() => import('../../../../layouts/CreateTeam/CreateTeam.layout'))

export const Route = createFileRoute('/dashboard/teams/create/')({
  component: RouteComponent,
  loader: protectedLoader,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <CabinetLayout
      title={t('cabinet.sidebar.teams')}
      icon='/svg/Dark/Team.svg'
    >
      <Suspense fallback={<WindowLoading />}>
        <CreateTeamLayout />
      </Suspense>
    </CabinetLayout>
  )
}
