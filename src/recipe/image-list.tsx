import React, { PureComponent, ReactNode } from 'react';
import styles from '@/recipe/image-list.scss';

interface Props {
    images: string[];
}

export class ImageList extends PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <ul className={ styles.images }>
                {
                    this.props.images
                        .map((image, i) => (
                            <li key={ i }>
                                <span className={ styles.image } style={{ backgroundImage: `url(${ image })` }} />
                            </li>
                        ))
                }
            </ul>
        );
    }
}
