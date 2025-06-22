import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import WindowLoading from '../../../components/Loading/WindowLoading.component';

const SignUpLayout = lazy(() => import('../../../layouts/Auth/SignUp.layout'));

export const Route = createFileRoute('/auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <AuthLayout
        authType='SignUp'
        desc={
          <div className={styles['desc-text']}>
            {t("forms.SignUp.desc")} <Link to={'../login'} className={styles['desc-link']}>Log In</Link>
          </div>
        }
      >
        <Suspense fallback={<WindowLoading />}>
          <SignUpLayout />
        </Suspense>
      </AuthLayout>
    </>
  )
}
