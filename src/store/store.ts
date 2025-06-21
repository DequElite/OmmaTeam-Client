import { configureStore, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userProfileSlice from "./slices/userProfile.slice";
import { UserService } from "../api/services/UserRegister.service";
import { ProfileService } from "../api/services/Profile.service";
import userTeamsSlice from "./slices/userTeams.slice";

const userService = new UserService();
const profileService = new ProfileService();
export const extraArgument = {
    userService,
    profileService
};

const store = configureStore({
    reducer: {
        userProfile: userProfileSlice,
        userTeams: userTeamsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        }),
});

export const isAuthSelector = (state: AppState) => state.userProfile.status.isAuth;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const createAppSelector = createSelector.withTypes<AppState>;

export default store;
