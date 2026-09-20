import { Link } from 'react-router-dom';
import React, { type ReactNode, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { IconBell, IconLogout, IconMessageCircle } from '@tabler/icons-react';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import styles from '@/common/user-menu.module.scss';
import { AuthState } from '@/authentication/auth-state';
import { type User, type YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { StandardLinkBtn } from './standard-link-btn';

export function UserMenu(): ReactNode {
    const authState = useInjection<AuthState>(AuthState);
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const onRefresh = async (): Promise<void> => {
            const user = await yummeClient.getCurrentUser();

            setCurrentUser(user);
        };

        void onRefresh();
    }, [yummeClient]);

    return (
        <ul className={styles.userMenu}>
            <li className={styles.navigationItem}>
                <StandardLinkBtn path="/recipe/new">+ ADD RECIPE</StandardLinkBtn>
            </li>
            <li className={styles.navigationItem}>
                <IconMessageCircle className={styles.icon} />
            </li>
            <li className={styles.navigationItem}>
                <IconBell className={styles.icon} />
            </li>
            <li className={styles.navigationItem}>
                <Link to={`/profile/${currentUser?.id ?? 1}`}>
                    <img
                        className={styles.profileImage}
                        src={DefaultProfileImage}
                        alt={currentUser?.display_name ?? 'User avatar'}
                    />
                </Link>

                <ul className={styles.dropdown}>
                    <li className={styles.menuItem}>
                        <Link to={`/profile/${currentUser?.id ?? 1}`}>
                            <span>Go to my profile</span>
                        </Link>
                    </li>

                    <li
                        className={styles.menuItem}
                        role="menuitem"
                        tabIndex={0}
                        onClick={(): void => authState.logout()}
                        onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>): void => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                authState.logout();
                            }
                        }}
                    >
                        <Link to="">
                            <span>Log out</span>
                            <IconLogout />
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}
