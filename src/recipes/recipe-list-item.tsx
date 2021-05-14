import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import TimerSharpIcon from '@material-ui/icons/TimerSharp';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import styles from '@/recipes/recipe-list-item.scss';
import DefaultRecipeImage from '@/images/DefaultRecipeImage.jpg';
import { ClickableCard } from '@/common/clickable-card';
import { Recipe } from '@/api/yumme-client';

const truncateString = (str: string, num: number): string => {
    if (str.length <= num) {
        return str;
    }

    return `${ str.slice(0, num) }...`;
};

interface RecipeListItemProps {
    readonly recipe: Recipe;
    readonly type: 'row' | 'column';
}

export const RecipeListItem: FC<RecipeListItemProps> = props => (
    <Link to={ `/recipe/${ props.recipe.id }` }>
        <ClickableCard borderOffset="medium">
            <article className={ `${ styles.recipeListItem } ${ styles[props.type] }` }>
                {
                    props.recipe.images[0]
                        ? <img src={ `/api/v1/recipe/${ props.recipe.id }/image/${ props.recipe.images[0] }?size=thumbnail` } />
                        : <img src={ DefaultRecipeImage } />
                }
                <div className={ styles.info }>
                    <div className={ styles.top }>
                    <span className={ styles.rating }>
                        <StarSharpIcon />
                        { props.recipe.rating.average }
                        { ' ' }
                        stars from
                        { ' ' }
                        { props.recipe.rating.count }
                        { ' ' }
                        reviews
                    </span>

                        <span className={ styles.time }>
                            <TimerSharpIcon />
                            { ' ' }
                            35 min
                        </span>
                    </div>

                    <h3>
                        { props.recipe.title }
                    </h3>

                    <p>
                        { truncateString(props.recipe.description, 180) }
                    </p>

                    <ul>
                        <li>
                            test
                        </li>
                        <li>
                            test2
                        </li>
                        <li>
                            test3
                        </li>
                        {
                            props.recipe.categories
                                .map(category => (
                                    <li key={ category }>
                                        { category }
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </article>
        </ClickableCard>
    </Link>
);
