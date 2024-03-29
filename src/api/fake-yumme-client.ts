import { injectable } from 'inversify';
import { type LoginResponse, type Recipe, type User, type YummeClient, type Collection, type ImageUploadResult } from '@/api/yumme-client';

function generateId(): number {
    const maxId = 1_000_000;

    return Math.ceil(maxId * Math.random());
}

@injectable()
export class FakeYummeClient implements YummeClient {
    public async createRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async deleteRecipe(): Promise<void> {
        // Do nothing
    }

    public async getAccessToken(): Promise<LoginResponse> {
        return {
            // eslint-disable-next-line
            access_token: 'secret',
            // eslint-disable-next-line
            refresh_token: 'secret',
            // eslint-disable-next-line
            expires_in: 3600000,
            // eslint-disable-next-line
            token_type: 'bearer',
        };
    }

    public async getAllRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 3 })
            .map(() => {
                return { ...this.createFakeRecipe(), id: generateId() };
            });
    }

    public async getCurrentUser(): Promise<User> {
        return this.createFakeUser();
    }

    public async getPopularRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 3 })
            .map(() => {
                return { ...this.createFakeRecipe(), id: generateId() };
            });
    }

    public getPopularRecipesByUser(): Promise<Recipe[]> {
        return this.getPopularRecipes();
    }

    public async getRecentCollections(): Promise<Collection[]> {
        return Array.from({ length: 4 })
            .map(() => {
                return { ...this.createFakeCollection(), id: generateId() };
            });
    }

    public async getRecentRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 4 })
            .map(() => {
                return { ...this.createFakeRecipe(), id: generateId() };
            });
    }

    public getRecentRecipesByUser(): Promise<Recipe[]> {
        return this.getRecentRecipes();
    }

    public async getRecipeById(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async getUserById(): Promise<User> {
        return this.createFakeUser();
    }

    public async register(): Promise<void> {
        // Do nothing
    }

    public async replaceRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async updateRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async uploadImage(): Promise<ImageUploadResult> {
        return {
            name: 'woop',
        };
    }

    private createFakeCollection(): Collection {
        return {
            id: generateId(),
            title: 'Barbeque heaven',
            recipes: [generateId(), generateId(), generateId(), generateId()],
        };
    }

    private createFakeRecipe(): Recipe {
        return {
            categories: ['Beef', 'Vegan', 'BBQ'],
            description: 'This easy pizza dough recipe is great for beginners and produces a soft homemade pizza crust.',
            directions: [
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            ],
            id: generateId(),
            ingredients: [
                { name: '1 pound raw peeled and deveined shrimp' },
                { name: '1 pound raw peeled and deveined shrimp' },
                { name: '1 pound raw peeled and deveined shrimp' },
                { name: '1 pound raw peeled and deveined shrimp' },
                { name: '1 pound raw peeled and deveined shrimp' },
                { name: '1 pound raw peeled and deveined shrimp' },
                { name: '1 pound raw peeled and deveined shrimp' },
            ],
            images: [],
            rating: {
                average: 3.6,
                count: 33,
            },
            // eslint-disable-next-line
            prep_time: 1000,
            // eslint-disable-next-line
            cook_time: 1500,
            yield: 3,
            tags: ['Swedish'],
            title: 'Cheese burger',
        };
    }

    private createFakeUser(): User {
        return {
            // eslint-disable-next-line
            user_name: 'user',
            // eslint-disable-next-line
            display_name: 'User',
            id: 1,
        };
    }
}
