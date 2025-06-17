'use client'

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ReturnAccessToken } from "../../utils/getTokenFromLocalStorage.util";

const isDev = process.env.NEXT_PUBLIC_DEV_MODE === "DEV";
export const BaseTeamUrl = isDev
  ? process.env.NEXT_PUBLIC_TEAM_DEV || "http://localhost:9001/api"
  : process.env.NEXT_PUBLIC_TEAM_PROD || "";

const accessToken = ReturnAccessToken();

const teamClient: AxiosInstance = axios.create({
    baseURL: BaseTeamUrl,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
    withCredentials: true,
    timeout: 50000,
});

teamClient.interceptors.request.use(
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

export default teamClient;