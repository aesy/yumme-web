import { inject, injectable } from 'inversify';
import { AxiosInstance } from 'axios';
import {
    LoginRequest,
    LoginResponse,
    Recipe,
    RegisterRequest,
    UpdateRecipeRequest,
    User,
    YummeClient,
} from '@/api/yumme-client';

@injectable()
export class YummeClientImpl implements YummeClient {
    public constructor(
        @inject('YummeAxiosClient')
        private readonly axios: AxiosInstance,
    ) {}

    public async createRecipe(request: UpdateRecipeRequest): Promise<Recipe> {
        const url = '/recipes';

        return this.axios.post<UpdateRecipeRequest, Recipe>(url, request);
    }

    public async deleteRecipe(id: number): Promise<void> {
        const url = `/recipe/${ id }`;

        return this.axios.delete(url);
    }

    public async getAccessToken(request: LoginRequest): Promise<LoginResponse> {
        const url = '/auth/access_token';
        const accessToken = await this.axios.post<LoginRequest, string>(url, request);

        return { accessToken };
    }

    public async getAllRecipes(): Promise<Recipe[]> {
        const url = '/recipes';

        return this.axios.get<void, Recipe[]>(url);
    }

    public async getCurrentUser(): Promise<User> {
        const url = '/user/me';

        return this.axios.get<void, User>(url);
    }

    public async getPopularRecipes(limit?: number): Promise<Recipe[]> {
        let url = '/recipes/popular';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<void, Recipe[]>(url);
    }

    public async getRecentRecipes(limit?: number): Promise<Recipe[]> {
        let url = '/recipes/recent';

        if (limit !== undefined) {
            url += `?limit=${ limit }`;
        }

        return this.axios.get<void, Recipe[]>(url);
    }

    public async getRecipeById(id: number): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.get<void, Recipe>(url);
    }

    public async register(request: RegisterRequest): Promise<LoginResponse> {
        const url = '/user/register';
        const accessToken = await this.axios.post<LoginRequest, string>(url, request);

        return { accessToken };
    }

    public async replaceRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.patch<UpdateRecipeRequest, Recipe>(url, request);
    }

    public async updateRecipe(id: number, request: Partial<UpdateRecipeRequest>): Promise<Recipe> {
        const url = `/recipe/${ id }`;

        return this.axios.put<UpdateRecipeRequest, Recipe>(url, request);
    }
}
