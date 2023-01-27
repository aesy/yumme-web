import axios, { type AxiosInstance } from 'axios';

export function createAxiosClient(): AxiosInstance {
    return axios.create({
        baseURL: '/api/v1',
        timeout: 5000,
    });
}

export const AXIOS_CLIENT_TYPE = Symbol.for('AxiosClient');
