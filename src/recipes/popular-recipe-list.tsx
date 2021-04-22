import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { YUMME_CLIENT_TYPE, Recipe, YummeClient } from '@/api/yumme-client';

interface PopularRecipeListState {
    recipes: Recipe[];
}

export class PopularRecipeList extends PureComponent<unknown, PopularRecipeListState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            recipes: [],
        };
    }

    public componentDidMount(): void {
        this.refresh();
    }

    public render(): ReactNode {
        return (
            <ul>
                {
                    this.state.recipes
                        .map(recipe => (
                            <li key={ recipe.id }>
                                <RecipeListItem recipe={ recipe } type="column" />
                            </li>
                        ))
                }
            </ul>
        );
    }

    private async refresh(): Promise<void> {
        const recipes = await this.yummeClient.getPopularRecipes();

        this.setState({ recipes });
    }
}
