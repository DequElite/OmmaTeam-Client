import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../../../layouts/CabinetLayout/Cabinet.layout'
import SettingsLayout from '../../../layouts/Settings/Settings.layout'
import { useTranslation } from 'react-i18next'
import { protectedLoader } from '../../../loaders/protectedLoader'

export const Route = createFileRoute('/dashboard/settings/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { t } = useTranslation();

  return <DashboardLayout
        title={t('cabinet.sidebar.settings')}
        icon='/svg/Dark/Settings.svg'
      >
        <SettingsLayout />
      </DashboardLayout>
}
