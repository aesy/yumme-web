import createClient, { type Client } from 'openapi-fetch';
import { type paths } from '@/api/schema';

export type ApiClient = Client<paths>;

export function createApiClient(): ApiClient {
    return createClient<paths>({ baseUrl: '/api/v1' });
}

export const API_CLIENT_TYPE = Symbol.for('ApiClient');
