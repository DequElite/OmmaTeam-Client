import { createSlice } from "@reduxjs/toolkit";
import { UsersRoles } from "../../api/types/user.types";
import { getUserProfile } from "../services/userProfile.service";
import { AppState } from "../store";

export type UserProfileState = {
    username: string;
    email: string;
    role: UsersRoles;
    status: {
        isSuccess: boolean;
        isAuth: boolean;
        isLoaded: boolean;
    }
};

const initialUserProfileState: UserProfileState = {
    username: 'guest',
    email: 'guest@ommateam.com',
    role: UsersRoles.User,
    status: {
        isSuccess: false,
        isAuth: false,
        isLoaded: false,
    }
};

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialUserProfileState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                if (!action.payload) {
                    state.status.isSuccess = false;
                    state.status.isAuth = false;
                    state.status.isLoaded = true;
                    return;
                }

                state.status.isSuccess = true;
                state.status.isAuth = true;
                state.status.isLoaded = true;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.role = action.payload.role;
            })
            .addCase(getUserProfile.rejected, (state, _) => {
                state.status.isSuccess = false;
                state.status.isAuth = false;
                state.status.isLoaded = true;
                state.username = 'guest';
                state.email = 'guest@ommateam.com';
                state.role = UsersRoles.User;
            });
    },
});

export const isAuthSelector = (state: AppState) => state.userProfile.status.isAuth;
export const isAuthLoadedSelector = (state: AppState) => state.userProfile.status.isLoaded;

export default userProfileSlice.reducer;