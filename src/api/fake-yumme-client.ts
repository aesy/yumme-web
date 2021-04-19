import { injectable } from 'inversify';
import { LoginResponse, Recipe, User, YummeClient, Collection } from '@/api/yumme-client';

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

    public async getAllCollections(): Promise<Collection[]> {
        return Array.from({ length: 3 })
            .map((_, index) => {
                return { ...this.createFakeCollection(), id: index };
            });
    }

    public async getAllRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 3 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });
    }

    public async getCurrentUser(): Promise<User> {
        return this.createFakeUser();
    }

    public async getPopularRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 3 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });
    }

    public async getRecentCollections(): Promise<Collection[]> {
        return Array.from({ length: 4 })
            .map((_, index) => {
                return { ...this.createFakeCollection(), id: index };
            });
    }

    public async getRecentRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 4 })
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

    private createFakeCollection(): Collection {
        const maxId = 1000;

        return {
            id: Math.ceil(maxId * Math.random()),
            title: 'Barbeque heaven',
            recipes: [Math.ceil(maxId * Math.random()), Math.ceil(maxId * Math.random()), Math.ceil(maxId * Math.random()), Math.ceil(maxId * Math.random())],
        };
    }

    private createFakeRecipe(): Recipe {
        const maxId = 1000;

        return {
            categories: ['Beef', 'Vegan', 'BBQ'],
            description: 'This easy pizza dough recipe is great for beginners and produces a soft homemade pizza crust.',
            id: Math.ceil(maxId * Math.random()),
            image: 'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            rating: {
                average: 4,
                count: 33,
            },
            tags: ['Swedish'],
            title: 'Cheese burger',
        };
    }

    private createFakeUser(): User {
        return {
            email: 'user@yum.me',
        };
    }
}
