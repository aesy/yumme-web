import { action, makeObservable, observable } from 'mobx';
import { inject, injectable, optional } from 'inversify';
import { type LoginResponse, YUMME_CLIENT_TYPE, type YummeClient } from '@/api/yumme-client';
import { type ApiClient, API_CLIENT_TYPE } from '@/api/api-client';

@injectable()
export class AuthState {
    private accessToken: string | null = null;
    private readonly retriedRequests = new WeakSet<Request>();
    private readonly requestClones = new WeakMap<Request, Request>();

    public constructor(
        @inject(YUMME_CLIENT_TYPE)
        private readonly yummeClient: YummeClient,
        @inject(API_CLIENT_TYPE) @optional()
        client: ApiClient | null,
    ) {
        makeObservable<AuthState, 'accessToken' | 'clearAccessToken' | 'setAccessToken'>(this, {
            accessToken: observable,
            clearAccessToken: action,
            setAccessToken: action,
        });

        const token = this.getRefreshToken();

        if (client) {
            this.intercept(client);
        }

        if (token !== null) {
            try {
                this.refreshAccessToken(token);
            } catch {
                // Do nothing
            }
        }
    }

    public isLoggedIn(): boolean {
        return Boolean(this.accessToken);
    }

    public logInWithEmailAndPassword(response: LoginResponse): void {
        this.setAccessToken(response.access_token ?? '');
        this.storeRefreshToken(response.refresh_token ?? '');
    }

    public logout(): void {
        this.clearAccessToken();
        localStorage.removeItem('yum_refreshToken');
    }

    private clearAccessToken(): void {
        this.accessToken = null;
    }

    private getRefreshToken(): string | null {
        const key = 'yum_refreshToken';

        return localStorage.getItem(key);
    }

    private intercept(client: ApiClient): void {
        client.use({
            onRequest: ({ request }) => {
                if (this.accessToken !== null) {
                    request.headers.set('Authorization', `Bearer ${ this.accessToken }`);
                }

                // Clone before the body (if any) can be consumed by the outgoing fetch,
                // so a 403 can be retried once with a fresh token further down the pipeline.
                this.requestClones.set(request, request.clone());

                return request;
            },
            onResponse: async ({ request, response }) => {
                const refreshToken = this.getRefreshToken();

                if (response.status !== 403 || refreshToken === null || this.retriedRequests.has(request)) {
                    return response;
                }

                this.retriedRequests.add(request);

                let accessToken: string;

                try {
                    accessToken = await this.refreshAccessToken(refreshToken);
                } catch {
                    return response;
                }

                const retryRequest = this.requestClones.get(request);

                if (retryRequest === undefined) {
                    return response;
                }

                retryRequest.headers.set('Authorization', `Bearer ${ accessToken }`);

                return fetch(retryRequest);
            },
        });
    }

    private async refreshAccessToken(token: string): Promise<string> {
        const request = {
            grant_type: 'refresh_token' as const,
            refresh_token: token,
        };
        const response = await this.yummeClient.getAccessToken(request);
        const accessToken = response.access_token ?? '';
        this.setAccessToken(accessToken);
        this.storeRefreshToken(response.refresh_token ?? '');

        return accessToken;
    }

    private setAccessToken(token: string): void {
        this.accessToken = token;
    }

    private storeRefreshToken(token: string): void {
        const key = 'yum_refreshToken';

        localStorage.setItem(key, token);
    }
}
