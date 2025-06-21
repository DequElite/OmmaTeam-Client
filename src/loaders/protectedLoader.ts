import { redirect } from "@tanstack/react-router";
import store, { isAuthSelector } from "../store/store";

export function protectedLoader() {
    const isAuth = isAuthSelector(store.getState());

    setTimeout(()=>{
        if(!isAuth) {
            throw redirect({ to: '/auth/login', replace: true });
        }
    }, 1000);

    return null;
}