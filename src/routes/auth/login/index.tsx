import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import WindowLoading from '../../../components/Loading/WindowLoading.component';

const LogInLayout = lazy(() => import('../../../layouts/Auth/LogIn.layout'));

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <AuthLayout
        authType='LogIn'
        desc={
          <div className={styles['desc-text']}>
            {t("forms.LogIn.desc")} <Link to={'../signup'} className={styles['desc-link']}> create a new</Link>
          </div>
        }
      >
        <Suspense fallback={<WindowLoading />}>
          <LogInLayout />
        </Suspense>
      </AuthLayout>
    </>
  )
}
