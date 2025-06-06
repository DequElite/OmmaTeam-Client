import { createFileRoute } from '@tanstack/react-router'
import CabinetLayout from '../../layouts/CabinetLayout/Cabinet.layout'
import DashboardLayout from '../../layouts/Dashboard/Dashboard.layout'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <CabinetLayout
      title={"Dashboard"}
    >
      <DashboardLayout />
    </CabinetLayout>
  )
}
