import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import "./App.scss";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { getUserProfile } from "./store/services/userProfile.service";
import { MessageBox } from "./components/MessageBox/MessageBox.component";
import { LanguageBox } from "./components/LanguageBox/LanguageBox.component";
import { getUserTeamsShortData } from "./store/services/userTeams.service";

const router = createRouter({
  routeTree,
})

function App() {
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
      <LanguageBox />
      <MessageBox />
      <RouterProvider router={router} />
    </>
  )
}

export default App
