import React, { ReactNode } from 'react';
import styles from '@/recipe/stat-list.module.scss';
import { StandardHeader } from '@/common/standard-header';
import { Recipe } from '@/api/yumme-client';

interface StatListProps {
    editing: boolean;
    recipe: Recipe;
    type: 'row' | 'column';
    updateRecipe: (recipe: Recipe) => void;
}

export function StatList(props: StatListProps): ReactNode {
    const editCookTime = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const recipe = props.recipe;
        const value = ev.target.value;
        recipe.cook_time = Number(value) * 60;

        props.updateRecipe(recipe);
    };

    const editPrepTime = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const recipe = props.recipe;
        const value = ev.target.value;
        recipe.prep_time = Number(value) * 60;

        props.updateRecipe(recipe);
    };

    const editServings = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const recipe = props.recipe;
        const value = ev.target.value;
        recipe.servings = Number(value);

        props.updateRecipe(recipe);
    };

    if (props.editing) {
        return (
            <ul className={props.type === 'column' ? `${styles.stats} ${styles.column}` : styles.stats}>
                <li>
                    <StandardHeader borderOffset="small" color="white">
                        <h4>Prep time</h4>
                    </StandardHeader>
                    <div className={styles.inputWrapper}>
                        <input
                            type="number"
                            min={1}
                            max={240}
                            value={Math.round((props.recipe.prep_time ?? 0) / 60)}
                            onChange={editPrepTime}
                        />
                    </div>
                    <span className={styles.unit}>min</span>
                </li>
                <li>
                    <StandardHeader borderOffset="small" color="white">
                        <h4>Cook time</h4>
                    </StandardHeader>
                    <div className={styles.inputWrapper}>
                        <input
                            type="number"
                            min={1}
                            max={240}
                            value={Math.round((props.recipe.cook_time ?? 0) / 60)}
                            onChange={editCookTime}
                        />
                    </div>
                    <span className={styles.unit}>min</span>
                </li>
                <li>
                    <StandardHeader borderOffset="small" color="white">
                        <h4>Yield</h4>
                    </StandardHeader>
                    <div className={styles.inputWrapper}>
                        <input
                            type="number"
                            min={1}
                            max={12}
                            value={props.recipe.servings ?? 0}
                            onChange={editServings}
                        />
                    </div>
                    <span className={styles.unit}>servings</span>
                </li>
            </ul>
        );
    }

    return (
        <ul className={props.type === 'column' ? `${styles.stats} ${styles.column}` : styles.stats}>
            <li>
                <StandardHeader borderOffset="small" color="white">
                    <h4>Prep time</h4>
                </StandardHeader>
                <span>{Math.round((props.recipe.prep_time ?? 0) / 60)}</span>
                <span className={styles.unit}>min</span>
            </li>

            <li>
                <StandardHeader borderOffset="small" color="white">
                    <h4>Cook time</h4>
                </StandardHeader>
                <span>{Math.round((props.recipe.cook_time ?? 0) / 60)}</span>
                <span className={styles.unit}>min</span>
            </li>

            <li>
                <StandardHeader borderOffset="small" color="white">
                    <h4>Yield</h4>
                </StandardHeader>
                <span>{props.recipe.servings ?? 0}</span>
                <span className={styles.unit}>servings</span>
            </li>
        </ul>
    );
}
