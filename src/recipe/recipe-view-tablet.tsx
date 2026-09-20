import React, { ReactNode, useState } from 'react';
import { StatList } from '@/recipe/stat-list';
import styles from '@/recipe/recipe-view-tablet.module.scss';
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
    updateRecipe: (recipe: Recipe) => void;
}

export function RecipeViewTablet(props: RecipeViewTabletProps): ReactNode {
    const [view, setView] = useState<View>('Ingredients');

    const viewHandler = (nextView: string): void => {
        setView(nextView as View);
    };

    return (
        <div className={styles.recipeViewTablet}>
            <div className={styles.card}>
                <Card recipe={props.recipe} editing={props.editing} updateRecipe={props.updateRecipe} />
            </div>

            <div className={styles.stats}>
                <StatList type="row" recipe={props.recipe} editing={props.editing} updateRecipe={props.updateRecipe} />
            </div>

            <div className={styles.navigation}>
                <ViewNavigation
                    active={view}
                    navigations={['Ingredients', 'Directions', 'Images']}
                    handler={viewHandler}
                />
            </div>

            {view === 'Ingredients' && (
                <div className={styles.ingredients}>
                    <IngredientList recipe={props.recipe} editing={props.editing} updateRecipe={props.updateRecipe} />
                </div>
            )}
            {view === 'Directions' && (
                <div className={styles.directions}>
                    <DirectionList recipe={props.recipe} editing={props.editing} updateRecipe={props.updateRecipe} />
                </div>
            )}
            {view === 'Images' && (
                <div>
                    <ImageList recipe={props.recipe} editing={props.editing} updateRecipe={props.updateRecipe} />
                </div>
            )}
        </div>
    );
}
