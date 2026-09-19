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
    replaceRecipe(id: number, request: CreateRecipeRequest): Promise<Recipe>;
    updateRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe>;
    uploadImage(id: number, file: File): Promise<ImageUploadResult>;
}

export const YUMME_CLIENT_TYPE = Symbol.for('YummeClient');
