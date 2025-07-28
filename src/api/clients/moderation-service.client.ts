import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ReturnAccessToken } from "../../utils/getTokenFromLocalStorage.util";

const APP_MODE = import.meta.env.VITE_DEV_MODE || "DEV";
export const BaseModerationUrl = 
    APP_MODE === "DEV" 
        ? import.meta.env.VITE_MODERATION_DEV 
        : import.meta.env.VITE_MODERATION_PROD; 

const accessToken = ReturnAccessToken();

const moderationClient: AxiosInstance = axios.create({
    baseURL: BaseModerationUrl,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
    withCredentials: true,
    timeout: 50000,
});

moderationClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = ReturnAccessToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, 
    (error)=>{
        return Promise.reject(error);
    }
);

export default moderationClient;