import { configureStore, createAsyncThunk, createSelector, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const extraArgument = {};

const store = configureStore({
    reducer: function (state: any, action: UnknownAction) {}
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>;
export const createAppSelector = createSelector.withTypes<AppState>;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState,
    dispatch: AppDispatch,
    extra: typeof extraArgument
}>;

export default store;