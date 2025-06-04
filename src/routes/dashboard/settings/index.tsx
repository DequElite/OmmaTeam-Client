import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../../../layouts/Dashboard/DashboardLayOut'

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
