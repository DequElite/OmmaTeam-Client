import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react';
import WindowLoading from '../../../../components/Loading/WindowLoading.component';

const AcceptInvitation = lazy(()=>import('../../../../layouts/AcceptInvitation/AcceptInvitation.layout'))

export const Route = createFileRoute('/team/$teamId/acceptinvation/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { token } = Route.useSearch();

  return (
    <Suspense fallback={<WindowLoading />}>
      <AcceptInvitation token={token} />
    </Suspense>
  )
}
