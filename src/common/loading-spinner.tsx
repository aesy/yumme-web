import React, { FC } from 'react';
import styles from '@/common/loading-spinner.scss';

interface LoadingSpinnerProps {
    color: 'white' | 'orange';
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = props => (
    <div className={ `${ styles.ellipsis } ${ styles[props.color] }` }>
        <div />
        <div />
        <div />
        <div />
    </div>
);
