import { createFileRoute } from '@tanstack/react-router'
import { protectedLoader } from '../../../../loaders/protectedLoader'

export const Route = createFileRoute('/dashboard/tasks/calendar/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  return <div>Hello "/dashboard/tasks/calendar/"!</div>
}
