import { inject, injectable } from 'inversify';
import { AxiosInstance } from 'axios';
import {
    Collection,
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

        return this.axios.post<UpdateRecipeRequest, Recipe>(url, request);
    }

    public deleteRecipe(id: number): Promise<void> {
        const url = `/recipe/${ id }`;

        return this.axios.delete(url);
    }

    public async getAccessToken(request: LoginRequest): Promise<LoginResponse> {
        const url = '/auth/access_token';

        return this.axios.post<LoginRequest, LoginResponse>(url, request);
    }

    public getAllRecipes(): Promise<Recipe[]> {
        const url = '/recipe';

        return this.axios.get<void, Recipe[]>(url);
    }

    public getCurrentUser(): Promise<User> {
        const url = '/user/me';

        return this.axios.get<void, User>(url);
    }

    public getPopularRecipes(limit?: number): Promise<Recipe[]> {
        let url = '/recipe/popular';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<void, Recipe[]>(url);
    }

    public getRecentCollections(limit?: number): Promise<Collection[]> {
        let url = '/collection';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<void, Collection[]>(url);
    }

    public getRecentRecipes(limit?: number): Promise<Recipe[]> {
        let url = '/recipe/recent';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<void, Recipe[]>(url);
    }

    public getRecipeById(id: number): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.get<void, Recipe>(url);
    }

    public async register(request: RegisterRequest): Promise<LoginResponse> {
        const url = '/user/register';

        return this.axios.post<LoginRequest, LoginResponse>(url, request);
    }

    public replaceRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.patch<UpdateRecipeRequest, Recipe>(url, request);
    }

    public updateRecipe(id: number, request: Partial<UpdateRecipeRequest>): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.put<UpdateRecipeRequest, Recipe>(url, request);
    }
}
