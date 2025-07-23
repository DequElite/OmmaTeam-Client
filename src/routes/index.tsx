import { createFileRoute } from '@tanstack/react-router'
import HomeLayout from '../layouts/Home/Home.layout'
import { Helmet } from 'react-helmet-async'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <>
      <Helmet>
        <title>OmmaTeam — Team Collaboration Platform</title>
        <meta name="description" content="OmmaTeam — platform for team work, task management, and chats." />
        <meta property="og:title" content="OmmaTeam" />
        <meta property="og:description" content="Create teams, assign tasks, chat. Everything in one place." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://ommateam.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <HomeLayout></HomeLayout>
    </>
  )
}