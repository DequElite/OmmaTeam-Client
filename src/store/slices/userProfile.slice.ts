import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersRoles } from "../../api/types/user.types";
import { getUserProfile } from "../services/userProfile.service";

export type UserProfileState = {
    username: string;
    email: string;
    role: UsersRoles;
    isSuccessStatus?: boolean;
};

const initialUserProfileState: UserProfileState = {
    username: 'guest',
    email: 'guest@ommateam.com',
    role: UsersRoles.User,
    isSuccessStatus: false
};

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialUserProfileState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isSuccessStatus = true;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.role = action.payload.role;
            })
    },
});

export default userProfileSlice.reducer;