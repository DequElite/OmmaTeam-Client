import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { ReturnAccessToken, SetAccessToken } from '../../../utils/getTokenFromLocalStorage.util';
import { useAppDispatch } from '../../../store/store';
import { getUserProfile } from '../../../store/services/userProfile.service';
import AuthLayout from '../../../layouts/Auth/Auth.layout';
import GoogleLayout from '../../../layouts/Auth/Google.layout';

export const Route = createFileRoute('/auth/google/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { accessToken } = Route.useSearch();

  useEffect(()=>{
    const checkToken = async () => {
      if(accessToken) {
        SetAccessToken(accessToken);

        if(ReturnAccessToken()){
          await dispatch(getUserProfile());

          console.log("token: ", ReturnAccessToken())
          navigate({ to: '/' })
        }
      } else {
        console.error("Google login failed");
        navigate({ to: '/auth/login' })
      }
    }

    checkToken();
  }, [])

  return (
    <>
      <AuthLayout
        authType='GoogleSign'
        desc={<div></div>}
      >
        <GoogleLayout></GoogleLayout>
      </AuthLayout>
    </>
  )
}
