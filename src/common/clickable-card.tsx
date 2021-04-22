import React, { FC } from 'react';
import styles from '@/common/clickable-card.scss';

interface ClickableCardProps {
    readonly borderOffset: 'small' | 'medium' | 'large';
}

export const ClickableCard: FC<ClickableCardProps> = props => (
    <div className={ `${ styles.clickableCard } ${ styles[props.borderOffset] }` }>
        <div className={ styles.wrapper }>
            { props.children }
        </div>
    </div>
);
