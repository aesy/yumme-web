import React, { FC } from 'react';
import styles from '@/common/not-found.scss';
import { Link } from 'react-router-dom';

export const NotFound: FC<unknown> = props => (
    <>
        <div className={styles.notFound}>
            <h1>404 - Page does not exist.</h1>
            <Link to='/'>Go to home</Link>
        </div>
    </>
);
