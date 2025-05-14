import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import ForgotPasswordLayout from '../../../layouts/Auth/ForgotPassword.layout';

export const Route = createFileRoute('/auth/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthLayout
        authType='ForgotPassoword'
        desc={
          <div className={styles['desc-text']}>
            Don`t worry! We will send you an email to your mail, just write your mail down!
          </div>
        }
      >
        <ForgotPasswordLayout></ForgotPasswordLayout>
      </AuthLayout>
    </>
  )
}
