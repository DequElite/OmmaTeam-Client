import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppState, extraArgument } from "../store";
import { TeamShortDataType } from "../../api/types/team.types";

export const getUserTeamsShortData = createAsyncThunk<TeamShortDataType[], void, {
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
    rejectValue: unknown;
  }>(
    'user/getProfile',
    async (_: any, {extra, rejectWithValue}) => {
        try {
            const response = await extra.profileService.getUserTeams();
            console.log("ffff: ", response);
            return response.data.teams;
        } catch (err: unknown) {
            console.error("Error at getUserProfile thunk: ", err);
        }
    } 
);