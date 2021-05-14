import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/recipes/recipe-list.scss';
import { RecipeListItemPlaceholder } from '@/recipes/recipe-list-item-placeholder';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { YUMME_CLIENT_TYPE, Recipe, YummeClient } from '@/api/yumme-client';

interface PopularRecipeListState {
    recipes?: Recipe[];
}

interface RecentRecipeListProps {
    amount: number;
}

export class PopularRecipeList extends PureComponent<RecentRecipeListProps, PopularRecipeListState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: RecentRecipeListProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount(): void {
        this.refresh();
    }

    public render(): ReactNode {
        const placeholders = [];

        for (let i = 0; i < this.props.amount; i++) {
            placeholders.push(<RecipeListItemPlaceholder type="column" />);
        }

        if (!this.state.recipes) {
            return (
                <ul>
                    {
                        placeholders.map((placeholder, i) => (
                            <li key={ i }>
                                { placeholder }
                            </li>
                        ))
                    }
                </ul>
            );
        }

        if (!this.state.recipes.length) {
            return (
                <p>Seems like there aren&apos;t any :(</p>
            );
        }

        return (
            <ul>
                {
                    this.state.recipes
                        .map(recipe => (
                            <li className={ styles.recipeListItem } key={ recipe.id }>
                                <RecipeListItem recipe={ recipe } type="column" />
                            </li>
                        ))
                }
            </ul>
        );
    }

    @Bind
    private async refresh(): Promise<void> {
        const recipes = await this.yummeClient.getPopularRecipes(this.props.amount);

        this.setState({ recipes });
    }
}
