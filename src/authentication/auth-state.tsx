import { action, makeObservable, observable } from 'mobx';
import { inject, injectable, optional } from 'inversify';
import { AxiosInstance } from 'axios';
import { LoginResponse, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
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
            this.refreshAccessToken(token);
        }
    }

    public getAccessToken(): string | null {
        return this.accessToken;
    }

    public getRefreshToken(): string | null {
        const key = 'yum_refreshToken';
        const token = localStorage.getItem(key);

        return token;
    }

    public intercept(axios: AxiosInstance): void {
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

        axios.interceptors.response.use(response => response,
                                        async error => {
                                            const refreshToken = this.getRefreshToken();
                                            const originalRequest = error.config;

                                            if (error.response.status === 403 && originalRequest.retry !== undefined && refreshToken !== null) {
                                                originalRequest.retry = true;
                                                const accessToken = await this.refreshAccessToken(refreshToken);
                                                axios.defaults.headers.common.Authorization = `Bearer ${ accessToken }`;

                                                return axios(originalRequest);
                                            }

                                            throw error;
                                        });
    }

    public isLoggedIn(): boolean {
        return Boolean(this.accessToken);
    }

    public logInWithEmailAndPassword(response: LoginResponse): void {
        this.setAccessToken(response.accessToken);
        this.storeRefreshToken(response.refreshToken);
    }

    @action
    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public storeRefreshToken(token: string): void {
        const key = 'yum_refreshToken';

        localStorage.setItem(key, token);
    }

    private async refreshAccessToken(token: string): Promise<string> {
        const request = {
            grantType: 'refresh_token' as const,
            refreshToken: token,
        };
        const response = await this.yummeClient.getAccessToken(request);
        this.setAccessToken(response.accessToken);
        this.storeRefreshToken(response.refreshToken);

        return response.accessToken;
    }
}
