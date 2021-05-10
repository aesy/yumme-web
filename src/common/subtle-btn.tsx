import React, { FC } from 'react';
import styles from '@/common/subtle-btn.scss';

interface SubtleBtnProps {
    color: 'red' | 'orange' | 'beige';
}

export const SubtleBtn: FC<SubtleBtnProps> = props => (
    <button className={ `${ styles.subtleBtn } ${ styles[props.color] }` } type="button" >
        {props.children}
    </button>
);
