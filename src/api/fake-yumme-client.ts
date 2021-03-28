import { injectable } from 'inversify';
import { LoginResponse, Recipe, User, YummeClient } from '@/api/yumme-client';

@injectable()
export class FakeYummeClient implements YummeClient {
    public async createRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async deleteRecipe(): Promise<void> {
        // Do nothing
    }

    public async getAccessToken(): Promise<LoginResponse> {
        return { accessToken: 'secret' };
    }

    public async getAllRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 2 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });
    }

    public async getCurrentUser(): Promise<User> {
        return this.createFakeUser();
    }

    public async getPopularRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 2 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });
    }

    public async getRecentRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 2 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });
    }

    public async getRecipeById(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async register(): Promise<LoginResponse> {
        return { accessToken: 'secret' };
    }

    public async replaceRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async updateRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    private createFakeRecipe(): Recipe {
        const maxId = 1000;

        return {
            categories: ['Brunch'],
            description: 'Very yummy',
            id: Math.ceil(maxId * Math.random()),
            image: 'image.jpg',
            rating: '5',
            tags: ['Swedish'],
            title: 'Meatball sandwich',
        };
    }

    private createFakeUser(): User {
        return {
            email: 'user@yum.me',
        };
    }
}
