import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import LogInLayout from '../../../layouts/Auth/LogIn.layout'
import styles from "../../../layouts/Auth/style.module.scss";

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthLayout
        authType='LogIn'
        desc={
          <div className={styles['desc-text']}>
            Welcome to OmmaTeam - Log In in your account or <Link to={'../signup'} className={styles['desc-link']}> create a new</Link>
          </div>
        }
      >
        <LogInLayout></LogInLayout>
      </AuthLayout>
    </>
  )
}
