import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { IconClock, IconStarFilled } from '@tabler/icons-react';
import styles from '@/recipes/recipe-list-item.module.scss';
import DefaultRecipeImage from '@/images/DefaultRecipeImage.jpg';
import { recipeImageUrl } from '@/common/recipe-image';
import { ClickableCard } from '@/common/clickable-card';
import { Recipe } from '@/api/yumme-client';

const truncateString = (str: string, num: number): string => {
    if (str.length <= num) {
        return str;
    }

    return `${str.slice(0, num)}...`;
};

interface RecipeListItemProps {
    readonly recipe: Recipe;
    readonly type: 'row' | 'column';
}

export const RecipeListItem: FC<RecipeListItemProps> = (props) => (
    <Link to={`/recipe/${props.recipe.id}`}>
        <ClickableCard borderOffset="medium">
            <article className={`${styles.recipeListItem} ${styles[props.type]}`}>
                {props.recipe.image_cover ? (
                    <img
                        src={recipeImageUrl(props.recipe.id, props.recipe.image_cover, 'thumbnail')}
                        alt={props.recipe.title ?? 'Recipe'}
                    />
                ) : (
                    <img src={DefaultRecipeImage} alt={props.recipe.title ?? 'Recipe'} />
                )}
                <div className={styles.info}>
                    <div className={styles.top}>
                        <span className={styles.rating}>
                            <IconStarFilled />
                            {props.recipe.rating?.average ?? 0} stars from {props.recipe.rating?.count ?? 0} reviews
                        </span>

                        <span className={styles.time}>
                            <IconClock />{' '}
                            {Math.round(((props.recipe.prep_time ?? 0) + (props.recipe.cook_time ?? 0)) / 60)} min
                        </span>
                    </div>

                    <h3>{props.recipe.title}</h3>

                    <p>{truncateString(props.recipe.description ?? '', 180)}</p>

                    <ul>
                        {(props.recipe.categories ?? []).map((category) => (
                            <li key={category}>{category}</li>
                        ))}
                    </ul>
                </div>
            </article>
        </ClickableCard>
    </Link>
);
