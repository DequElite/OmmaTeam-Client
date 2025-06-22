import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../../../layouts/CabinetLayout/Cabinet.layout'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { protectedLoader } from '../../../loaders/protectedLoader'
import WindowLoading from '../../../components/Loading/WindowLoading.component'

const SettingsLayout = lazy(() => import('../../../layouts/Settings/Settings.layout'))

export const Route = createFileRoute('/dashboard/settings/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <DashboardLayout
      title={t('cabinet.sidebar.settings')}
      icon='/svg/Dark/Settings.svg'
    >
      <Suspense fallback={<WindowLoading />}>
        <SettingsLayout />
      </Suspense>
    </DashboardLayout>
  )
}
