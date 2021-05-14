/* eslint-disable max-lines-per-function */
import { RouteComponentProps } from 'react-router-dom';
import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import { Bind } from '@decorize/bind';
import styles from '@/recipe/recipe.scss';
import { SubtleBtn } from '@/common/subtle-btn';
import { StandardBtn } from '@/common/standard-btn';
import { LoadingSpinner } from '@/common/loading-spinner';
import { Recipe as RecipeType, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { RecipeViewTablet } from './recipe-view-tablet';
import { RecipeViewDesktop } from './recipe-view-desktop';

interface RecipeState {
    currentRecipe?: RecipeType;
    editedRecipe?: RecipeType;
    editing: boolean;
    loading: boolean;
    tabletView: boolean;
}

interface MatchParams {
    id: string;
}

@observer
export class Recipe extends Component<RouteComponentProps<MatchParams>, RecipeState> {
    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    private readonly breakpoint: number = 811;

    public constructor(props: RouteComponentProps<MatchParams>) {
        super(props);

        this.state = {
            editing: false,
            loading: false,
            tabletView: window.innerWidth < this.breakpoint,
        };
    }

    public componentDidMount(): void {
        window.addEventListener('resize', this.onResize);
        this.refresh(Number(this.props.match.params.id));
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.onResize);
    }

    public render(): ReactNode {
        const recipe = this.state.editing ? this.state.editedRecipe : this.state.currentRecipe;

        if (!recipe) {
            return (
                <div className={ styles.recipeLoadingWrapper }>
                    <LoadingSpinner color="white" />
                </div>
            );
        }

        return (
            <div className={ styles.recipe }>
            {
                !this.state.tabletView
                ? (
                    <div className={ styles.recipeWrapper }>
                        <RecipeViewDesktop
                            recipe={ recipe }
                            editing={ this.state.editing }
                            updateRecipe={ this.updateRecipe } />
                    </div>
                )
                : (
                    <div className={ styles.recipeWrapper }>
                        <RecipeViewTablet
                            recipe={ recipe }
                            editing={ this.state.editing }
                            updateRecipe={ this.updateRecipe } />
                    </div>
                )
            }

                <div className={ styles.buttons }>
                {
                    this.state.loading && (
                        <div className={ styles.saveLoadingWrapper }>
                            <LoadingSpinner color="orange" />
                        </div>
                    )
                }
                {
                    this.state.editing && !this.state.loading && (
                        <>
                            <StandardBtn
                                type="button"
                                onClick={ this.saveRecipe }>
                                SAVE RECIPE
                            </StandardBtn>
                            <StandardBtn
                                type="button"
                                onClick={ this.toggleEditing }>
                                    CANCEL EDITING
                            </StandardBtn>
                        </>
                    )
                }
                {
                    !this.state.editing && !this.state.loading && (
                        <>
                            <StandardBtn
                                type="button"
                                onClick={ this.toggleEditing }>
                                EDIT RECIPE
                            </StandardBtn>
                            <SubtleBtn
                                color="red"
                                onClick={ this.deleteRecipe }>
                                DELETE RECIPE
                            </SubtleBtn>
                        </>
                    )
                }
                </div>
            </div>
        );
    }

    @Bind
    private async deleteRecipe(): Promise<void> {
        this.setState({ loading: true });

        try {
            await this.yummeClient.deleteRecipe(Number(this.props.match.params.id));
        } catch {
            this.setState({ loading: false });
        }

        this.props.history.push('/');
    }

    @Bind
    private onResize(): void {
        this.setState({ tabletView: window.innerWidth < this.breakpoint });
    }

    @Bind
    private async refresh(id: number): Promise<void> {
        const recipe = await this.yummeClient.getRecipeById(id);

        this.setState({
            editing: false,
            loading: false,
            currentRecipe: JSON.parse(JSON.stringify(recipe)) as RecipeType,
            editedRecipe: JSON.parse(JSON.stringify(recipe)) as RecipeType,
        });
    }

    @Bind
    private async saveRecipe(): Promise<void> {
        this.setState({ loading: true });

        if (!this.state.editedRecipe) {
            return;
        }

        const request = {
            categories: this.state.editedRecipe.categories,
            // eslint-disable-next-line
            cook_time: this.state.editedRecipe.cook_time,
            description: this.state.editedRecipe.description,
            public: true,
            directions: this.state.editedRecipe.directions,
            ingredients: this.state.editedRecipe.ingredients
                .map(ingredient => ingredient.name),
            // eslint-disable-next-line
            prep_time: this.state.editedRecipe.prep_time,
            tags: this.state.editedRecipe.tags,
            title: this.state.editedRecipe.title,
            yield: this.state.editedRecipe.yield,
        };
        const recipe = await this.yummeClient.updateRecipe(Number(this.props.match.params.id), request);

        await this.refresh(recipe.id);
    }

    @Bind
    private toggleEditing(): void {
        this.setState(state => {
            return {
                editing: !state.editing,
            };
        });
    }

    @Bind
    private updateRecipe(recipe: RecipeType): void {
        this.setState(
            {
                editedRecipe: recipe,
            },
        );
    }
}
