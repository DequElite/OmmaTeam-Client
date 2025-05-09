import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import SignUpLayout from '../../../layouts/Auth/SignUp.layout'

export const Route = createFileRoute('/auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthLayout
        authType='SignUp'
        desc={
          <div>
            Welcome to OmmaTeam - Create your account or <Link to={'../login'}>Log In</Link>
          </div>
        }
      >
        <SignUpLayout></SignUpLayout>
      </AuthLayout>
    </>
  )
}
