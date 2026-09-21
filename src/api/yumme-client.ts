import { type components } from '@/api/schema';

export type AuthError = components['schemas']['AuthErrorDto'];
export type LoginRequest = components['schemas']['TokenRequest'];
export type LoginResponse = components['schemas']['TokenResponse'];
export type RegisterRequest = components['schemas']['RegisterRequest'];
export type User = components['schemas']['UserDto'];
export type Recipe = components['schemas']['RecipeDto'];
export type Ingredient = components['schemas']['IngredientDto'];
export type Collection = components['schemas']['CollectionDto'];
export type CreateRecipeRequest = components['schemas']['CreateRecipeRequest'];
export type UpdateRecipeRequest = components['schemas']['UpdateRecipeRequest'];
export type ImageUploadResult = components['schemas']['ImageUploadDto'];

export interface YummeClient {
    createRecipe(request: CreateRecipeRequest): Promise<Recipe>;
    deleteRecipe(slug: string): Promise<void>;
    getAccessToken(request: LoginRequest): Promise<LoginResponse>;
    getAllRecipes(): Promise<Recipe[]>;
    getCurrentUser(): Promise<User>;
    getPopularRecipes(limit?: number): Promise<Recipe[]>;
    getPopularRecipesByUser(user: string, limit?: number): Promise<Recipe[]>;
    getRecentRecipes(limit?: number): Promise<Recipe[]>;
    getRecentRecipesByUser(user: string, limit?: number): Promise<Recipe[]>;
    getRecipeBySlug(slug: string): Promise<Recipe>;
    getRecentCollections(limit?: number): Promise<Collection[]>;
    getUserBySlug(slug: string): Promise<User>;
    register(request: RegisterRequest): Promise<void>;
    replaceRecipe(slug: string, request: CreateRecipeRequest): Promise<Recipe>;
    updateRecipe(slug: string, request: UpdateRecipeRequest): Promise<Recipe>;
    uploadImage(slug: string, file: File): Promise<ImageUploadResult>;
}

export const YUMME_CLIENT_TYPE = Symbol.for('YummeClient');
