import { RouteComponentProps } from 'react-router-dom';
import React, { Component, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/recipe.scss';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { Recipe, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { RecipeViewTablet } from './recipe-view-tablet';
import { RecipeViewDesktop } from './recipe-view-desktop';

interface EmptyRecipeState {
    editing: boolean;
    loading: boolean;
    recipe: Recipe;
    tabletView: boolean;
}

export class EmptyRecipe extends Component<RouteComponentProps, EmptyRecipeState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    private readonly breakpoint: number = 980;

    public constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            recipe: {
                categories: [],
                // eslint-disable-next-line
                cook_time: 10,
                // eslint-disable-next-line
                prep_time: 10,
                yield: 2,
                description: 'The PERFECT recipe for..',
                directions: [],
                ingredients: [],
                id: 0,
                images: [],
                rating: {
                    average: 0,
                    count: 0,
                },
                tags: [],
                title: 'A recipe',

            },
            editing: true,
            loading: false,
            tabletView: window.innerWidth < this.breakpoint,
        };
    }

    public componentDidMount(): void {
        window.addEventListener('resize', this.onResize);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.onResize);
    }

    public render(): ReactNode {
        return (
            <div className={ styles.recipe }>
                    {
                        !this.state.tabletView
                        ? (
                            <RecipeViewDesktop
                                recipe={ this.state.recipe }
                                editing={ this.state.editing }
                                updateRecipe={ this.updateRecipe } />
                        )
                        : (
                            <RecipeViewTablet
                                recipe={ this.state.recipe }
                                editing={ this.state.editing }
                                updateRecipe={ this.updateRecipe } />
                        )
                    }

                <div className={ styles.buttons }>
                    {
                        this.state.loading
                        ? (
                            <div className={ styles.loadingWrapper }>
                                <LoadingSpinner />
                            </div>
                        )
                        : <StandardBtn
                                type="button"
                                onClick={ this.uploadRecipe }>
                                SAVE RECIPE
                          </StandardBtn>
                    }
                </div>
            </div>
        );
    }

    @Bind
    private onResize(): void {
        this.setState({ tabletView: window.innerWidth < this.breakpoint });
    }

    @Bind
    private updateRecipe(recipe: Recipe): void {
        this.setState(
            {
                recipe,
            },
        );
    }

    @Bind
    private async uploadRecipe(): Promise<void> {
        this.setState({ loading: true });

        const request = {
            categories: this.state.recipe.categories,
            // eslint-disable-next-line
            cook_time: this.state.recipe.cook_time,
            description: this.state.recipe.description,
            public: true,
            directions: this.state.recipe.directions,
            images: this.state.recipe.images,
            ingredients: this.state.recipe.ingredients
                .map(ingredient => ingredient.name),
            // eslint-disable-next-line
            prep_time: this.state.recipe.prep_time,
            tags: this.state.recipe.tags,
            title: this.state.recipe.title,
            yield: this.state.recipe.yield,
        };
        const recipe = await this.yummeClient.createRecipe(request);

        this.props.history.push(`/recipe/${ recipe.id }`);
    }
}
