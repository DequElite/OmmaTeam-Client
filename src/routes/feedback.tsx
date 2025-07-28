import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../layouts/Auth/Auth.layout'
import { lazy, Suspense } from 'react'
import styles from "../layouts/Auth/style.module.scss";
import WindowLoading from '../components/Loading/WindowLoading.component'
import { protectedLoader } from '../loaders/protectedLoader'
import { useTranslation } from 'react-i18next'

const FeedbackLayout = lazy(() => import('../layouts/Auth/Feedback.layout'));

export const Route = createFileRoute('/feedback')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <AuthLayout
        authType='Feedback'
        desc={
          <div className={styles['desc-text']}>
            {t("forms.Feedback.desc")}
          </div>
        }
      >
        <Suspense fallback={<WindowLoading />}>
          <FeedbackLayout />
        </Suspense>
      </AuthLayout>
    </>
  )
}
