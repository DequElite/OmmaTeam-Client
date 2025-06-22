import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import WindowLoading from '../../../components/Loading/WindowLoading.component';

const ForgotPasswordLayout = lazy(() => import('../../../layouts/Auth/ForgotPassword.layout'));

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
            {t('forms.ForgotPassword.desc')}
          </div>
        }
      >
        <Suspense fallback={<WindowLoading />}>
          <ForgotPasswordLayout email={email} />
        </Suspense>
      </AuthLayout>
    </>
  )
}
