import React, { FC } from 'react';
import styles from '@/common/standard-btn.scss';

export const StandardBtn: FC<unknown> = props => (
    <button className={ styles.standardBtn } type="button" >
        {props.children}
    </button>
);
