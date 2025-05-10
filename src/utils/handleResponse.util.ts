import { AxiosResponse } from "axios";

export async function handleResponse<T>(promise: Promise<AxiosResponse<T>>): Promise<{ data: T }> {
    try {
        const res = await promise;
        return { data: res.data };
    } catch (err: any) {
        if (err.response) {
            throw new Error(err.response.data?.message || 'Server error');
        } else if (err.request) {
            throw new Error('No response from server');
        } else {
            throw new Error(err.message || 'Unknown error');
        }
    }
}
