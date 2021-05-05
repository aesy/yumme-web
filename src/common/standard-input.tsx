import React, { FC, InputHTMLAttributes } from 'react';
import styles from '@/common/standard-input.scss';

interface StandardInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const StandardInput: FC<StandardInputProps> = ({ label, ...props }) => (
    <>
        <label className={ styles.label }>{ label }</label>
        <input className={ styles.standardInput } { ...props } />
    </>
);
