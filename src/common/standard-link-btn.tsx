import { Link } from 'react-router-dom';
import React, { FC, PropsWithChildren } from 'react';
import styles from '@/common/standard-link-btn.module.scss';

interface StandardLinkBtnProps {
    path: string;
}

export const StandardLinkBtn: FC<PropsWithChildren<StandardLinkBtnProps>> = props => (
    <Link to={ props.path } className={ styles.standardLinkBtn }>
        { props.children }
    </Link>
);
