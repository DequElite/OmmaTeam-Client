import axios from "axios";

export const ReturnAccessToken = () => localStorage.getItem('_acsToken');
export const SetAccessToken = (accessToken: string) => {
    localStorage.setItem('_acsToken', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};