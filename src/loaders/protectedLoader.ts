import { redirect } from "@tanstack/react-router";
import store from "../store/store";
import { getUserProfile } from "../store/services/userProfile.service";
import { isAuthLoadedSelector, isAuthSelector } from "../store/slices/userProfile.slice";

export async function protectedLoader() {
  const result = await store.dispatch(getUserProfile());

  const state = store.getState();
  const isAuth = isAuthSelector(state);
  const isAuthLoaded = isAuthLoadedSelector(state);

  if (!isAuthLoaded) {
    return { loading: true }; // или загрузочный спиннер
  }

  if (getUserProfile.rejected.match(result) || !isAuth) {
    throw redirect({ to: "/auth/login" });
  }

  return null;
}
