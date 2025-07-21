import { createFileRoute, useNavigate } from '@tanstack/react-router'
import DashboardLayout from '../../../layouts/CabinetLayout/Cabinet.layout'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { protectedLoader } from '../../../loaders/protectedLoader'
import WindowLoading from '../../../components/Loading/WindowLoading.component'
import Button from '../../../components/Button/Button.component'
import { useMessageBox } from '../../../contexts/MessageBoxContext/useMessageBox'
import { useMutation } from '@tanstack/react-query'
import { ProfileService } from '../../../api/services/Profile.service'
import useConfirmBox from '../../../contexts/ConfirmBoxContext/useConfirmBox'

const profileService = new ProfileService();

const SettingsLayout = lazy(() => import('../../../layouts/Settings/Settings.layout'))

export const Route = createFileRoute('/dashboard/settings/')({
  component: RouteComponent,
  loader: protectedLoader
})

function RouteComponent() {
  const { t } = useTranslation();
  
  const navigate = useNavigate();

  const { updateState } = useMessageBox();
  const { confirm } = useConfirmBox();

  const { mutate } = useMutation({
    mutationFn: () => profileService.logOut(),
    onSuccess: () => {
      localStorage.clear();
      navigate({ to:'/auth/login', reloadDocument: true });
    }, 
    onError: () => {
      updateState({
        isOpened: true,
        type: 'error',
        desc: 'Something went wrong'
      })
    }
  })

  const handleLogOut = async () => {
    if(confirm) {
      const result = await confirm("You are going to log out");
      if(result) {
        mutate()
      }
    }
  }

  return (
    <DashboardLayout
      title={t('cabinet.sidebar.settings')}
      icon='/svg/Dark/Settings.svg'
      headerSecondaryChildren={
        <Button 
          variant='branded'
          width={25}
          width_on_mobile={65}
          height={6}
          type='submit'
          onClick={handleLogOut}
        >
          <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
            <img src="/svg/Delete.svg" alt="" width={20} /> 
            Log out
          </span>
        </Button>
      }
    >
      <Suspense fallback={<WindowLoading />}>
        <SettingsLayout />
      </Suspense>
    </DashboardLayout>
  )
}
