import axios, { AxiosInstance } from "axios";
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

export default registerClient;