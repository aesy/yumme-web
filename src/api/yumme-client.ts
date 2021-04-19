export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface User {
    email: string;
}

export interface Recipe {
    categories: string[];
    description: string;
    id: number;
    image: string;
    rating: {
        average: number;
        count: number;
    };
    tags: string[];
    title: string;
}

export interface Collection {
    id: number;
    recipes: number[];
    title: string;
}

export interface UpdateRecipeRequest {
    categories: string[];
    completionTime: number;
    description: string;
    public: boolean;
    tags: string[];
    title: string;
}

export interface YummeClient {
    createRecipe(request: UpdateRecipeRequest): Promise<Recipe>;
    deleteRecipe(id: number): Promise<void>;
    getAccessToken(request: LoginRequest): Promise<LoginResponse>;
    getAllRecipes(): Promise<Recipe[]>;
    getCurrentUser(): Promise<User>;
    getPopularRecipes(limit?: number): Promise<Recipe[]>;
    getRecentRecipes(limit?: number): Promise<Recipe[]>;
    getRecipeById(id: number): Promise<Recipe>;
    getRecentCollections(limit?: number): Promise<Collection[]>;
    register(request: RegisterRequest): Promise<LoginResponse>;
    replaceRecipe(id: number, request: UpdateRecipeRequest): Promise<Recipe>;
    updateRecipe(id: number, request: Partial<UpdateRecipeRequest>): Promise<Recipe>;
}

export const YUMME_CLIENT_TYPE = Symbol.for('YummeClient');
