import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import styles from '@/common/standard-link-btn.scss';

interface StandardLinkBtnProps {
    path: string;
}

export const StandardLinkBtn: FC<StandardLinkBtnProps> = props => (
    <Link to={ props.path } className={ styles.standardLinkBtn }>
        { props.children }
    </Link>
);
