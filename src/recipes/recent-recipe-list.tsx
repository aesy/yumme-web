import React, { PureComponent, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { EmptyProps } from '@/utils/react';
import { RecipeListItem } from '@/recipes/recipe-list-item';
import { Recipe, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface IState {
    recipes: Recipe[];
}

export class RecentRecipeList extends PureComponent<EmptyProps, IState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: EmptyProps) {
        super(props);

        this.state = {
            recipes: [],
        };
    }

    public componentDidMount(): void {
        this.yummeClient.getRecentRecipes().then(recipes => {
            this.setState({ recipes });
        }).catch(err => {
            console.error(err);
        });
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
}
