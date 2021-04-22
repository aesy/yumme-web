import React, { PureComponent, ReactNode } from 'react';
import styles from '@/recipe/ingredient-list.scss';

interface Props {
    ingredients: string[];
}

export class IngredientList extends PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <ul className={ styles.ingredients }>
                {
                    this.props.ingredients
                        .map((ingredient, i) => (
                            <li key={ i } className={ styles.ingredient }>
                                <p>{ingredient}</p>
                            </li>
                        ))
                }
            </ul>
        );
    }
}
