/* eslint-disable max-lines-per-function */
import React, { FC } from 'react';
import { StatList } from '@/recipe/stat-list';
import styles from '@/recipe/recipe-view-desktop.scss';
import { IngredientList } from '@/recipe/ingredient-list';
import { ImageList } from '@/recipe/image-list';
import { DirectionList } from '@/recipe/direction-list';
import { Card } from '@/recipe/card';
import { Recipe } from '@/api/yumme-client';

interface RecipeViewDesktopProps {
    editing: boolean;
    recipe: Recipe;
    updateRecipe(recipe: Recipe): void;
}

export const RecipeViewDesktop: FC<RecipeViewDesktopProps> = props => (
    <div className={ styles.recipeViewDesktop }>
        <div className={ styles.top }>
            <div className={ styles.card }>
                <Card
                    recipe={ props.recipe }
                    editing={ props.editing }
                    updateRecipe={ props.updateRecipe } />
            </div>
            <div className={ styles.stats }>
                <StatList
                    type="column"
                    recipe={ props.recipe }
                    editing={ props.editing }
                    updateRecipe={ props.updateRecipe } />
            </div>
        </div>

        <div className={ styles.aside }>
            <div className={ styles.ingredients }>
                <h2>Ingredients</h2>
                <IngredientList
                    recipe={ props.recipe }
                    editing={ props.editing }
                    updateRecipe={ props.updateRecipe } />
            </div>
            <div className={ styles.images }>
                <ImageList
                    recipe={ props.recipe }
                    editing={ props.editing }
                    updateRecipe={ props.updateRecipe } />
            </div>
        </div>


        {/* <div className={ styles.images }>
            <ImageList
                recipe={ props.recipe }
                editing={ props.editing }
                updateRecipe={ props.updateRecipe } />
        </div> */}

        <div className={ styles.directions }>
            <h2>Directions</h2>
            <DirectionList
                recipe={ props.recipe }
                editing={ props.editing }
                updateRecipe={ props.updateRecipe } />
        </div>
    </div>
);
