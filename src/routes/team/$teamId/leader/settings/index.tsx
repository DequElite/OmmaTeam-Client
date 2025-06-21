import { createFileRoute } from '@tanstack/react-router'
import { protectedLoader } from '../../../../../loaders/protectedLoader'

export const Route = createFileRoute('/team/$teamId/leader/settings/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  return <div>Hello "/team/$teamId/leader/settings/"!</div>
}
