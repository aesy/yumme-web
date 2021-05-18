/* eslint-disable */

export interface AuthError {
    error: string;
    error_description: string;
}

export interface LoginRequest {
    grant_type: 'password' | 'refresh_token';
    password?: string;
    refresh_token?: string;
    username?: string;
}

export interface LoginResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: 'bearer';
}

export interface RegisterRequest {
    user_name: string;
    display_name: string;
    password: string;
}

export interface User {
    user_name: string;
    display_name: string;
    id: number;
}

export interface Recipe {
    categories: string[];
    cook_time: number;
    description: string;
    directions: string[];
    id: number;
    images: string[];
    ingredients: {
        name: string;
    }[];
    prep_time: number;
    rating: {
        average: number;
        count: number;
    };
    tags: string[];
    title: string;
    yield: number;
}

export interface Collection {
    id: number;
    recipes: number[];
    title: string;
}

export interface UpdateRecipeRequest {
    categories: string[];
    cook_time: number;
    description: string;
    directions: string[];
    ingredients: string[];
    prep_time: number;
    public: boolean;
    tags: string[];
    title: string;
    yield: number;
}

export interface ImageUploadResult {
    name: string
}

export interface YummeClient {
    createRecipe(request: UpdateRecipeRequest): Promise<Recipe>;
    deleteRecipe(id: number): Promise<void>;
    getAccessToken(request: LoginRequest): Promise<LoginResponse>;
    getAllRecipes(): Promise<Recipe[]>;
    getCurrentUser(): Promise<User>;
    getPopularRecipes(limit?: number): Promise<Recipe[]>;
    getPopularRecipesByUser(user: number, limit?: number): Promise<Recipe[]>;
    getRecentRecipes(limit?: number): Promise<Recipe[]>;
    getRecentRecipesByUser(user: number, limit?: number): Promise<Recipe[]>;
    getRecipeById(id: number): Promise<Recipe>;
    getRecentCollections(limit?: number): Promise<Collection[]>;
    getUserById(id: number): Promise<User>;
    register(request: RegisterRequest): Promise<void>;
    replaceRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe>;
    updateRecipe(id: number, request: Partial<UpdateRecipeRequest>): Promise<Recipe>;
    uploadImage(id: number, file: File): Promise<ImageUploadResult>;
}

export const YUMME_CLIENT_TYPE = Symbol.for('YummeClient');
