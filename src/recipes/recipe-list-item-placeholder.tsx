import React, { FC } from 'react';
import styles from '@/recipes/recipe-list-item-placeholder.scss';

interface RecipeListItemPlaceholderProps {
    type: 'column' | 'row';
}

export const RecipeListItemPlaceholder: FC<RecipeListItemPlaceholderProps> = props => (
    <div className={ `${ styles.recipeListItemPlaceholder } ${ styles[props.type] }` }>
        <div className={ styles.imgPlaceholder } />
        <div className={ styles.textPlaceholder }>
            <div className={ styles.topPlaceholder }>
                <span className={ styles.topPlaceholder } />
                <span className={ styles.topPlaceholder } />
            </div>
            <span className={ styles.titlePlaceholder } />
            <span className={ styles.descriptionPlaceholder } />
            <span className={ styles.tagsPlaceholder } />
        </div>
    </div>
);
