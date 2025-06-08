import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import ForgotPasswordLayout from '../../../layouts/Auth/ForgotPassword.layout';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/auth/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();
  
  const { email } = Route.useSearch();

  return (
    <>
      <AuthLayout
        authType='ForgotPassoword'
        desc={
          <div className={styles['desc-text']}>
            {t('forms.ForgotPassoword.desc')}
          </div>
        }
      >
        <ForgotPasswordLayout email={email}></ForgotPasswordLayout>
      </AuthLayout>
    </>
  )
}
