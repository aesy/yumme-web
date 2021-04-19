import React, { FC } from 'react';
import styles from '@/common/static-card.scss';

export const ClickableCard: FC = props => (
    <div className={ styles.staticCard }>
        <div className={ styles.wrapper }>
            { props.children }
        </div>
    </div>
);
