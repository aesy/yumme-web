import { inject, injectable } from 'inversify';
import {
    type Collection,
    type CreateRecipeRequest,
    type ImageUploadResult,
    type LoginRequest,
    type LoginResponse,
    type Recipe,
    type RegisterRequest,
    type UpdateRecipeRequest,
    type User,
    type YummeClient,
} from '@/api/yumme-client';
import { type ApiClient, API_CLIENT_TYPE } from '@/api/api-client';

async function unwrap<T>(response: Promise<{ data?: T; error?: unknown }>): Promise<T> {
    const { data, error } = await response;

    if (error) {
        throw error;
    }

    return data as T;
}

@injectable()
export class HttpYummeClient implements YummeClient {
    public constructor(
        @inject(API_CLIENT_TYPE)
        private readonly client: ApiClient,
    ) {}

    public createRecipe(request: CreateRecipeRequest): Promise<Recipe> {
        return unwrap(this.client.POST('/recipe', { body: request }));
    }

    public async deleteRecipe(id: number): Promise<void> {
        await unwrap(this.client.DELETE('/recipe/{id}', { params: { path: { id } } }));
    }

    public getAccessToken(request: LoginRequest): Promise<LoginResponse> {
        // The spec models this as one object query param (`request`), which OpenAPI serializes
        // flat (`username=...&password=...`) — the shape Spring binds. openapi-fetch's default
        // serializer would emit deepObject `request[...]`, so flatten it into top-level params.
        return unwrap(this.client.POST('/auth/token', {
            params: { query: { request } },
            querySerializer: query => {
                const params = new URLSearchParams();

                for (const [key, value] of Object.entries(query.request ?? {})) {
                    if (value !== undefined && value !== null) {
                        params.append(key, String(value));
                    }
                }

                return params.toString();
            },
        }));
    }

    public getAllRecipes(): Promise<Recipe[]> {
        return unwrap(this.client.GET('/recipe', {}));
    }

    public getCurrentUser(): Promise<User> {
        return unwrap(this.client.GET('/user/me', {}));
    }

    public getPopularRecipes(limit?: number): Promise<Recipe[]> {
        return unwrap(this.client.GET('/recipe/popular', { params: { query: { limit } } }));
    }

    public getPopularRecipesByUser(user: number, limit?: number): Promise<Recipe[]> {
        return unwrap(this.client.GET('/recipe/popular', { params: { query: { user, limit } } }));
    }

    public getRecentCollections(limit?: number): Promise<Collection[]> {
        return unwrap(this.client.GET('/collection', { params: { query: { limit } } }));
    }

    public getRecentRecipes(limit?: number): Promise<Recipe[]> {
        return unwrap(this.client.GET('/recipe/recent', { params: { query: { limit } } }));
    }

    public getRecentRecipesByUser(user: number, limit?: number): Promise<Recipe[]> {
        return unwrap(this.client.GET('/recipe/recent', { params: { query: { user, limit } } }));
    }

    public getRecipeById(id: number): Promise<Recipe> {
        return unwrap(this.client.GET('/recipe/{id}', { params: { path: { id } } }));
    }

    public getUserById(id: number): Promise<User> {
        return unwrap(this.client.GET('/user/{id}', { params: { path: { id } } }));
    }

    public async register(request: RegisterRequest): Promise<void> {
        await unwrap(this.client.POST('/user/register', { body: request }));
    }

    public replaceRecipe(id: number, request: CreateRecipeRequest): Promise<Recipe> {
        return unwrap(this.client.PUT('/recipe/{id}', { params: { path: { id } }, body: request }));
    }

    public updateRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe> {
        return unwrap(this.client.PATCH('/recipe/{id}', { params: { path: { id } }, body: request }));
    }

    public uploadImage(id: number, file: File): Promise<ImageUploadResult> {
        const formData = new FormData();

        formData.append('file', file);

        return unwrap(this.client.POST('/recipe/{id}/image', {
            params: { path: { id } },
            // openapi-fetch types multipart bodies from the `format: binary` schema as `string`;
            // a real upload must submit a FormData instance, so the shape is asserted here.
            // openapi-fetch's default bodySerializer passes FormData through untouched.
            body: formData as unknown as { file: string },
        }));
    }
}
