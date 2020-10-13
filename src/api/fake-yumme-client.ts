import { injectable } from 'inversify';
import { LoginResponse, Recipe, User, YummeClient } from '@/api/yumme-client';

@injectable()
export class FakeYummeClient implements YummeClient {
    public createRecipe(): Promise<Recipe> {
        return Promise.resolve(this.createFakeRecipe());
    }

    public deleteRecipe(): Promise<void> {
        return Promise.resolve();
    }

    public getAccessToken(): Promise<LoginResponse> {
        return Promise.resolve({ accessToken: 'secret' });
    }

    public getAllRecipes(): Promise<Recipe[]> {
        const recipes = Array.from({ length: 2 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });

        return Promise.resolve(recipes);
    }

    public getCurrentUser(): Promise<User> {
        return Promise.resolve(this.createFakeUser());
    }

    public getPopularRecipes(): Promise<Recipe[]> {
        const recipes = Array.from({ length: 2 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });

        return Promise.resolve(recipes);
    }

    public getRecentRecipes(): Promise<Recipe[]> {
        const recipes = Array.from({ length: 2 })
            .map((_, index) => {
                return { ...this.createFakeRecipe(), id: index };
            });

        return Promise.resolve(recipes);
    }

    public getRecipeById(): Promise<Recipe> {
        return Promise.resolve(this.createFakeRecipe());
    }

    public register(): Promise<LoginResponse> {
        return Promise.resolve({ accessToken: 'secret' });
    }

    public replaceRecipe(): Promise<Recipe> {
        return Promise.resolve(this.createFakeRecipe());
    }

    public updateRecipe(): Promise<Recipe> {
        return Promise.resolve(this.createFakeRecipe());
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
