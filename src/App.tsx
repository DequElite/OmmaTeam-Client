import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import "./App.scss";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { getUserProfile } from "./store/services/userProfile.service";
import { MessageBox } from "./components/MessageBox/MessageBox.component";
import { LanguageBox } from "./components/LanguageBox/LanguageBox.component";
import { getUserTeamsShortData } from "./store/services/userTeams.service";
import ConfirmBox from "./components/ConfirmBox/ConfirmBox.component";
import useConfirmBox from "./contexts/ConfirmBoxContext/useConfirmBox";
import { HelmetProvider } from 'react-helmet-async'

const router = createRouter({
  routeTree,
});


function App() {
  const { isOpened } = useConfirmBox();

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(
      getUserProfile()
    );
    dispatch(
      getUserTeamsShortData()
    );
  },[])

  return (
    <>
      {
        isOpened && (
          <ConfirmBox />
        )
      }
      <LanguageBox />
      <MessageBox />
      {/* <WindowLoading /> */}
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  )
}

export default App
