import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ReturnAccessToken } from "../../utils/getTokenFromLocalStorage.util";

const APP_MODE = import.meta.env.VITE_DEV_MODE || "DEV";
export const BaseTaskUrl = 
    APP_MODE === "DEV" 
        ? import.meta.env.VITE_TASK_DEV 
        : import.meta.env.VITE_TASK_PROD; 

const accessToken = ReturnAccessToken();

const taskClient: AxiosInstance = axios.create({
    baseURL: BaseTaskUrl,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
    withCredentials: true,
    timeout: 50000,
});

taskClient.interceptors.request.use(
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

export default taskClient;