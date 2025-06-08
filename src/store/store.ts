import { configureStore, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userProfileSlice from "./slices/userProfile.slice";
import { UserService } from "../api/services/UserRegister.service";
import { ProfileService } from "../api/services/Profile.service";

const userService = new UserService();
const profileService = new ProfileService();
export const extraArgument = {
    userService,
    profileService
};

const store = configureStore({
    reducer: {
        userProfile: userProfileSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const createAppSelector = createSelector.withTypes<AppState>;

export default store;
