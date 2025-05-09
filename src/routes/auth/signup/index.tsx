import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import SignUpLayout from '../../../layouts/Auth/SignUp.layout'
import styles from "../../../layouts/Auth/style.module.scss";

export const Route = createFileRoute('/auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthLayout
        authType='SignUp'
        desc={
          <div className={styles['desc-text']}>
            Welcome to OmmaTeam - Create your account or <Link to={'../login'} className={styles['desc-link']}>Log In</Link>
          </div>
        }
      >
        <SignUpLayout></SignUpLayout>
      </AuthLayout>
    </>
  )
}
