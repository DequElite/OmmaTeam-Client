import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { SetAccessToken } from '../../../utils/getTokenFromLocalStorage.util';
import { useAppDispatch } from '../../../store/store';
import { getUserProfile } from '../../../store/services/userProfile.service';

export const Route = createFileRoute('/auth/google/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { accessToken } = Route.useSearch();

  useEffect(()=>{
    const checkToken = () => {
      if(accessToken) {
        SetAccessToken(accessToken);

        dispatch(getUserProfile());

        navigate({ to: '/' })
      } else {
        console.error("Google login failed");
        navigate({ to: '/auth/login' })
      }
    }

    checkToken();
  }, [])

  return (
    <>
      <p>Signing by google...</p>
    </>
  )
}
