import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from '@/common/standard-btn.scss';

interface StandardBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const StandardBtn: FC<StandardBtnProps> = ({...props}) => (
    <button className={ styles.standardBtn } {...props}>
        {props.children}
    </button>
);
