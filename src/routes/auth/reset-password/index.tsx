import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import WindowLoading from '../../../components/Loading/WindowLoading.component';

const ResetPasswordLayout = lazy(() => import('../../../layouts/Auth/ResetPassword.layout'));

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
        <Suspense fallback={<WindowLoading />}>
          <ResetPasswordLayout keyQuery={key} />
        </Suspense>
      </AuthLayout>
    </>
  )
}
