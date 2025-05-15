import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import ResetPasswordLayout from '../../../layouts/Auth/ResetPassword.layout';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { key } = Route.useSearch();

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
        <ResetPasswordLayout keyQuery={key}></ResetPasswordLayout>
      </AuthLayout>
    </>
  )
}
