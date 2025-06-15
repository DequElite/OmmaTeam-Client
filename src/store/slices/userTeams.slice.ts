import { createSlice } from "@reduxjs/toolkit";
import { TeamShortDataType } from "../../api/types/team.types";
import { getUserTeamsShortData } from "../services/userTeams.service";

type UserTeamsState = {
    teams: TeamShortDataType[];
};

const initialUserTeamsState: UserTeamsState = {
    teams: [],
};


export const userTeamsSlice = createSlice({
    name: 'userTeams',
    initialState: initialUserTeamsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(getUserTeamsShortData.fulfilled, (state, action)=>{
                console.log('getUserTeamsShortData: ', action)
                state.teams = action.payload;
            })
    },
})

export default userTeamsSlice.reducer;