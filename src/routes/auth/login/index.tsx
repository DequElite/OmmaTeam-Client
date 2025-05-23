import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import LogInLayout from '../../../layouts/Auth/LogIn.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import { useTranslation } from 'react-i18next';

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
        <LogInLayout></LogInLayout>
      </AuthLayout>
    </>
  )
}
