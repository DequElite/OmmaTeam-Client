import { createFileRoute } from '@tanstack/react-router'
import CabinetLayout from '../../../../layouts/CabinetLayout/Cabinet.layout'
import { useTranslation } from 'react-i18next';
import CreateTeamLayout from '../../../../layouts/CreateTeam/CreateTeam.layout';
import { protectedLoader } from '../../../../loaders/protectedLoader';

export const Route = createFileRoute('/dashboard/teams/create/')({
  component: RouteComponent,
  loader: protectedLoader,
})

function RouteComponent() {
  const { t } = useTranslation(); 

  return (
    <CabinetLayout
      title={t('cabinet.sidebar.teams')}
      icon='/svg/Dark/Team.svg'
    >
      <CreateTeamLayout />
    </CabinetLayout>
  )
}
