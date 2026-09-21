import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { UserMenu } from '@/common/user-menu';
import { ThemeToggle } from '@/common/theme-toggle';
import styles from '@/common/header.module.scss';

export const Header: FC<unknown> = () => (
    <header className={styles.header}>
        <div className={styles.content}>
            <div className={styles.left}>
                <Link to="/">
                    <span className={styles.logo}>Yumme</span>
                </Link>

                <nav>
                    <ul>
                        <li>
                            Browse <IconChevronDown />
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.controls}>
                <ThemeToggle />
                <UserMenu />
            </div>
        </div>
    </header>
);
