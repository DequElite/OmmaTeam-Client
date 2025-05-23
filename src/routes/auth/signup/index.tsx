import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../../../layouts/Auth/Auth.layout'
import SignUpLayout from '../../../layouts/Auth/SignUp.layout'
import styles from "../../../layouts/Auth/style.module.scss";
import { useTranslation } from 'react-i18next';

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
        <SignUpLayout></SignUpLayout>
      </AuthLayout>
    </>
  )
}
