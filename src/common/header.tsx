import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import { UserMenu } from '@/common/user-menu';
import styles from '@/common/header.scss';

export const Header: FC<unknown> = () => (
    <header className={ styles.header }>
        <div className={ styles.content }>
            <div className={ styles.left }>
                <Link to="/">
                    <span className={ styles.logo }>Yumme</span>
                </Link>

                <nav>
                    <ul>
                        <li>
                            Browse
                            { ' ' }
                            <ExpandMoreSharpIcon />
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={ styles.right }>
                <UserMenu />
            </div>
        </div>
    </header>
);
