import { AxiosError, AxiosResponse } from "axios";

export async function handleResponse<T>(promise: Promise<AxiosResponse<T>>): Promise<{ data: T }> {
    try {
        const res = await promise;
        return { data: res.data };
    } catch (err: any) {
        if (err.isAxiosError) {
            const axiosError = err as AxiosError;
            
            if (axiosError.response) {
                throw new AxiosError(axiosError.response.data?.message || 'Server error', axiosError.code, axiosError.config, axiosError.request, axiosError.response);
            }
            
            if (axiosError.request) {
                throw new AxiosError('No response from server', axiosError.code, axiosError.config, axiosError.request);
            }
        }
        
        // Если ошибкане связана с Axios
        throw new Error(err.message || 'Unknown error');
    }
}
