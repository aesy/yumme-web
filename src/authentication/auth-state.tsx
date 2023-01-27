import { action, makeObservable, observable } from 'mobx';
import { inject, injectable, optional } from 'inversify';
import { AxiosInstance } from 'axios';
import { type LoginResponse, YUMME_CLIENT_TYPE, type YummeClient } from '@/api/yumme-client';
import { AXIOS_CLIENT_TYPE } from '@/api/axios-client';

@injectable()
export class AuthState {
    @observable
    private accessToken: string | null = null;

    public constructor(
        @inject(YUMME_CLIENT_TYPE)
        private readonly yummeClient: YummeClient,
        @inject(AXIOS_CLIENT_TYPE) @optional()
        axios: AxiosInstance | null,
    ) {
        makeObservable(this);

        const token = this.getRefreshToken();

        if (axios) {
            this.intercept(axios);
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
        this.setAccessToken(response.access_token);
        this.storeRefreshToken(response.refresh_token);
    }

    public logout(): void {
        this.clearAccessToken();
        localStorage.removeItem('yum_refreshToken');
    }

    @action
    private clearAccessToken(): void {
        this.accessToken = null;
    }

    private getRefreshToken(): string | null {
        const key = 'yum_refreshToken';

        return localStorage.getItem(key);
    }

    private intercept(axios: AxiosInstance): void {
        axios.interceptors.request.use(
            async config => {
                if (this.accessToken !== null) {
                    config.headers = {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Authorization: `Bearer ${ this.accessToken }`,
                    };
                }

                return config;
            },
        );

        axios.interceptors.response.use(
            response => response,
            async error => {
                const refreshToken = this.getRefreshToken();
                const originalRequest = error.config;

                if (error.response !== undefined && error.response.status === 403 && originalRequest.retry !== undefined && refreshToken !== null) {
                    originalRequest.retry = true;

                    let accessToken: string;

                    try {
                        accessToken = await this.refreshAccessToken(refreshToken);
                    } catch {
                        throw error;
                    }

                    axios.defaults.headers.common.Authorization = `Bearer ${ accessToken }`;

                    return axios(originalRequest);
                }

                throw error;
            },
        );
    }

    private async refreshAccessToken(token: string): Promise<string> {
        const request = {
            // eslint-disable-next-line
            grant_type: 'refresh_token' as const,
            // eslint-disable-next-line
            refresh_token: token,
        };
        const response = await this.yummeClient.getAccessToken(request);
        this.setAccessToken(response.access_token);
        this.storeRefreshToken(response.refresh_token);

        return response.access_token;
    }

    @action
    private setAccessToken(token: string): void {
        this.accessToken = token;
    }

    private storeRefreshToken(token: string): void {
        const key = 'yum_refreshToken';

        localStorage.setItem(key, token);
    }
}
