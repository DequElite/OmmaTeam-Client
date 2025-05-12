import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersRoles } from "../../api/types/user.types";

type UserProfileState = {
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
    reducers: {
        setUserProfile: (
            state,
            action: PayloadAction<{ username: string, email: string, role: UsersRoles }>
        ) => {
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.username = action.payload.username;
        }
    },
    extraReducers: (builder) => {
        // builde.addmatcher(fetchprofile.matchFullfilled)
    },
});

export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;