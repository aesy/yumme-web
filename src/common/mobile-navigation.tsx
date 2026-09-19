import { Link } from 'react-router-dom';
import React, { ReactNode, useState } from 'react';
import { IconSearch, IconBell, IconMessageCircle, IconPlus } from '@tabler/icons-react';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import styles from '@/common/mobile-navigation.module.scss';
import { User } from '@/api/yumme-client';

export function MobileNavigation(): ReactNode {
    const [currentUser] = useState<User | undefined>(undefined);

    return (
        <div className={ styles.mobileNavigation }>
            <div className={ styles.left }>
                <IconSearch />
                <IconMessageCircle />
            </div>

            <div className={ styles.center }>
                <Link to="/recipe/new" className={ styles.add } type="button">
                    <IconPlus />
                </Link>
            </div>

            <div className={ styles.right }>
                <IconBell />
                <Link to={ `/profile/${ currentUser?.id ?? 1 }` }>
                    <img
                        className={ styles.profile }
                        src={ DefaultProfileImage } />
                </Link>
            </div>
        </div>
    );
}
