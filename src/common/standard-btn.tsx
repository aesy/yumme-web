import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from '@/common/standard-btn.scss';

export const StandardBtn: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => (
    <button type="button" className={ styles.standardBtn } { ...props }>
        {props.children}
    </button>
);
