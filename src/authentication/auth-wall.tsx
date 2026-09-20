import React, { ReactNode, useState } from 'react';
import { RegistrationForm } from '@/registration/registration-form';
import { LoginForm } from '@/login/login-form';
import { ViewNavigation } from '@/common/view-navigation';
import { StaticCard } from '@/common/static-card';
import styles from '@/authentication/auth-wall.module.scss';

type View = 'Sign up' | 'Log in';

export function AuthWall(): ReactNode {
    const [view, setView] = useState<View>('Sign up');

    const handler = (nextView: string): void => {
        setView(nextView as View);
    };

    return (
        <div className={styles.authWall}>
            <StaticCard color="white" borderOffset="large">
                <div className={styles.wrapper}>
                    <div className={styles.nav}>
                        <ViewNavigation active={view} navigations={['Sign up', 'Log in']} handler={handler} />
                    </div>
                    {view === 'Sign up' && <RegistrationForm />}
                    {view === 'Log in' && <LoginForm />}
                </div>
            </StaticCard>
        </div>
    );
}
