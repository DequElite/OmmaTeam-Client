import { redirect } from "@tanstack/react-router";
import store, { isAuthLoadedSelector, isAuthSelector } from "../store/store";

export function protectedLoader() {
    const state = store.getState();
    const isAuth = isAuthSelector(state);
    const isAuthLoaded = isAuthLoadedSelector(state);

    if (!isAuthLoaded) {
        return { loading: true };
    }

    if (!isAuth) {
        throw redirect({ to: '/auth/login', replace: true });
    }

    return { loading: false };
}
