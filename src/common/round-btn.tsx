import React, { FC } from 'react';
import styles from '@/common/round-btn.scss';

export const RoundBtn: FC<unknown> = props => (
    <button className={ styles.roundBtn } type="button">
        {props.children}
    </button>
);
