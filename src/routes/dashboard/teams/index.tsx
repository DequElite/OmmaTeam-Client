import { createFileRoute } from '@tanstack/react-router'
import CabinetLayout from '../../../layouts/CabinetLayout/Cabinet.layout'
import TeamsLayout from '../../../layouts/Teams/Teams.layout'

export const Route = createFileRoute('/dashboard/teams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CabinetLayout
      title='Teams'
      icon='/svg/Dark/Team.svg'
    >
      <TeamsLayout />
    </CabinetLayout>
  )
}
