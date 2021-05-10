import React, { FC } from 'react';
import styles from '@/common/static-card.scss';

interface StaticCardProps {
    readonly borderOffset: 'small' | 'medium' | 'large';
    readonly color: 'white' | 'orange' | 'black';
}

export const StaticCard: FC<StaticCardProps> = props => (
    <div className={ `${ styles.staticCard } ${ styles[props.borderOffset] } ${ styles[props.color] }` }>
        { props.children }
    </div>
);
