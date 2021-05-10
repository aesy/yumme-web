import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import TimerSharpIcon from '@material-ui/icons/TimerSharp';
import StarRateSharpIcon from '@material-ui/icons/StarRateSharp';
import styles from '@/recipes/recipe-list-item.scss';
import { ClickableCard } from '@/common/clickable-card';
import { Recipe } from '@/api/yumme-client';

interface RecipeListItemProps {
    readonly recipe: Recipe;
    readonly type: 'row' | 'column';
}

export const RecipeListItem: FC<RecipeListItemProps> = props => (
    <Link to={ `/recipe/${ props.recipe.id }` }>
        <ClickableCard borderOffset="medium">
            <article className={ `${ styles.recipeListItem } ${ styles[props.type] }` }>
                <img src={ `/api/v1/recipe/${ props.recipe.id }/image/${ props.recipe.images[0] }?size=thumbnail` } />

                <div className={ styles.info }>
                    <div className={ styles.top }>
                        <span className={ styles.rating }>
                            <StarRateSharpIcon />
                            {props.recipe.rating.average}
                            {' '}
                            stars from
                            {' '}
                            {props.recipe.rating.count}
                            {' '}
                            reviews
                        </span>

                        <span className={ styles.time }>
                            <TimerSharpIcon />
                            {' '}
                            35 min
                        </span>
                    </div>

                    <h3>
                        {props.recipe.title}
                    </h3>

                    <p>
                        {props.recipe.description}
                    </p>

                    <ul>
                        {
                            props.recipe.categories
                                .map(category => (
                                    <li key={ category }>
                                        {category}
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </article>
        </ClickableCard>
    </Link>
);
