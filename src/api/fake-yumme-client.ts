import { injectable } from 'inversify';
import { LoginResponse, Recipe, User, YummeClient, Collection } from '@/api/yumme-client';

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
            accessToken: 'secret',
            refreshToken: 'secret',
            expiresIn: 3600000,
            tokenType: 'bearer',
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

    public async getRecipeById(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async register(): Promise<LoginResponse> {
        return {
            accessToken: 'secret',
            refreshToken: 'secret',
            expiresIn: 3600000,
            tokenType: 'bearer',
        };
    }

    public async replaceRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
    }

    public async updateRecipe(): Promise<Recipe> {
        return this.createFakeRecipe();
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
                '1 pound raw peeled and deveined shrimp',
                '1 pound raw peeled and deveined shrimp',
                '1 pound raw peeled and deveined shrimp',
                '1 pound raw peeled and deveined shrimp',
                '1 pound raw peeled and deveined shrimp',
                '1 pound raw peeled and deveined shrimp',
                '1 pound raw peeled and deveined shrimp',
            ],
            images: [
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
                'https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg',
            ],
            rating: {
                average: 3.6,
                count: 33,
            },
            prepTime: 1000,
            cookTime: 1500,
            yield: 3,
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
