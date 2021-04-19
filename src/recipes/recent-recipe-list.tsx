import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { Recipe, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface RecentRecipeListState {
    recipes: Recipe[];
}

export class RecentRecipeList extends PureComponent<unknown, RecentRecipeListState> {
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
                                <RecipeListItem recipe={ recipe } type="row" />
                            </li>
                        ))
                }
            </ul>
        );
    }

    private async refresh(): Promise<void> {
        const recipes = await this.yummeClient.getRecentRecipes();

        this.setState({ recipes });
    }
}
