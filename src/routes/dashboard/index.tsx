import { createFileRoute } from '@tanstack/react-router'
import CabinetLayout from '../../layouts/CabinetLayout/Cabinet.layout'
import DashboardLayout from '../../layouts/Dashboard/Dashboard.layout'
import { useTranslation } from 'react-i18next';
import { protectedLoader } from '../../loaders/protectedLoader';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { t } = useTranslation(); 

  return (
    <CabinetLayout
      title={t("cabinet.sidebar.dashboard")}
    >
      <DashboardLayout />
    </CabinetLayout>
  )
}
