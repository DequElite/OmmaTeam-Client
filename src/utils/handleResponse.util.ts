import { AxiosResponse } from "axios";

export function handleResponse<T>(promise: Promise<AxiosResponse<T>>) {
    return promise.then(res => ({ data: res.data }));
}
