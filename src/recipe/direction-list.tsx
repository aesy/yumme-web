import React, { PureComponent, ReactNode } from 'react';
import styles from '@/recipe/direction-list.scss';

interface Props {
    directions: string[];
}

export class DirectionList extends PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <ul className={ styles.directions }>
                {
                    this.props.directions
                        .map((direction, i) => (
                            <li key={ i } data-step={ `STEP ${ i + 1 }` } className={ styles.direction }>
                                <p>{ direction }</p>
                            </li>
                        ))
                }
            </ul>
        );
    }
}
