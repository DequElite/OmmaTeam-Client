import { configureStore, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userProfileSlice from "./slices/userProfile.slice";
import { UserService } from "../api/services/UserRegister.service";

const userService = new UserService();
export const extraArgument = {
    userService
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
