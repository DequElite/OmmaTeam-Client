import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import ResetPasswordLayout from '../../../layouts/Auth/ResetPassword.layout';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/auth/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();

  const { key } = Route.useSearch();

  return (
    <>
      <AuthLayout
        authType='ResetPassword'
        desc={
          <div className={styles['desc-text']}>
            {t('forms.ResetPassword.desc')}
          </div>
        }
      >
        <ResetPasswordLayout keyQuery={key}></ResetPasswordLayout>
      </AuthLayout>
    </>
  )
}
