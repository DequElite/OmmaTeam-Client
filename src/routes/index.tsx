import { createFileRoute } from '@tanstack/react-router'
import HomeLayout from '../layouts/Home/Home.layout'
import { useAppDispatch } from '../store/store'
import { useEffect } from 'react';
import { getUserProfile } from '../store/services/userProfile.service';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(
      getUserProfile()
    )
  },[])

  return (
    <>
      <HomeLayout></HomeLayout>
    </>
  )
}