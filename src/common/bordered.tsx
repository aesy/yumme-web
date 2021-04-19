import React, { FC } from 'react';
import styles from '@/common/bordered.scss';

interface BorderedProps {
    readonly round: boolean;
    readonly size: 'small' | 'medium' | 'large';
}

export const Bordered: FC<BorderedProps> = props => (
    <div className={ `${ styles.bordered } ${ props.round ? styles.round : '' } ${ styles[props.size] }` }>
        {props.children}
    </div>
);
