/* eslint-disable max-lines-per-function */
import React, { Component, ReactNode } from 'react';
import { Bind } from '@decorize/bind';
import { StatList } from '@/recipe/stat-list';
import styles from '@/recipe/recipe-view-tablet.scss';
import { IngredientList } from '@/recipe/ingredient-list';
import { ImageList } from '@/recipe/image-list';
import { DirectionList } from '@/recipe/direction-list';
import { Card } from '@/recipe/card';
import { ViewNavigation } from '@/common/view-navigation';
import { Recipe } from '@/api/yumme-client';

type View = 'Ingredients' | 'Directions' | 'Images';

interface RecipeViewTabletProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

interface RecipeVIewTabletState {
    view: View;
}

export class RecipeViewTablet extends Component<RecipeViewTabletProps, RecipeVIewTabletState> {
    public constructor(props: RecipeViewTabletProps) {
        super(props);

        this.state = {
            view: 'Ingredients',
        };
    }

    public render(): ReactNode {
        return (

            <div className={ styles.recipeViewTablet }>
                <div className={ styles.card }>
                    <Card
                        recipe={ this.props.recipe }
                        editing={ this.props.editing }
                        updateRecipe={ this.props.updateRecipe } />
                </div>

                <div className={ styles.stats }>
                    <StatList
                        type="row"
                        recipe={ this.props.recipe }
                        editing={ this.props.editing }
                        updateRecipe={ this.props.updateRecipe } />
                </div>

                <div className={ styles.navigation }>
                    <ViewNavigation
                        active={ this.state.view }
                        navigations={ ['Ingredients', 'Directions', 'Images'] }
                        handler={ this.viewHandler } />
                </div>

                {
                    this.state.view === 'Ingredients' &&
                    <div className={ styles.ingredients }>
                        <IngredientList
                            recipe={ this.props.recipe }
                            editing={ this.props.editing }
                            updateRecipe={ this.props.updateRecipe } />
                    </div>
                }
                {
                    this.state.view === 'Directions' &&
                    <div className={ styles.directions }>
                        <DirectionList
                            recipe={ this.props.recipe }
                            editing={ this.props.editing }
                            updateRecipe={ this.props.updateRecipe } />
                    </div>
                }
                {
                    this.state.view === 'Images' &&
                    <div className={ styles.images }>
                        <ImageList
                            recipe={ this.props.recipe }
                            editing={ this.props.editing }
                            updateRecipe={ this.props.updateRecipe } />
                    </div>
                }
            </div>
        );
    }

    @Bind
    public viewHandler(view: string): void {
        this.setState({
            view: view as View,
        });
    }
}
