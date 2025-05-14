import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import ResetPasswordLayout from '../../../layouts/Auth/ResetPassword.layout';

export const Route = createFileRoute('/auth/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthLayout
        authType='ResetPassword'
        desc={
          <div className={styles['desc-text']}>
            So, you can now change your old password to a new one!
          </div>
        }
      >
        <ResetPasswordLayout></ResetPasswordLayout>
      </AuthLayout>
    </>
  )
}
