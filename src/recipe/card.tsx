import React, { PureComponent, ReactNode } from 'react';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import StarHalfSharpIcon from '@material-ui/icons/StarHalfSharp';
import styles from '@/recipe/card.scss';

interface Props {
    description?: string;
    image?: string;
    rating?: number;
    title?: string;
}

export class Card extends PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        const rating = [];

        if (this.props.rating !== undefined) {
            for (let i = 0; i < this.props.rating - 1; i++) {
                rating.push(<StarSharpIcon />);
            }

            if (this.props.rating - Math.floor(this.props.rating) >= 0.5) {
                rating.push(<StarHalfSharpIcon />);
            }
        }

        return (
            <div className={ styles.card }>
                <div className={ styles.cardImage } style={{ backgroundImage: `url(${ this.props.image !== undefined ? this.props.image : '' })` }} />
                <div className={ styles.cardContent }>
                    <h1>{ this.props.title }</h1>
                    <ul className={ styles.rating }>
                        {
                            rating
                                .map((star, i) => <li key={ i }>{ star }</li>)
                        }
                    </ul>
                    <p>{ this.props.description }</p>
                </div>
            </div>
        );
    }
}
