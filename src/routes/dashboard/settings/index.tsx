import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../../../layouts/CabinetLayout/Cabinet.layout'

export const Route = createFileRoute('/dashboard/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardLayout
        title={"Dashboard"}
      >
        Dashboard
      </DashboardLayout>
}
