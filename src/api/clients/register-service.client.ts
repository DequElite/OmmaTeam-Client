import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ReturnAccessToken } from "../../utils/getTokenFromLocalStorage.util";

const APP_MODE = import.meta.env.VITE_DEV_MODE || "DEV";
export const BaseRegisterUrl = 
    APP_MODE === "DEV" 
        ? import.meta.env.VITE_REGISTER_DEV 
        : import.meta.env.VITE_REGISTER_PROD; 

const accessToken = ReturnAccessToken();

const registerClient: AxiosInstance = axios.create({
    baseURL: BaseRegisterUrl,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
    withCredentials: true,
    timeout: 50000,
});

registerClient.interceptors.request.use(
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

export default registerClient;