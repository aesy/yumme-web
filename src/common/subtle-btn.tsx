import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from '@/common/subtle-btn.scss';

interface SubtleBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'red' | 'orange' | 'beige';
}

export const SubtleBtn: FC<SubtleBtnProps> = ({ color, ...props }) => (
    <button type="button" className={ `${ styles.subtleBtn } ${ styles[color] }` } { ...props } >
        { props.children }
    </button>
);
