import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/recipes/recipe-list.scss';
import { RecipeListItemPlaceholder } from '@/recipes/recipe-list-item-placeholder';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { Recipe, YummeClient, YUMME_CLIENT_TYPE, User } from '@/api/yumme-client';

interface RecentRecipeListState {
    onSmallScreen: boolean;
    recipes?: Recipe[];
}

interface RecentRecipeListProps {
    amount: number;
    user: User;
}

export class RecentRecipeList extends PureComponent<RecentRecipeListProps, RecentRecipeListState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    private readonly breakpoint: number = 640;

    public constructor(props: RecentRecipeListProps) {
        super(props);

        this.state = {
            onSmallScreen: window.innerWidth < this.breakpoint,
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
        const placeholders = [];

        for (let i = 0; i < this.props.amount; i++) {
            placeholders.push(<RecipeListItemPlaceholder type={ this.state.onSmallScreen ? 'column' : 'row' } />);
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
                                <RecipeListItem recipe={ recipe }
                                                type={ this.state.onSmallScreen ? 'column' : 'row' } />
                            </li>
                        ))
                }
            </ul>
        );
    }

    @Bind
    private onResize(): void {
        this.setState({ onSmallScreen: window.innerWidth < this.breakpoint });
    }

    @Bind
    private async refresh(): Promise<void> {
        const recipes = await this.yummeClient.getRecentRecipesByUser(this.props.user.id, this.props.amount);

        this.setState({ recipes });
    }
}
