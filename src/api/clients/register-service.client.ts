import axios, { AxiosInstance } from "axios";

const APP_MODE = import.meta.env.VITE_DEV_MODE || "DEV";
const BaseRegisterUrl = 
    APP_MODE === "DEV" 
        ? import.meta.env.VITE_REGISTER_DEV 
        : import.meta.env.VITE_REGISTER_PROD; 

const registerClient: AxiosInstance = axios.create({
    baseURL: BaseRegisterUrl,
    headers: {
        'Content-type': 'application/json',
    },
    withCredentials: true,
    timeout: 50000,
});

export default registerClient;