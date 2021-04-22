import React, { FC } from 'react';
import styles from '@/common/standard-header.scss';

interface StandardHeaderProps {
    readonly borderOffset: 'small' | 'medium' | 'large';
    readonly color: 'white' | 'orange' | 'brown';
}

export const StandardHeader: FC<StandardHeaderProps> = props => (
    <span className={ `${ styles.standardHeader } ${ styles[props.color] } ${ styles[props.borderOffset] }` }>
        {props.children}
    </span>
);
