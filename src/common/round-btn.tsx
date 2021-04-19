import React, { FC } from 'react';
import { EmptyProps } from '@/utils/react';
import styles from '@/common/round-btn.scss';

export const RoundBtn: FC<EmptyProps> = props => (
    <button className={ styles.roundBtn } type="button">
        {props.children}
    </button>
);
