import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppState, extraArgument } from "../store";
import { TeamShortDataType } from "../../api/types/team.types";

export const getUserTeamsShortData = createAsyncThunk<TeamShortDataType[], void, {
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
    rejectValue: unknown;
  }>(
    'userTeams/getUserTeamsShortData',
    async (_: any, {extra}) => {
        try {
            const response = await extra.profileService.getUserTeams();
            return response.data.teams;
        } catch (err: unknown) {
            console.error("Error at getUserProfile thunk: ", err);
        }
    } 
);