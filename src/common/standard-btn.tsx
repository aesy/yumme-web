import React, { FC } from 'react';
import { EmptyProps } from '@/utils/react';
import styles from '@/common/standard-btn.scss';

export const StandardBtn: FC<EmptyProps> = props => (
    <button className={ styles.standardBtn } type="button" >
        {props.children}
    </button>
);
