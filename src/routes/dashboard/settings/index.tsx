import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../../../layouts/CabinetLayout/Cabinet.layout'
import SettingsLayout from '../../../layouts/Settings/Settings.layout'

export const Route = createFileRoute('/dashboard/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardLayout
        title={"Settings"}
        icon='/svg/Dark/Settings.svg'
      >
        <SettingsLayout />
      </DashboardLayout>
}
