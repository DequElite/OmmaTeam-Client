import axios, { AxiosInstance } from "axios";
import { ReturnAccessToken, SetAccessToken } from "../../utils/getTokenFromLocalStorage.util";
import { UserService } from "../services/UserRegister.service";

const APP_MODE = import.meta.env.VITE_DEV_MODE || "DEV";
const BaseRegisterUrl = 
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


registerClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (err) => {
        if(err.response && err.response.status === 403 || err.response.status === 500) {
            try {
                const userService = new UserService();
                const response = await userService.refreshToken();

                SetAccessToken(response.data.accessToken);

                err.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                return axios(err.config);
            } catch (refreshError) {
                window.location.href = "/auth/login";
                return Promise.reject(refreshError);
            } 
        }
    }
)

export default registerClient;