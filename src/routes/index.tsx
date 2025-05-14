import { createFileRoute } from '@tanstack/react-router'
import HomeLayout from '../layouts/Home/Home.layout'
import Loading from '../components/Loading/Loading.component'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <>
      <HomeLayout></HomeLayout>
    </>
  )
}