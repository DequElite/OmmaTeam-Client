import { redirect } from "@tanstack/react-router";
import store, { isAuthLoadedSelector, isAuthSelector } from "../store/store";
import { getUserProfile } from "../store/services/userProfile.service";

export async function protectedLoader() {
    await store.dispatch(getUserProfile());

    const state = store.getState();
    const isAuth = isAuthSelector(state);
    const isAuthLoaded = isAuthLoadedSelector(state);

    if (!isAuthLoaded) {
        return { loading: true }; 
    }

    if (!isAuth) {
        throw redirect({ to: '/auth/login' });
    }

    return null;
}
