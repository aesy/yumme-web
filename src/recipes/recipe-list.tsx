import React, { FC, PureComponent, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import { bind } from '@decorize/bind';
import { RecipesState } from '@/recipes/recipes-state';
import { Recipe } from '@/api/yumme-client';

interface RecipeListItemProps {
    readonly recipe: Recipe;
}

const RecipeListItem: FC<RecipeListItemProps> = props => (
    <h1>
        { props.recipe.title }
    </h1>
);

@observer
export class RecipeList extends PureComponent {
    @resolve(RecipesState)
    private readonly recipesState: RecipesState;

    public componentDidMount(): void {
        this.onRefresh();
    }

    public render(): ReactNode {
        return (
            <div>
                {
                    this.recipesState.getRecipes()
                        .map(recipe => <RecipeListItem key={ recipe.id } recipe={ recipe } />)
                }

                <button type="button"
                        onClick={ this.onRefresh }>
                    Refresh
                </button>
            </div>
        );
    }

    @bind
    private async onRefresh(): Promise<void> {
        try {
            await this.recipesState.updateRecipes();
        } catch (e: unknown) {
            console.error('Failed to update recipes', e);
        }
    }
}
