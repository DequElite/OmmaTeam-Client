import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileResponse } from "../../api/types/user.types";
import { AppDispatch, AppState, extraArgument } from "../store";
import { SetAccessToken } from "../../utils/getTokenFromLocalStorage.util";
import registerClient from "../../api/clients/register-service.client";
import { AxiosError } from "axios";

export const getUserProfile = createAsyncThunk<UserProfileResponse, void, {
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
    rejectValue: unknown;
  }>(
    'user/getProfile',
    async (_: any, {extra, rejectWithValue}) => {
        try {
            const response = await extra.profileService.getProfile();
            return response.data.user;
        } catch (err: unknown) {
            console.error("Error at getUserProfile thunk: ", err);

            if (err instanceof AxiosError && (err.response?.status === 401 || err.response?.status === 403)) {
                console.error("Error DETECTED: ", err);

                try {
                    const response = await registerClient.get('/auth/refresh-tokens');
                    
                    if (response.status === 200) {
                        SetAccessToken(response.data.accessToken);

                        const retryResponse = await extra.profileService.getProfile();
                        return retryResponse.data.user;
                    } else {
                        return rejectWithValue({ message: "Failed to refresh token", status: response.status });
                    }
                } catch (refreshError) {
                    console.error("Token refresh error: ", refreshError);
                    //@ts-ignore
                    return rejectWithValue({ message: refreshError.message || "Token refresh failed", status: 500 });
                }
            }

        }
    } 
);