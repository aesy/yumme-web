import axios, { AxiosInstance } from 'axios';

export function createAxiosClient(baseUrl: string): AxiosInstance {
    return axios.create({
        baseURL: baseUrl,
        timeout: 1000,
    });
}

export const AXIOS_CLIENT_TYPE = Symbol.for('AxiosClient');
