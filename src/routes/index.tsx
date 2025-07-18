import { createFileRoute } from '@tanstack/react-router'
import HomeLayout from '../layouts/Home/Home.layout'

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