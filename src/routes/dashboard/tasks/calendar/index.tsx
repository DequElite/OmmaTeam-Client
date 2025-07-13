import { createFileRoute } from '@tanstack/react-router'
import { protectedLoader } from '../../../../loaders/protectedLoader'
import CabinetLayout from '../../../../layouts/CabinetLayout/Cabinet.layout'
import { lazy, Suspense } from 'react'
import WindowLoading from '../../../../components/Loading/WindowLoading.component'

const CalendarLayout = lazy(() => import('../../../../layouts/Calendar/Calendar.layout'));

export const Route = createFileRoute('/dashboard/tasks/calendar/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  return (
    <CabinetLayout
      title={'Calendar'}
      icon='/svg/Dark/Calendar.svg'
    >
      <Suspense fallback={<WindowLoading />}> 
        <CalendarLayout />
      </Suspense>
    </CabinetLayout>
  )
}
