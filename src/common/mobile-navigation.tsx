import { Link } from 'react-router-dom';
import React, { ReactNode, useState } from 'react';
import { IconSearch, IconBell, IconMessageCircle, IconPlus } from '@tabler/icons-react';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import { ThemeToggle } from '@/common/theme-toggle';
import styles from '@/common/mobile-navigation.module.scss';
import { User } from '@/api/yumme-client';

export function MobileNavigation(): ReactNode {
    const [currentUser] = useState<User | undefined>(undefined);

    return (
        <div className={styles.mobileNavigation}>
            <div className={styles.left}>
                <IconSearch />
                <IconMessageCircle />
            </div>

            <div className={styles.center}>
                <Link to="/recipe/new" className={styles.add} type="button">
                    <IconPlus />
                </Link>
            </div>

            <div className={styles.right}>
                <ThemeToggle />
                <IconBell />
                <Link to={`/profile/${currentUser?.slug ?? ''}`}>
                    <img
                        className={styles.profile}
                        src={DefaultProfileImage}
                        alt={currentUser?.display_name ?? 'User avatar'}
                    />
                </Link>
            </div>
        </div>
    );
}
