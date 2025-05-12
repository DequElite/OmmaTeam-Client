import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileResponse } from "../../api/types/user.types";
import { AppDispatch, AppState, extraArgument } from "../store";

export const getUserProfile = createAsyncThunk<UserProfileResponse, void, {
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
    rejectValue: unknown;
  }>(
    'user/getProfile',
    async (_: any, {extra}) => {
        try {
            const response = await extra.userService.getProfile();
            return response.data.user;
        } catch (err) {
            console.error("Error at getUserProfile thunk: ", err);
        }
    } 
);