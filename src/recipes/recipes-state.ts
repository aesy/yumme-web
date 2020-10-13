import { action, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { Recipe, YUMME_CLIENT_TYPE, YummeClient } from '@/api/yumme-client';

@injectable()
export class RecipesState {
    @observable
    private recipes: Recipe[] = [];

    @inject(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor() {
        makeObservable(this);
    }

    public getRecipes(): Recipe[] {
        return this.recipes;
    }

    public async updateRecipes(): Promise<void> {
        const recipes = await this.yummeClient.getAllRecipes();

        action('updateRecipes', () => {
            this.recipes = recipes;
        })();
    }
}
