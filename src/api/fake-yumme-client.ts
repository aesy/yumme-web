import { injectable } from 'inversify';
import {
    type Collection,
    type ImageUploadResult,
    type LoginResponse,
    type Recipe,
    type User,
    type YummeClient,
} from '@/api/yumme-client';

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
            access_token: 'secret',
            refresh_token: 'secret',
            expires_in: 3600000,
            token_type: 'bearer',
        };
    }

    public async getAllRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 3 }).map(() => {
            return { ...this.createFakeRecipe(), id: generateId() };
        });
    }

    public async getCurrentUser(): Promise<User> {
        return this.createFakeUser();
    }

    public async getPopularRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 3 }).map(() => {
            return { ...this.createFakeRecipe(), id: generateId() };
        });
    }

    public getPopularRecipesByUser(): Promise<Recipe[]> {
        return this.getPopularRecipes();
    }

    public async getRecentCollections(): Promise<Collection[]> {
        return Array.from({ length: 4 }).map(() => {
            return { ...this.createFakeCollection(), id: generateId() };
        });
    }

    public async getRecentRecipes(): Promise<Recipe[]> {
        return Array.from({ length: 4 }).map(() => {
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
            description:
                'This easy pizza dough recipe is great for beginners and produces a soft homemade pizza crust.',
            directions: [
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth. Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
                'Whisk soy sauce, oyster sauce, rice vinegar, sesame oil, brown sugar, Sriracha sauce, and garlic in a small bowl until smooth.',
            ].join('\n'),
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
            image_attachments: [],
            rating: {
                average: 3.6,
                count: 33,
            },
            prep_time: 1000,
            cook_time: 1500,
            servings: 3,
            tags: ['Swedish'],
            title: 'Cheese burger',
        };
    }

    private createFakeUser(): User {
        return {
            user_name: 'user',
            display_name: 'User',
            id: 1,
        };
    }
}
