import { inject, injectable } from 'inversify';
import { AxiosInstance } from 'axios';
import {
    Collection,
    ImageUploadResult,
    LoginRequest,
    LoginResponse,
    Recipe,
    RegisterRequest,
    UpdateRecipeRequest,
    User,
    YummeClient,
} from '@/api/yumme-client';
import { AXIOS_CLIENT_TYPE } from '@/api/axios-client';

@injectable()
export class AxiosYummeClient implements YummeClient {
    public constructor(
        @inject(AXIOS_CLIENT_TYPE)
        private readonly axios: AxiosInstance,
    ) {}

    public createRecipe(request: UpdateRecipeRequest): Promise<Recipe> {
        const url = '/recipe';

        return this.axios.post<Recipe>(url, request)
            .then(response => response.data);
    }

    public deleteRecipe(id: number): Promise<void> {
        const url = `/recipe/${ id }`;

        return this.axios.delete(url)
            .then(() => undefined);
    }

    public async getAccessToken(request: LoginRequest): Promise<LoginResponse> {
        const url = '/auth/token';
        const data = new URLSearchParams();
        data.append('grant_type', request.grant_type);

        if (request.username !== undefined && request.password !== undefined) {
            data.append('username', request.username);
            data.append('password', request.password);
        } else if (request.refresh_token !== undefined) {
            data.append('refresh_token', request.refresh_token);
        }

        return this.axios.post<LoginResponse>(url, data, {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(response => response.data);
    }

    public getAllRecipes(): Promise<Recipe[]> {
        const url = '/recipe';

        return this.axios.get<Recipe[]>(url)
            .then(response => response.data);
    }

    public getCurrentUser(): Promise<User> {
        const url = '/user/me';

        return this.axios.get<User>(url)
            .then(response => response.data);
    }

    public getPopularRecipes(limit?: number): Promise<Recipe[]> {
        let url = '/recipe/popular';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<Recipe[]>(url)
            .then(response => response.data);
    }

    public getRecentCollections(limit?: number): Promise<Collection[]> {
        let url = '/collection';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<Collection[]>(url)
            .then(response => response.data);
    }


    public getRecentRecipes(limit?: number): Promise<Recipe[]> {
        let url = '/recipe/recent';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<Recipe[]>(url)
            .then(response => response.data);
    }


    public getRecipeById(id: number): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.get<Recipe>(url)
            .then(response => response.data);
    }

    public async register(request: RegisterRequest): Promise<LoginResponse> {
        const url = '/user/register';

        return this.axios.post<LoginResponse>(url, request)
            .then(response => response.data);
    }

    public replaceRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.patch<Recipe>(url, request)
            .then(response => response.data);
    }

    public updateRecipe(id: number, request: Partial<UpdateRecipeRequest>): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.put<Recipe>(url, request)
            .then(response => response.data);
    }

    public uploadImage(id: number, file: File): Promise<ImageUploadResult> {
        const formData = new FormData();

        formData.append('file', file);

        const url = `/recipe/${ id }/image`;

        return this.axios.post<ImageUploadResult>(url, formData)
            .then(response => response.data);
    }
}
