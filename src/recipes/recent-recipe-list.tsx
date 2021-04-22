import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { bind } from '@decorize/bind';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { Recipe, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface RecentRecipeListState {
    onSmallScreen: boolean;
    recipes: Recipe[];
}

export class RecentRecipeList extends PureComponent<unknown, RecentRecipeListState> {
    private static readonly breakpoint: number = 640;

    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {
            recipes: [],
            onSmallScreen: window.innerWidth < RecentRecipeList.breakpoint,
        };
    }

    public componentDidMount(): void {
        window.addEventListener('resize', this.onResize);
        this.refresh();
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.onResize);
    }

    public render(): ReactNode {
        return (
            <ul>
                {
                    this.state.recipes
                        .map(recipe => (
                            <li key={ recipe.id }>
                                <RecipeListItem recipe={ recipe } type={ this.state.onSmallScreen ? 'column' : 'row' } />
                            </li>
                        ))
                }
            </ul>
        );
    }

    @bind
    private onResize(): void {
        this.setState({ onSmallScreen: window.innerWidth < RecentRecipeList.breakpoint });
    }

    private async refresh(): Promise<void> {
        const recipes = await this.yummeClient.getRecentRecipes();

        this.setState({ recipes });
    }
}
